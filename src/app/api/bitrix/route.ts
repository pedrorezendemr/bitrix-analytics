/**
 * Bitrix24 API Route
 * Proxies requests to Bitrix24 API with authentication
 */

import { NextRequest, NextResponse } from 'next/server'
import { getBitrixClient } from '@/lib/bitrix'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const endpoint = searchParams.get('endpoint')
  const dateFrom = searchParams.get('dateFrom')
  const dateTo = searchParams.get('dateTo')

  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 })
  }

  try {
    const client = getBitrixClient()

    switch (endpoint) {
      case 'leads': {
        const filter: Record<string, any> = {}
        if (dateFrom) filter['>=DATE_CREATE'] = dateFrom
        if (dateTo) filter['<=DATE_CREATE'] = dateTo
        
        const data = await client.getLeads({ filter })
        return NextResponse.json(data)
      }

      case 'leads/analytics': {
        if (!dateFrom || !dateTo) {
          return NextResponse.json({ error: 'dateFrom and dateTo are required' }, { status: 400 })
        }
        const analytics = await client.getLeadAnalytics(dateFrom, dateTo)
        return NextResponse.json(analytics)
      }

      case 'deals': {
        const filter: Record<string, any> = {}
        if (dateFrom) filter['>=DATE_CREATE'] = dateFrom
        if (dateTo) filter['<=DATE_CREATE'] = dateTo
        
        const data = await client.getDeals({ filter })
        return NextResponse.json(data)
      }

      case 'deals/analytics': {
        if (!dateFrom || !dateTo) {
          return NextResponse.json({ error: 'dateFrom and dateTo are required' }, { status: 400 })
        }
        const analytics = await client.getDealAnalytics(dateFrom, dateTo)
        return NextResponse.json(analytics)
      }

      case 'contacts': {
        const data = await client.getContacts()
        return NextResponse.json(data)
      }

      case 'activities': {
        const filter: Record<string, any> = {}
        if (dateFrom) filter['>=CREATED'] = dateFrom
        if (dateTo) filter['<=CREATED'] = dateTo
        
        const data = await client.getActivities({ filter })
        return NextResponse.json(data)
      }

      case 'users': {
        const data = await client.getUsers()
        return NextResponse.json(data)
      }

      case 'lead-statuses': {
        const data = await client.getLeadStatuses()
        return NextResponse.json(data)
      }

      case 'deal-stages': {
        const data = await client.getDealStages()
        return NextResponse.json(data)
      }

      default:
        return NextResponse.json({ error: 'Unknown endpoint' }, { status: 400 })
    }
  } catch (error: any) {
    console.error('Bitrix API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { method, params } = body

    if (!method) {
      return NextResponse.json({ error: 'Method is required' }, { status: 400 })
    }

    const client = getBitrixClient()
    const data = await client.call(method, params)

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Bitrix API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
