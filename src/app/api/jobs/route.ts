export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { createJobSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const date = searchParams.get('date')
    const customerId = searchParams.get('customerId')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createServerClient() as any
    let query = supabase
      .from('jobs')
      .select('*, customer:customers(*)')
      .order('scheduled_date', { ascending: true })

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }
    if (date) {
      query = query.eq('scheduled_date', date)
    }
    if (customerId) {
      query = query.eq('customer_id', customerId)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ jobs: data })
  } catch (error) {
    console.error('Jobs GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = createJobSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const data = result.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createServerClient() as any

    const { data: job, error } = await supabase
      .from('jobs')
      .insert({
        customer_id: data.customerId,
        service_type: data.serviceType,
        status: 'scheduled',
        scheduled_date: data.scheduledDate,
        scheduled_time: data.scheduledTime || null,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        crew_size: data.crewSize,
        estimated_hours: data.estimatedHours || null,
        price: data.price || null,
        notes: data.notes || null,
        internal_notes: data.internalNotes || null,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ job }, { status: 201 })
  } catch (error) {
    console.error('Jobs POST error:', error)
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Job ID required' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createServerClient() as any
    const { data: job, error } = await supabase
      .from('jobs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ job })
  } catch (error) {
    console.error('Jobs PATCH error:', error)
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 })
  }
}
