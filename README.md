# Varsity Outdoor Management

A full-featured business management website for Varsity Outdoor Management — a professional lawn care, landscaping, and snow removal company.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (dark theme)
- **Forms**: React Hook Form + Zod
- **Database**: Supabase (Postgres + Auth + Storage)
- **Email**: Resend
- **Auth**: Supabase Auth with role-based access

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account and project
- A [Resend](https://resend.com) account and API key

### Setup

1. Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd varsity-outdoor-management
npm install
```

2. Copy the environment variables file:

```bash
cp .env.example .env.local
```

3. Fill in your environment variables in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=       # From Supabase Dashboard > Settings > API
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # From Supabase Dashboard > Settings > API
SUPABASE_SERVICE_ROLE_KEY=      # From Supabase Dashboard > Settings > API
RESEND_API_KEY=                  # From Resend Dashboard > API Keys
OWNER_EMAIL=bergkampw@gmail.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
OPENWEATHER_API_KEY=             # Optional: for dashboard weather widget
NEXT_PUBLIC_BUSINESS_CITY=      # Your city for weather
```

4. Set up the database by running `schema.sql` in your Supabase SQL editor:

```
Supabase Dashboard > SQL Editor > New Query > paste schema.sql contents > Run
```

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── (marketing)/         # Public website pages
│   │   ├── services/        # Service pages
│   │   ├── quote/           # Multi-step quote form
│   │   ├── contact/
│   │   └── about/
│   ├── (dashboard)/         # Owner dashboard (protected)
│   │   └── dashboard/
│   │       ├── jobs/
│   │       ├── customers/
│   │       ├── schedule/
│   │       ├── quotes/
│   │       └── invoices/
│   ├── (customer)/          # Customer portal (protected)
│   │   └── portal/
│   ├── (auth)/              # Auth pages
│   │   ├── login/
│   │   └── signup/
│   └── api/                 # API routes
├── components/
│   ├── layout/              # Navbar, Footer, layouts
│   ├── home/                # Homepage sections
│   ├── quote/               # Quote form components
│   ├── dashboard/           # Dashboard components
│   └── ui/                  # Reusable UI primitives
├── lib/
│   ├── supabase.ts
│   ├── resend.ts
│   ├── email-templates.ts
│   └── validations.ts
└── types/
    └── index.ts
```

## Features

### Public Website
- Homepage with hero, services overview, stats, before/after gallery, testimonials
- Individual service pages for all 8 services
- Multi-step quote request form with conditional logic
- Contact page
- About page

### Owner Dashboard
- Daily job overview with weather widget
- Job management (create, update status, assign)
- Customer CRM
- Calendar/schedule view
- Quote request management
- Invoice tracking

### Customer Portal
- Service history
- Upcoming appointments
- Invoice viewing and payment status
- Messaging with the team

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Make sure to add all environment variables in your Vercel project settings.

## License

Private — All rights reserved, Varsity Outdoor Management.
