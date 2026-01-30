/**
 * Bitrix24 API Client
 * Handles authentication and API calls to Bitrix24
 */

import axios, { AxiosInstance } from 'axios'

interface BitrixConfig {
  domain: string
  webhookToken?: string
  accessToken?: string
}

interface BitrixResponse<T> {
  result: T
  total?: number
  next?: number
}

interface Lead {
  ID: string
  TITLE: string
  NAME: string
  LAST_NAME: string
  STATUS_ID: string
  SOURCE_ID: string
  CURRENCY_ID: string
  OPPORTUNITY: string
  ASSIGNED_BY_ID: string
  DATE_CREATE: string
  DATE_MODIFY: string
  COMMENTS: string
  PHONE?: Array<{ VALUE: string; VALUE_TYPE: string }>
  EMAIL?: Array<{ VALUE: string; VALUE_TYPE: string }>
}

interface Deal {
  ID: string
  TITLE: string
  STAGE_ID: string
  CATEGORY_ID: string
  CURRENCY_ID: string
  OPPORTUNITY: string
  ASSIGNED_BY_ID: string
  CONTACT_ID: string
  COMPANY_ID: string
  DATE_CREATE: string
  DATE_MODIFY: string
  CLOSEDATE: string
  CLOSED: string
}

interface Contact {
  ID: string
  NAME: string
  LAST_NAME: string
  PHONE?: Array<{ VALUE: string; VALUE_TYPE: string }>
  EMAIL?: Array<{ VALUE: string; VALUE_TYPE: string }>
  DATE_CREATE: string
}

interface Activity {
  ID: string
  SUBJECT: string
  TYPE_ID: string
  DIRECTION: string
  COMPLETED: string
  RESPONSIBLE_ID: string
  CREATED: string
  START_TIME: string
  END_TIME: string
}

interface User {
  ID: string
  NAME: string
  LAST_NAME: string
  EMAIL: string
  WORK_POSITION: string
  ACTIVE: boolean
}

export class BitrixClient {
  private client: AxiosInstance
  private baseUrl: string

