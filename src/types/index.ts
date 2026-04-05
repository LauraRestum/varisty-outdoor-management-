export type UserRole = 'owner' | 'customer'

export interface Profile {
  id: string
  user_id: string
  role: UserRole
  full_name: string
  phone: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  profile_id: string | null
  full_name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  property_size: PropertySize
  property_type: 'residential' | 'commercial'
  notes: string | null
  created_at: string
  updated_at: string
}

export type JobStatus = 'scheduled' | 'in_progress' | 'completed' | 'invoiced' | 'cancelled'

export interface Job {
  id: string
  customer_id: string
  customer?: Customer
  service_type: ServiceType
  status: JobStatus
  scheduled_date: string
  scheduled_time: string | null
  completed_at: string | null
  address: string
  city: string
  state: string
  zip: string
  notes: string | null
  internal_notes: string | null
  crew_size: number
  estimated_hours: number | null
  actual_hours: number | null
  price: number | null
  created_at: string
  updated_at: string
  photos?: JobPhoto[]
}

export interface JobPhoto {
  id: string
  job_id: string
  url: string
  type: 'before' | 'after' | 'during'
  caption: string | null
  created_at: string
}

export type QuoteStatus = 'pending' | 'sent' | 'viewed' | 'accepted' | 'declined'

export interface Quote {
  id: string
  customer_id: string | null
  customer?: Customer
  first_name: string
  last_name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  property_size: PropertySize
  property_type: 'residential' | 'commercial'
  services: ServiceType[]
  frequency: ServiceFrequency | null
  details: string | null
  has_fence: boolean
  has_gate: boolean
  gate_code: string | null
  has_irrigation: boolean
  snow_removal_priority: 'standard' | 'priority' | null
  is_commercial: boolean
  status: QuoteStatus
  estimated_price_low: number | null
  estimated_price_high: number | null
  notes: string | null
  created_at: string
  updated_at: string
  services_detail?: QuoteService[]
}

export interface QuoteService {
  id: string
  quote_id: string
  service_type: ServiceType
  notes: string | null
}

export type InvoiceStatus = 'pending' | 'paid' | 'overdue'

export interface Invoice {
  id: string
  customer_id: string
  customer?: Customer
  job_id: string | null
  job?: Job
  invoice_number: string
  status: InvoiceStatus
  due_date: string
  paid_at: string | null
  subtotal: number
  tax: number
  total: number
  notes: string | null
  created_at: string
  updated_at: string
  items?: InvoiceItem[]
}

export interface InvoiceItem {
  id: string
  invoice_id: string
  description: string
  quantity: number
  unit_price: number
  total: number
}

export interface Message {
  id: string
  customer_id: string
  customer?: Customer
  sender_role: UserRole
  content: string
  read_at: string | null
  created_at: string
}

export interface ServiceArea {
  id: string
  city: string
  state: string
  zip: string
  active: boolean
}

export type ServiceType =
  | 'lawn-mowing'
  | 'landscaping'
  | 'snow-removal'
  | 'irrigation'
  | 'tree-shrub-care'
  | 'hardscaping'
  | 'fertilization'
  | 'seasonal-cleanup'

export type PropertySize =
  | 'under-1/4-acre'
  | '1/4-to-1/2-acre'
  | '1/2-to-1-acre'
  | '1-to-3-acres'
  | '3+-acres'

export type ServiceFrequency =
  | 'one-time'
  | 'weekly'
  | 'bi-weekly'
  | 'monthly'
  | 'seasonal'

export interface QuoteFormData {
  // Step 1: Contact
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  // Step 2: Property & Services
  propertySize: PropertySize
  propertyType: 'residential' | 'commercial'
  services: ServiceType[]
  frequency: ServiceFrequency
  // Step 3: Details
  hasFence: boolean
  hasGate: boolean
  gateCode: string
  hasIrrigation: boolean
  snowRemovalPriority: 'standard' | 'priority'
  obstacles: string[]
  details: string
}

export interface DashboardStats {
  todayJobs: number
  pendingQuotes: number
  activeCustomers: number
  monthRevenue: number
  overdueInvoices: number
  completedThisWeek: number
}

export interface WeatherData {
  temp: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
  city: string
}
