'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatNumber, getDateRange } from '@/lib/utils'

interface DashboardData {
  leads: {
    total: number
    totalValue: number
    byStatus: Record<string, number>
  } | null
  deals: {
    total: number
    totalValue: number
    won: { count: number; value: number }
    lost: { count: number; value: number }
    winRate: string
  } | null
}

const DATE_PRESETS = [
  { value: 'today', label: 'Hoje' },
  { value: 'yesterday', label: 'Ontem' },
  { value: 'last_7d', label: 'Últimos 7 dias' },
  { value: 'last_30d', label: 'Últimos 30 dias' },
  { value: 'this_month', label: 'Este Mês' },
]

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>({ leads: null, deals: null })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [datePreset, setDatePreset] = useState('last_30d')

  useEffect(() => {
    loadData()
  }, [datePreset])

  const loadData = async () => {
    setLoading(true)
    setError(null)

    const { from, to } = getDateRange(datePreset)

    try {
      const [leadsRes, dealsRes] = await Promise.all([
        fetch(`/api/bitrix?endpoint=leads/analytics&dateFrom=${from}&dateTo=${to}`),
        fetch(`/api/bitrix?endpoint=deals/analytics&dateFrom=${from}&dateTo=${to}`),
      ])

      const leads = leadsRes.ok ? await leadsRes.json() : null
      const deals = dealsRes.ok ? await dealsRes.json() : null

      setData({ leads, deals })
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Bitrix Analytics</h1>
              <p className="text-gray-400">Dashboard de Análise de Dados</p>
            </div>
            <nav className="flex gap-4">
              <Link href="/leads" className="text-gray-400 hover:text-white">Leads</Link>
              <Link href="/deals" className="text-gray-400 hover:text-white">Negócios</Link>
              <Link href="/activities" className="text-gray-400 hover:text-white">Atividades</Link>
              <Link href="/contacts" className="text-gray-400 hover:text-white">Contatos</Link>
              <Link href="/reports" className="text-gray-400 hover:text-white">Relatórios</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Date Filter */}
        <div className="mb-8 flex gap-2">
          {DATE_PRESETS.map((preset) => (
            <Button
              key={preset.value}
              variant={datePreset === preset.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDatePreset(preset.value)}
            >
              {preset.label}
            </Button>
          ))}
        </div>

        {/* Error State */}
        {error && (
          <Card className="mb-8 border-red-500 bg-red-950/20">
            <CardContent className="py-4">
              <p className="text-red-400">⚠️ {error}</p>
              <p className="text-sm text-gray-400 mt-2">
                Verifique se as variáveis de ambiente do Bitrix24 estão configuradas corretamente.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-400">Carregando dados do Bitrix24...</p>
          </div>
        )}

        {/* KPI Cards */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardDescription>Total de Leads</CardDescription>
                <CardTitle className="text-3xl text-blue-400">
                  {data.leads ? formatNumber(data.leads.total) : '-'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Valor: {data.leads ? formatCurrency(data.leads.totalValue) : '-'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardDescription>Total de Negócios</CardDescription>
                <CardTitle className="text-3xl text-green-400">
                  {data.deals ? formatNumber(data.deals.total) : '-'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Valor: {data.deals ? formatCurrency(data.deals.totalValue) : '-'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardDescription>Negócios Ganhos</CardDescription>
                <CardTitle className="text-3xl text-emerald-400">
                  {data.deals ? formatNumber(data.deals.won.count) : '-'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Receita: {data.deals ? formatCurrency(data.deals.won.value) : '-'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2">
                <CardDescription>Taxa de Conversão</CardDescription>
                <CardTitle className="text-3xl text-purple-400">
                  {data.deals ? `${data.deals.winRate}%` : '-'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Perdidos: {data.deals ? formatNumber(data.deals.lost.count) : '-'}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Lead Status Distribution */}
        {!loading && data.leads && (
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardHeader>
              <CardTitle>Distribuição de Leads por Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(data.leads.byStatus)
                  .sort(([, a], [, b]) => b - a)
                  .map(([status, count]) => {
                    const percentage = (count / data.leads!.total) * 100
                    return (
                      <div key={status}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{status}</span>
                          <span>{count} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/leads">
            <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>📊 Análise de Leads</CardTitle>
                <CardDescription>
                  Funil de conversão, fontes e tendências
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/deals">
            <Card className="bg-gray-900 border-gray-800 hover:border-green-500 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>💰 Pipeline de Vendas</CardTitle>
                <CardDescription>
                  Negócios, forecast e performance
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/reports">
            <Card className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>📈 Relatórios</CardTitle>
                <CardDescription>
                  Relatórios personalizados e exportação
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}
