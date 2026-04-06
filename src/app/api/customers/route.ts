import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const type = searchParams.get('type')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createServerClient() as any
    let query = supabase
      .from('customers')
      .select('*')
      .order('full_name', { ascending: true })

    if (type && type !== 'all') {
      query = query.eq('property_type', type)
    }
    if (search) {
      query = query.or(
        `full_name.ilike.%${search}%,email.ilike.%${search}%,city.ilike.%${search}%`
      )
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ customers: data })
  } catch (error) {
    console.error('Customers GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createServerClient() as any

    const { data: customer, error } = await supabase
      .from('customers')
      .insert(body)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ customer }, { status: 201 })
  } catch (error) {
    console.error('Customers POST error:', error)
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Customer ID required' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createServerClient() as any
    const { data: customer, error } = await supabase
      .from('customers')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ customer })
  } catch (error) {
    console.error('Customers PATCH error:', error)
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 })
  }
}