  constructor(config: BitrixConfig) {
    if (config.webhookToken) {
      this.baseUrl = `https://${config.domain}/rest/1/${config.webhookToken}`
    } else if (config.accessToken) {
      this.baseUrl = `https://${config.domain}/rest`
    } else {
      throw new Error('Either webhookToken or accessToken is required')
    }

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: config.accessToken
        ? { Authorization: `Bearer ${config.accessToken}` }
        : {},
    })
  }

  // Generic API call
  async call<T>(method: string, params?: Record<string, any>): Promise<BitrixResponse<T>> {
    const response = await this.client.post(`/${method}`, params)
    return response.data
  }

  // Batch API call
  async batch(calls: Record<string, string>): Promise<Record<string, any>> {
    const response = await this.client.post('/batch', {
      halt: 0,
      cmd: calls,
    })
    return response.data.result.result
  }

  // ==================== LEADS ====================

  async getLeads(params?: {
    filter?: Record<string, any>
    select?: string[]
    order?: Record<string, 'ASC' | 'DESC'>
    start?: number
  }): Promise<BitrixResponse<Lead[]>> {
    return this.call<Lead[]>('crm.lead.list', params)
  }

  async getLead(id: string): Promise<BitrixResponse<Lead>> {
    return this.call<Lead>('crm.lead.get', { id })
  }

  async getLeadStatuses(): Promise<BitrixResponse<Array<{ STATUS_ID: string; NAME: string }>>> {
    return this.call('crm.status.list', { filter: { ENTITY_ID: 'STATUS' } })
  }

  async getLeadSources(): Promise<BitrixResponse<Array<{ STATUS_ID: string; NAME: string }>>> {
    return this.call('crm.status.list', { filter: { ENTITY_ID: 'SOURCE' } })
  }

  // ==================== DEALS ====================

  async getDeals(params?: {
    filter?: Record<string, any>
    select?: string[]
    order?: Record<string, 'ASC' | 'DESC'>
    start?: number
  }): Promise<BitrixResponse<Deal[]>> {
    return this.call<Deal[]>('crm.deal.list', params)
  }

  async getDeal(id: string): Promise<BitrixResponse<Deal>> {
    return this.call<Deal>('crm.deal.get', { id })
  }

  async getDealStages(categoryId: number = 0): Promise<BitrixResponse<Array<{ STATUS_ID: string; NAME: string }>>> {
    return this.call('crm.dealcategory.stage.list', { id: categoryId })
  }

  async getDealCategories(): Promise<BitrixResponse<Array<{ ID: string; NAME: string }>>> {
    return this.call('crm.dealcategory.list')
  }

  // ==================== CONTACTS ====================

  async getContacts(params?: {
    filter?: Record<string, any>
    select?: string[]
    order?: Record<string, 'ASC' | 'DESC'>
    start?: number
  }): Promise<BitrixResponse<Contact[]>> {
    return this.call<Contact[]>('crm.contact.list', params)
  }

  async getContact(id: string): Promise<BitrixResponse<Contact>> {
    return this.call<Contact>('crm.contact.get', { id })
  }

  // ==================== ACTIVITIES ====================

  async getActivities(params?: {
    filter?: Record<string, any>
    select?: string[]
    order?: Record<string, 'ASC' | 'DESC'>
    start?: number
  }): Promise<BitrixResponse<Activity[]>> {
    return this.call<Activity[]>('crm.activity.list', params)
  }

  async getActivity(id: string): Promise<BitrixResponse<Activity>> {
    return this.call<Activity>('crm.activity.get', { id })
  }

  // ==================== USERS ====================

  async getUsers(params?: {
    filter?: Record<string, any>
    start?: number
  }): Promise<BitrixResponse<User[]>> {
    return this.call<User[]>('user.get', params)
  }

  async getCurrentUser(): Promise<BitrixResponse<User>> {
    return this.call<User>('user.current')
  }

  // ==================== ANALYTICS ====================

  async getLeadAnalytics(dateFrom: string, dateTo: string) {
    const [leads, statuses, sources] = await Promise.all([
      this.getLeads({
        filter: {
          '>=DATE_CREATE': dateFrom,
          '<=DATE_CREATE': dateTo,
        },
        select: ['ID', 'STATUS_ID', 'SOURCE_ID', 'OPPORTUNITY', 'DATE_CREATE', 'ASSIGNED_BY_ID'],
      }),
      this.getLeadStatuses(),
      this.getLeadSources(),
    ])

    const statusMap = new Map(statuses.result.map(s => [s.STATUS_ID, s.NAME]))
    const sourceMap = new Map(sources.result.map(s => [s.STATUS_ID, s.NAME]))

    // Group by status
    const byStatus: Record<string, number> = {}
    leads.result.forEach(lead => {
      const status = statusMap.get(lead.STATUS_ID) || lead.STATUS_ID
      byStatus[status] = (byStatus[status] || 0) + 1
    })

    // Group by source
    const bySource: Record<string, number> = {}
    leads.result.forEach(lead => {
      const source = sourceMap.get(lead.SOURCE_ID) || lead.SOURCE_ID || 'Não definido'
      bySource[source] = (bySource[source] || 0) + 1
    })

    // Group by date
    const byDate: Record<string, number> = {}
    leads.result.forEach(lead => {
      const date = lead.DATE_CREATE.split('T')[0]
      byDate[date] = (byDate[date] || 0) + 1
    })

    return {
      total: leads.total || leads.result.length,
      byStatus,
      bySource,
      byDate,
      totalValue: leads.result.reduce((sum, l) => sum + parseFloat(l.OPPORTUNITY || '0'), 0),
    }
  }

  async getDealAnalytics(dateFrom: string, dateTo: string) {
    const [deals, stages] = await Promise.all([
      this.getDeals({
        filter: {
          '>=DATE_CREATE': dateFrom,
          '<=DATE_CREATE': dateTo,
        },
        select: ['ID', 'STAGE_ID', 'OPPORTUNITY', 'CURRENCY_ID', 'DATE_CREATE', 'CLOSEDATE', 'CLOSED', 'ASSIGNED_BY_ID'],
      }),
      this.getDealStages(),
    ])

    const stageMap = new Map(stages.result.map(s => [s.STATUS_ID, s.NAME]))

    // Group by stage
    const byStage: Record<string, { count: number; value: number }> = {}
    deals.result.forEach(deal => {
      const stage = stageMap.get(deal.STAGE_ID) || deal.STAGE_ID
      if (!byStage[stage]) byStage[stage] = { count: 0, value: 0 }
      byStage[stage].count++
      byStage[stage].value += parseFloat(deal.OPPORTUNITY || '0')
    })

    // Won vs Lost
    const won = deals.result.filter(d => d.CLOSED === 'Y' && d.STAGE_ID.includes('WON'))
    const lost = deals.result.filter(d => d.CLOSED === 'Y' && !d.STAGE_ID.includes('WON'))

    return {
      total: deals.total || deals.result.length,
      totalValue: deals.result.reduce((sum, d) => sum + parseFloat(d.OPPORTUNITY || '0'), 0),
      byStage,
      won: {
        count: won.length,
        value: won.reduce((sum, d) => sum + parseFloat(d.OPPORTUNITY || '0'), 0),
      },
      lost: {
        count: lost.length,
        value: lost.reduce((sum, d) => sum + parseFloat(d.OPPORTUNITY || '0'), 0),
      },
      winRate: won.length + lost.length > 0
        ? (won.length / (won.length + lost.length) * 100).toFixed(1)
        : '0',
    }
  }
}

// Singleton instance
let bitrixClient: BitrixClient | null = null

export function getBitrixClient(): BitrixClient {
  if (!bitrixClient) {
    const domain = process.env.BITRIX_DOMAIN
    const webhookUrl = process.env.BITRIX_WEBHOOK_URL

    if (!domain && !webhookUrl) {
      throw new Error('BITRIX_DOMAIN or BITRIX_WEBHOOK_URL is required')
    }

    if (webhookUrl) {
      // Extract domain and token from webhook URL
      const match = webhookUrl.match(/https:\/\/([^\/]+)\/rest\/\d+\/([^\/]+)/)
      if (match) {
        bitrixClient = new BitrixClient({
          domain: match[1],
          webhookToken: match[2],
        })
      }
    } else if (domain) {
      bitrixClient = new BitrixClient({
        domain,
        accessToken: process.env.BITRIX_ACCESS_TOKEN,
      })
    }

    if (!bitrixClient) {
      throw new Error('Failed to initialize Bitrix client')
    }
  }

  return bitrixClient
}

export type { Lead, Deal, Contact, Activity, User, BitrixResponse }
