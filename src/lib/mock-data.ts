/**
 * Mock data for demonstration
 * Simulates Bitrix24 CRM data for Cepalab
 */

export const mockLeadsAnalytics = {
  total: 1247,
  totalValue: 2845000,
  byStatus: {
    'Novo': 312,
    'Em Qualificação': 245,
    'Em Negociação': 189,
    'Proposta Enviada': 156,
    'Aguardando Decisão': 134,
    'Convertido': 211,
  },
  bySource: {
    'Site': 423,
    'Indicação': 287,
    'LinkedIn': 198,
    'Eventos': 156,
    'Cold Call': 98,
    'Outros': 85,
  },
  byDate: {
    '2026-01-24': 45,
    '2026-01-25': 52,
    '2026-01-26': 38,
    '2026-01-27': 67,
    '2026-01-28': 71,
    '2026-01-29': 58,
    '2026-01-30': 42,
  },
}

export const mockDealsAnalytics = {
  total: 856,
  totalValue: 12450000,
  byStage: {
    'Qualificação': { count: 156, value: 1890000 },
    'Apresentação': { count: 134, value: 2340000 },
    'Proposta': { count: 112, value: 2780000 },
    'Negociação': { count: 98, value: 2450000 },
    'Fechamento': { count: 67, value: 1890000 },
    'Ganho': { count: 289, value: 1100000 },
  },
  won: {
    count: 289,
    value: 8940000,
  },
  lost: {
    count: 78,
    value: 1240000,
  },
  winRate: '78.7',
}

export const mockUsers = [
  { id: '1', name: 'Ana Silva', role: 'Gerente Comercial', deals: 45, value: 1250000 },
  { id: '2', name: 'Carlos Santos', role: 'Executivo de Vendas', deals: 38, value: 980000 },
  { id: '3', name: 'Maria Oliveira', role: 'Executivo de Vendas', deals: 34, value: 870000 },
  { id: '4', name: 'João Pedro', role: 'SDR', deals: 28, value: 650000 },
  { id: '5', name: 'Fernanda Costa', role: 'SDR', deals: 25, value: 590000 },
]

export const mockActivities = {
  total: 3456,
  byType: {
    'Ligações': 1234,
    'E-mails': 987,
    'Reuniões': 456,
    'Tarefas': 389,
    'WhatsApp': 290,
    'Visitas': 100,
  },
  byUser: {
    'Ana Silva': 678,
    'Carlos Santos': 589,
    'Maria Oliveira': 534,
    'João Pedro': 456,
    'Fernanda Costa': 412,
  },
  completionRate: 87.3,
}

export const mockRecentLeads = [
  { id: '1', title: 'Hospital Santa Maria - Equipamentos', value: 125000, status: 'Em Negociação', source: 'Site', date: '2026-01-30' },
  { id: '2', title: 'Clínica Diagnóstica Premium', value: 89000, status: 'Proposta Enviada', source: 'Indicação', date: '2026-01-30' },
  { id: '3', title: 'Laboratório Central - Expansão', value: 156000, status: 'Novo', source: 'LinkedIn', date: '2026-01-29' },
  { id: '4', title: 'Rede Farmácias União', value: 234000, status: 'Em Qualificação', source: 'Eventos', date: '2026-01-29' },
  { id: '5', title: 'Centro Médico Integrado', value: 78000, status: 'Em Negociação', source: 'Cold Call', date: '2026-01-28' },
]

export const mockRecentDeals = [
  { id: '1', title: 'Contrato Anual - Rede Drogasil', value: 450000, stage: 'Ganho', owner: 'Ana Silva', closeDate: '2026-01-30' },
  { id: '2', title: 'Equipamentos Lab - DASA', value: 320000, stage: 'Negociação', owner: 'Carlos Santos', closeDate: '2026-02-15' },
  { id: '3', title: 'Autotestes - Pague Menos', value: 180000, stage: 'Proposta', owner: 'Maria Oliveira', closeDate: '2026-02-10' },
  { id: '4', title: 'Distribuição Regional Sul', value: 275000, stage: 'Apresentação', owner: 'João Pedro', closeDate: '2026-02-20' },
  { id: '5', title: 'Parceria Hospitalar RJ', value: 520000, stage: 'Qualificação', owner: 'Fernanda Costa', closeDate: '2026-03-01' },
]

export const mockMonthlyTrend = [
  { month: 'Ago', leads: 890, deals: 234, revenue: 1890000 },
  { month: 'Set', leads: 945, deals: 256, revenue: 2120000 },
  { month: 'Out', leads: 1023, deals: 278, revenue: 2340000 },
  { month: 'Nov', leads: 1156, deals: 298, revenue: 2560000 },
  { month: 'Dez', leads: 1089, deals: 312, revenue: 2780000 },
  { month: 'Jan', leads: 1247, deals: 289, revenue: 2450000 },
]
