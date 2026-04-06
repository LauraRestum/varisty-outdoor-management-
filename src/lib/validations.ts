import { z } from 'zod'

// --- Quote Form Schemas ---

export const quoteStep1Schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[\d\s\-\(\)\+]+$/, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Please enter your full street address'),
  city: z.string().min(2, 'Please enter your city'),
  state: z.string().min(2, 'Please enter your state'),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
})

export const quoteStep2Schema = z.object({
  propertySize: z.enum(
    ['under-1/4-acre', '1/4-to-1/2-acre', '1/2-to-1-acre', '1-to-3-acres', '3+-acres'],
    { required_error: 'Please select your property size' }
  ),
  propertyType: z.enum(['residential', 'commercial'], {
    required_error: 'Please select your property type',
  }),
  services: z
    .array(
      z.enum([
        'lawn-mowing',
        'landscaping',
        'snow-removal',
        'irrigation',
        'tree-shrub-care',
        'hardscaping',
        'fertilization',
        'seasonal-cleanup',
      ])
    )
    .min(1, 'Please select at least one service'),
  frequency: z.enum(['one-time', 'weekly', 'bi-weekly', 'monthly', 'seasonal'], {
    required_error: 'Please select a service frequency',
  }),
})

export const quoteStep3Schema = z.object({
  hasFence: z.boolean(),
  hasGate: z.boolean(),
  gateCode: z.string().optional(),
  hasIrrigation: z.boolean(),
  snowRemovalPriority: z.enum(['standard', 'priority']).optional(),
  obstacles: z.array(z.string()),
  details: z.string().max(1000, 'Details must be under 1000 characters').optional(),
})

export const quoteFormSchema = quoteStep1Schema
  .merge(quoteStep2Schema)
  .merge(quoteStep3Schema)

export type QuoteStep1Data = z.infer<typeof quoteStep1Schema>
export type QuoteStep2Data = z.infer<typeof quoteStep2Schema>
export type QuoteStep3Data = z.infer<typeof quoteStep3Schema>
export type QuoteFormData = z.infer<typeof quoteFormSchema>

// --- Contact Form Schema ---

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be under 2000 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// --- Auth Schemas ---

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const signupSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type LoginData = z.infer<typeof loginSchema>
export type SignupData = z.infer<typeof signupSchema>

// --- Job Schema (dashboard) ---

export const createJobSchema = z.object({
  customerId: z.string().uuid('Invalid customer ID'),
  serviceType: z.enum([
    'lawn-mowing',
    'landscaping',
    'snow-removal',
    'irrigation',
    'tree-shrub-care',
    'hardscaping',
    'fertilization',
    'seasonal-cleanup',
  ]),
  scheduledDate: z.string().min(1, 'Please select a date'),
  scheduledTime: z.string().optional(),
  address: z.string().min(5, 'Please enter the full address'),
  city: z.string().min(2, 'Please enter the city'),
  state: z.string().min(2, 'Please enter the state'),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  crewSize: z.number().int().min(1).max(10),
  estimatedHours: z.number().min(0.5).max(24).optional(),
  price: z.number().min(0).optional(),
  notes: z.string().max(500).optional(),
  internalNotes: z.string().max(500).optional(),
})

export type CreateJobData = z.infer<typeof createJobSchema>
