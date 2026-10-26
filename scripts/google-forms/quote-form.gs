/**
 * Varsity Outdoor Services — Google Form → Sheet → Email
 *
 * One-time setup:
 *   1. Open the "Varsity Outdoor Services – Quote Requests" spreadsheet.
 *   2. Extensions → Apps Script. Delete what's there and paste this whole file.
 *   3. Click Save, choose `setup` in the function dropdown, then click Run.
 *   4. Approve the permissions Google asks for (it's your own script).
 *
 * setup() creates the form, links it to this spreadsheet (responses land in
 * a "Form Responses" tab), and turns on an email for every new submission.
 * The form's share link is written into the first tab of the spreadsheet.
 *
 * Connect the website (so its quote forms land in the same tab):
 *   5. Deploy → New deployment → gear icon → Web app.
 *      Execute as: Me. Who has access: Anyone. Click Deploy, copy the URL.
 *   6. In Vercel (Project → Settings → Environment Variables) add:
 *        GOOGLE_SHEET_WEBHOOK_URL    = the Web app URL from step 5
 *        GOOGLE_SHEET_WEBHOOK_SECRET = the "Website secret" from the first tab
 *      Then redeploy the site.
 *
 * Updating this script later? Paste the new version, Save, run setup() again,
 * then Deploy → Manage deployments → edit (pencil) → Version: New version.
 */

const CONFIG = {
  BUSINESS_NAME: 'Varsity Outdoor Services',
  NOTIFY_EMAIL: 'bergkampw@gmail.com', // who gets the new-request alert
  SEND_CUSTOMER_CONFIRMATION: true, // also email the customer a "we got it" note
  PHONE: '316.555.0123',
  FORM_TITLE: 'Varsity Outdoor Services – Request a Quote',
};

const SERVICES = [
  'Lawn Care',
  'Landscaping',
  'Tree & Shrub Care',
  'Snow Removal',
  'Seasonal Clean Ups',
  'Hardscaping',
  'Fertilization',
  'Irrigation',
  'Other / Not sure',
];

// Question titles — the email reads answers back by these exact names
const Q = {
  name: 'Full Name',
  email: 'Email',
  phone: 'Phone',
  address: 'Property Address',
  service: 'Service Interest',
  details: 'Tell us about your project',
};

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const props = PropertiesService.getDocumentProperties();

  props.setProperty('SHEET_ID', ss.getId());
  if (!props.getProperty('WEBHOOK_SECRET')) {
    props.setProperty('WEBHOOK_SECRET', Utilities.getUuid().replace(/-/g, ''));
  }

  const existingId = props.getProperty('FORM_ID');
  if (existingId) {
    const existing = FormApp.openById(existingId);
    installTrigger_(ss);
    writeInfoTab_(ss, existing);
    Logger.log('Form already set up: ' + existing.getPublishedUrl());
    return;
  }

  const form = FormApp.create(CONFIG.FORM_TITLE)
    .setDescription(
      "Tell us about your outdoor needs and our team will get back to you quickly with a free quote."
    )
    .setConfirmationMessage(
      'Thanks! We received your request and will be in touch shortly. ' +
        'Need us sooner? Call ' + CONFIG.PHONE + '.'
    )
    .setAllowResponseEdits(false)
    .setShowLinkToRespondAgain(false);

  form.addTextItem().setTitle(Q.name).setRequired(true);
  form
    .addTextItem()
    .setTitle(Q.email)
    .setRequired(true)
    .setValidation(
      FormApp.createTextValidation()
        .setHelpText('Please enter a valid email address.')
        .requireTextIsEmail()
        .build()
    );
  form.addTextItem().setTitle(Q.phone).setRequired(true);
  form.addTextItem().setTitle(Q.address).setHelpText('Street, city and ZIP');
  form.addListItem().setTitle(Q.service).setChoiceValues(SERVICES).setRequired(true);
  form.addParagraphTextItem().setTitle(Q.details).setRequired(true);

  // Responses go into a new tab of this spreadsheet
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  props.setProperty('FORM_ID', form.getId());

  // Keep the form in the same Drive folder as the spreadsheet
  const parents = DriveApp.getFileById(ss.getId()).getParents();
  if (parents.hasNext()) DriveApp.getFileById(form.getId()).moveTo(parents.next());

  installTrigger_(ss);
  writeInfoTab_(ss, form);

  Logger.log('Done! Share this link: ' + form.getPublishedUrl());
}

// Links and the website secret, in the first tab for easy reference
function writeInfoTab_(ss, form) {
  let shortUrl = form.getPublishedUrl();
  try {
    shortUrl = form.shortenFormUrl(shortUrl);
  } catch (err) {
    // Short links aren't always available; the full link works the same
  }

  const info = ss.getSheets().find((sh) => !sh.getFormUrl()) || ss.insertSheet('Setup', 0);
  info.clear();
  info.getRange('A1:B7').setValues([
    ['Varsity quote form', ''],
    ['Share this link with customers', form.getPublishedUrl()],
    ['Short link', shortUrl],
    ['Edit the form', form.getEditUrl()],
    ['New requests email', CONFIG.NOTIFY_EMAIL],
    ['', ''],
    ['Website secret (GOOGLE_SHEET_WEBHOOK_SECRET)', PropertiesService.getDocumentProperties().getProperty('WEBHOOK_SECRET')],
  ]);
  info.getRange('A1').setFontWeight('bold').setFontSize(14);
  info.setColumnWidth(1, 320);
  info.setColumnWidth(2, 520);
}

function installTrigger_(ss) {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === 'onQuoteSubmit')
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('onQuoteSubmit').forSpreadsheet(ss).onFormSubmit().create();
}

