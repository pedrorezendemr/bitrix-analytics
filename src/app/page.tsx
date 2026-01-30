'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { 
  mockLeadsAnalytics, 
  mockDealsAnalytics, 
  mockUsers, 
  mockRecentLeads,
  mockRecentDeals,
  mockMonthlyTrend,
  mockActivities 
} from '@/lib/mock-data'

const DATE_PRESETS = [
  { value: 'today', label: 'Hoje' },
  { value: 'yesterday', label: 'Ontem' },
  { value: 'last_7d', label: 'Últimos 7 dias' },
  { value: 'last_30d', label: 'Últimos 30 dias' },
  { value: 'this_month', label: 'Este Mês' },
]

export default function Dashboard() {
  const [datePreset, setDatePreset] = useState('last_30d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setLoading(true)
    setTimeout(() => setLoading(false), 800)
  }, [datePreset])

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* Header */}
      <header className="border-b border-[#1e2a3a] bg-[#0d1424]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00a8e8] to-[#0077b6] flex items-center justify-center font-bold text-xl">
                  C
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Cepalab</h1>
                  <p className="text-xs text-[#00a8e8]">Analytics Dashboard</p>
                </div>
              </div>
            </div>
            <nav className="flex gap-6">
              <Link href="/" className="text-white font-medium border-b-2 border-[#00a8e8] pb-1">Dashboard</Link>
              <Link href="/leads" className="text-gray-400 hover:text-white transition-colors">Leads</Link>
              <Link href="/deals" className="text-gray-400 hover:text-white transition-colors">Negócios</Link>
              <Link href="/activities" className="text-gray-400 hover:text-white transition-colors">Atividades</Link>
              <Link href="/reports" className="text-gray-400 hover:text-white transition-colors">Relatórios</Link>
            </nav>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Bem-vindo, Admin</span>
              <div className="w-8 h-8 rounded-full bg-[#00a8e8] flex items-center justify-center text-sm font-medium">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Page Title & Filters */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Visão Geral</h2>
            <p className="text-gray-400">Acompanhe os principais indicadores do CRM</p>
          </div>
          <div className="flex gap-2">
            {DATE_PRESETS.map((preset) => (
              <Button
                key={preset.value}
                variant={datePreset === preset.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDatePreset(preset.value)}
                className={datePreset === preset.value 
                  ? 'bg-[#00a8e8] hover:bg-[#0077b6] text-white' 
                  : 'border-[#1e2a3a] text-gray-400 hover:text-white hover:border-[#00a8e8]'
                }
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-[#00a8e8] border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-400">Carregando dados...</p>
          </div>
        )}

        {/* KPI Cards */}
        {!loading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-[#0d1424] border-[#1e2a3a] hover:border-[#00a8e8] transition-colors">
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-400">Total de Leads</CardDescription>
                  <CardTitle className="text-3xl text-[#00a8e8]">
                    {formatNumber(mockLeadsAnalytics.total)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">
                    Valor potencial: {formatCurrency(mockLeadsAnalytics.totalValue)}
                  </p>
                  <p className="text-xs text-green-400 mt-1">↑ 12.5% vs período anterior</p>
                </CardContent>
              </Card>

              <Card className="bg-[#0d1424] border-[#1e2a3a] hover:border-[#00a8e8] transition-colors">
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-400">Total de Negócios</CardDescription>
                  <CardTitle className="text-3xl text-[#22c55e]">
                    {formatNumber(mockDealsAnalytics.total)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">
                    Pipeline: {formatCurrency(mockDealsAnalytics.totalValue)}
                  </p>
                  <p className="text-xs text-green-400 mt-1">↑ 8.3% vs período anterior</p>
                </CardContent>
              </Card>

              <Card className="bg-[#0d1424] border-[#1e2a3a] hover:border-[#00a8e8] transition-colors">
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-400">Receita Fechada</CardDescription>
                  <CardTitle className="text-3xl text-[#a855f7]">
                    {formatCurrency(mockDealsAnalytics.won.value)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">
                    {formatNumber(mockDealsAnalytics.won.count)} negócios ganhos
                  </p>
                  <p className="text-xs text-green-400 mt-1">↑ 15.2% vs período anterior</p>
                </CardContent>
              </Card>

              <Card className="bg-[#0d1424] border-[#1e2a3a] hover:border-[#00a8e8] transition-colors">
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-400">Taxa de Conversão</CardDescription>
                  <CardTitle className="text-3xl text-[#f59e0b]">
                    {mockDealsAnalytics.winRate}%
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">
                    Perdidos: {formatNumber(mockDealsAnalytics.lost.count)}
                  </p>
                  <p className="text-xs text-green-400 mt-1">↑ 3.1% vs período anterior</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Lead Status Distribution */}
              <Card className="bg-[#0d1424] border-[#1e2a3a]">
                <CardHeader>
                  <CardTitle className="text-lg">Funil de Leads</CardTitle>
                  <CardDescription>Distribuição por status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(mockLeadsAnalytics.byStatus)
                      .map(([status, count], index) => {
                        const percentage = (count / mockLeadsAnalytics.total) * 100
                        const colors = ['#00a8e8', '#0077b6', '#22c55e', '#a855f7', '#f59e0b', '#ef4444']
                        return (
                          <div key={status}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">{status}</span>
                              <span className="text-gray-400">{count} ({percentage.toFixed(1)}%)</span>
                            </div>
                            <div className="w-full bg-[#1e2a3a] rounded-full h-2">
                              <div 
                                className="h-2 rounded-full transition-all" 
                                style={{ width: `${percentage}%`, backgroundColor: colors[index % colors.length] }}
                              />
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>

              {/* Lead Sources */}
              <Card className="bg-[#0d1424] border-[#1e2a3a]">
                <CardHeader>
                  <CardTitle className="text-lg">Origem dos Leads</CardTitle>
                  <CardDescription>Canais de aquisição</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(mockLeadsAnalytics.bySource)
                      .sort(([, a], [, b]) => b - a)
                      .map(([source, count], index) => {
                        const percentage = (count / mockLeadsAnalytics.total) * 100
                        const colors = ['#00a8e8', '#22c55e', '#a855f7', '#f59e0b', '#ef4444', '#6b7280']
                        return (
                          <div key={source}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">{source}</span>
                              <span className="text-gray-400">{count} ({percentage.toFixed(1)}%)</span>
                            </div>
                            <div className="w-full bg-[#1e2a3a] rounded-full h-2">
                              <div 
                                className="h-2 rounded-full transition-all" 
                                style={{ width: `${percentage}%`, backgroundColor: colors[index % colors.length] }}
                              />
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Recent Leads */}
              <Card className="bg-[#0d1424] border-[#1e2a3a]">
                <CardHeader>
                  <CardTitle className="text-lg">Leads Recentes</CardTitle>
                  <CardDescription>Últimos leads cadastrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockRecentLeads.map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between p-3 bg-[#1e2a3a]/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{lead.title}</p>
                          <p className="text-xs text-gray-400">{lead.source} • {lead.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-[#00a8e8] font-medium">{formatCurrency(lead.value)}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            lead.status === 'Convertido' ? 'bg-green-500/20 text-green-400' :
                            lead.status === 'Em Negociação' ? 'bg-purple-500/20 text-purple-400' :
                            lead.status === 'Proposta Enviada' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Deals */}
              <Card className="bg-[#0d1424] border-[#1e2a3a]">
                <CardHeader>
                  <CardTitle className="text-lg">Negócios em Destaque</CardTitle>
                  <CardDescription>Pipeline ativo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockRecentDeals.map((deal) => (
                      <div key={deal.id} className="flex items-center justify-between p-3 bg-[#1e2a3a]/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{deal.title}</p>
                          <p className="text-xs text-gray-400">{deal.owner} • Fecha: {deal.closeDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-[#22c55e] font-medium">{formatCurrency(deal.value)}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            deal.stage === 'Ganho' ? 'bg-green-500/20 text-green-400' :
                            deal.stage === 'Negociação' ? 'bg-purple-500/20 text-purple-400' :
                            deal.stage === 'Proposta' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {deal.stage}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Performance */}
            <Card className="bg-[#0d1424] border-[#1e2a3a]">
              <CardHeader>
                <CardTitle className="text-lg">Performance da Equipe</CardTitle>
                <CardDescription>Ranking de vendedores por receita</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1e2a3a]">
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">Vendedor</th>
                        <th className="text-left py-3 px-2 text-gray-400 font-medium">Cargo</th>
                        <th className="text-right py-3 px-2 text-gray-400 font-medium">Negócios</th>
                        <th className="text-right py-3 px-2 text-gray-400 font-medium">Receita</th>
                        <th className="text-right py-3 px-2 text-gray-400 font-medium">Ticket Médio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map((user, index) => (
                        <tr key={user.id} className="border-b border-[#1e2a3a]/50 hover:bg-[#1e2a3a]/30">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                                index === 1 ? 'bg-gray-400/20 text-gray-300' :
                                index === 2 ? 'bg-orange-500/20 text-orange-400' :
                                'bg-[#1e2a3a] text-gray-400'
                              }`}>
                                {index + 1}
                              </div>
                              <span className="font-medium">{user.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-gray-400">{user.role}</td>
                          <td className="py-3 px-2 text-right">{user.deals}</td>
                          <td className="py-3 px-2 text-right text-[#22c55e] font-medium">{formatCurrency(user.value)}</td>
                          <td className="py-3 px-2 text-right text-gray-400">{formatCurrency(user.value / user.deals)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1e2a3a] bg-[#0d1424] mt-8">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <p>© 2026 Cepalab Analytics. Todos os direitos reservados.</p>
            <p>Integrado com Bitrix24 CRM</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
