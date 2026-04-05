export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          role: 'owner' | 'customer'
          full_name: string
          phone: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: 'owner' | 'customer'
          full_name: string
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'owner' | 'customer'
          full_name?: string
          phone?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          profile_id: string | null
          full_name: string
          email: string
          phone: string
          address: string
          city: string
          state: string
          zip: string
          property_size: string
          property_type: 'residential' | 'commercial'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id?: string | null
          full_name: string
          email: string
          phone: string
          address: string
          city: string
          state: string
          zip: string
          property_size: string
          property_type: 'residential' | 'commercial'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string | null
          full_name?: string
          email?: string
          phone?: string
          address?: string
          city?: string
          state?: string
          zip?: string
          property_size?: string
          property_type?: 'residential' | 'commercial'
          notes?: string | null
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          customer_id: string
          service_type: string
          status: 'scheduled' | 'in_progress' | 'completed' | 'invoiced' | 'cancelled'
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
        }
        Insert: {
          id?: string
          customer_id: string
          service_type: string
          status?: 'scheduled' | 'in_progress' | 'completed' | 'invoiced' | 'cancelled'
          scheduled_date: string
          scheduled_time?: string | null
          completed_at?: string | null
          address: string
          city: string
          state: string
          zip: string
          notes?: string | null
          internal_notes?: string | null
          crew_size?: number
          estimated_hours?: number | null
          actual_hours?: number | null
          price?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          service_type?: string
          status?: 'scheduled' | 'in_progress' | 'completed' | 'invoiced' | 'cancelled'
          scheduled_date?: string
          scheduled_time?: string | null
          completed_at?: string | null
          address?: string
          city?: string
          state?: string
          zip?: string
          notes?: string | null
          internal_notes?: string | null
          crew_size?: number
          estimated_hours?: number | null
          actual_hours?: number | null
          price?: number | null
          updated_at?: string
        }
      }
      quotes: {
        Row: {
          id: string
          customer_id: string | null
          first_name: string
          last_name: string
          email: string
          phone: string
          address: string
          city: string
          state: string
          zip: string
          property_size: string
          property_type: 'residential' | 'commercial'
          services: string[]
          frequency: string | null
          details: string | null
          has_fence: boolean
          has_gate: boolean
          gate_code: string | null
          has_irrigation: boolean
          snow_removal_priority: 'standard' | 'priority' | null
          is_commercial: boolean
          status: 'pending' | 'sent' | 'viewed' | 'accepted' | 'declined'
          estimated_price_low: number | null
          estimated_price_high: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id?: string | null
          first_name: string
          last_name: string
          email: string
          phone: string
          address: string
          city: string
          state: string
          zip: string
          property_size: string
          property_type: 'residential' | 'commercial'
          services: string[]
          frequency?: string | null
          details?: string | null
          has_fence?: boolean
          has_gate?: boolean
          gate_code?: string | null
          has_irrigation?: boolean
          snow_removal_priority?: 'standard' | 'priority' | null
          is_commercial?: boolean
          status?: 'pending' | 'sent' | 'viewed' | 'accepted' | 'declined'
          estimated_price_low?: number | null
          estimated_price_high?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: 'pending' | 'sent' | 'viewed' | 'accepted' | 'declined'
          estimated_price_low?: number | null
          estimated_price_high?: number | null
          notes?: string | null
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          customer_id: string
          job_id: string | null
          invoice_number: string
          status: 'pending' | 'paid' | 'overdue'
          due_date: string
          paid_at: string | null
          subtotal: number
          tax: number
          total: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          job_id?: string | null
          invoice_number: string
          status?: 'pending' | 'paid' | 'overdue'
          due_date: string
          paid_at?: string | null
          subtotal: number
          tax: number
          total: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: 'pending' | 'paid' | 'overdue'
          paid_at?: string | null
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