function onQuoteSubmit(e) {
  const answers = e.namedValues || {};
  const get = (title) => String((answers[title] && answers[title][0]) || '').trim();

  const r = {
    name: get(Q.name),
    email: get(Q.email),
    phone: get(Q.phone),
    address: get(Q.address),
    service: get(Q.service),
    details: get(Q.details),
  };

  notify_(r, 'Google Form', CONFIG.SEND_CUSTOMER_CONFIRMATION);
}

// Website submissions: POST JSON to the web app URL (see setup steps 5–6)
function doPost(e) {
  let body;
  try {
    body = JSON.parse((e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return json_({ ok: false, error: 'Invalid JSON' });
  }

  const props = PropertiesService.getDocumentProperties();
  const secret = props.getProperty('WEBHOOK_SECRET');
  if (!secret || body.secret !== secret) {
    return json_({ ok: false, error: 'Unauthorized' });
  }

  const r = {
    name: clean_(body.name),
    email: clean_(body.email),
    phone: clean_(body.phone),
    address: clean_(body.address),
    service: clean_(body.service),
    details: clean_(body.details, 4000),
  };
  if (!r.name || !r.email) return json_({ ok: false, error: 'Missing name or email' });
  const source = clean_(body.source) || 'Website';

  const lock = LockService.getDocumentLock();
  lock.waitLock(20000);
  try {
    appendRow_(r, source);
  } finally {
    lock.releaseLock();
  }

  // The detailed website quote form already sends its own emails
  if (body.notify !== false) notify_(r, source, CONFIG.SEND_CUSTOMER_CONFIRMATION);

  return json_({ ok: true });
}

// Add a row to the form's responses tab, matching its column headers
function appendRow_(r, source) {
  const ss = SpreadsheetApp.openById(PropertiesService.getDocumentProperties().getProperty('SHEET_ID'));
  const sheet = ss.getSheets().find((sh) => sh.getFormUrl()) || ss.getSheetByName('Website Requests') || ss.insertSheet('Website Requests');

  let lastCol = Math.max(sheet.getLastColumn(), 1);
  let headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(String);
  if (!headers.filter(String).length) {
    headers = ['Timestamp', Q.name, Q.email, Q.phone, Q.address, Q.service, Q.details];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  if (headers.indexOf('Source') === -1) {
    headers = headers.filter(String).concat('Source');
    sheet.getRange(1, headers.length).setValue('Source');
  }

  const values = {
    Timestamp: new Date(),
    Source: source,
  };
  values[Q.name] = r.name;
  values[Q.email] = r.email;
  values[Q.phone] = r.phone;
  values[Q.address] = r.address;
  values[Q.service] = r.service;
  values[Q.details] = r.details;

  sheet.appendRow(headers.map((h) => (h in values ? values[h] : '')));
}

function notify_(r, source, confirmCustomer) {
  const rows = [
    ['Name', r.name],
    ['Email', r.email],
    ['Phone', r.phone],
    ['Address', r.address || '—'],
    ['Service', r.service],
    ['Project details', r.details],
    ['Source', source],
  ];

  MailApp.sendEmail({
    to: CONFIG.NOTIFY_EMAIL,
    replyTo: r.email || CONFIG.NOTIFY_EMAIL,
    name: CONFIG.BUSINESS_NAME + ' Leads',
    subject: 'New Quote Request — ' + r.name + ' — ' + r.service,
    htmlBody: emailShell_(
      'New quote request',
      '<table cellpadding="8" style="border-collapse:collapse;width:100%;font-size:14px;">' +
        rows
          .map(
            ([k, v]) =>
              '<tr><td style="color:#556B3F;font-weight:bold;width:140px;vertical-align:top;border-bottom:1px solid #eee;">' +
              k +
              '</td><td style="border-bottom:1px solid #eee;">' +
              escape_(v).replace(/\n/g, '<br>') +
              '</td></tr>'
          )
          .join('') +
        '</table>' +
        '<p style="margin-top:20px;font-size:13px;color:#555;">Reply to this email to respond to ' +
        escape_(r.name || 'the customer') +
        ' directly. All requests are saved in the Quote Requests spreadsheet.</p>'
    ),
  });

  if (confirmCustomer && r.email) {
    MailApp.sendEmail({
      to: r.email,
      replyTo: CONFIG.NOTIFY_EMAIL,
      name: CONFIG.BUSINESS_NAME,
      subject: 'We received your quote request — ' + CONFIG.BUSINESS_NAME,
      htmlBody: emailShell_(
        'Thanks, ' + escape_(r.name.split(' ')[0] || 'there') + '!',
        '<p style="font-size:15px;line-height:1.6;">We received your request for <strong>' +
          escape_(r.service) +
          '</strong>. Our team will review it and get back to you shortly with a free quote.</p>' +
          '<p style="font-size:15px;line-height:1.6;">Questions in the meantime? Call us at ' +
          CONFIG.PHONE +
          ' or just reply to this email.</p>' +
          '<p style="font-size:15px;line-height:1.6;margin-top:24px;"><strong>Go with the winning team.</strong><br>' +
          CONFIG.BUSINESS_NAME +
          '</p>'
      ),
    });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function clean_(v, max) {
  return String(v == null ? '' : v).trim().slice(0, max || 500);
}

function emailShell_(heading, inner) {
  return (
    '<div style="background:#FAF8F3;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#1F1F1F;">' +
    '<div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #D9C9AB;">' +
    '<div style="background:#183A2E;color:#ffffff;padding:20px 24px;">' +
    '<div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#B8995B;">' +
    CONFIG.BUSINESS_NAME +
    '</div>' +
    '<div style="font-size:22px;font-weight:bold;margin-top:6px;">' +
    heading +
    '</div></div>' +
    '<div style="padding:24px;">' +
    inner +
    '</div></div></div>'
  );
}

function escape_(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
