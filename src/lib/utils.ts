import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, currency: string = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value)
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('pt-BR')
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString('pt-BR')
}

// Date helpers
export function getDateRange(preset: string): { from: string; to: string } {
  const today = new Date()
  const to = today.toISOString().split('T')[0]
  
  switch (preset) {
    case 'today':
      return { from: to, to }
    case 'yesterday': {
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      const from = yesterday.toISOString().split('T')[0]
      return { from, to: from }
    }
    case 'last_7d': {
      const from = new Date(today)
      from.setDate(from.getDate() - 7)
      return { from: from.toISOString().split('T')[0], to }
    }
    case 'last_30d': {
      const from = new Date(today)
      from.setDate(from.getDate() - 30)
      return { from: from.toISOString().split('T')[0], to }
    }
    case 'this_month': {
      const from = new Date(today.getFullYear(), today.getMonth(), 1)
      return { from: from.toISOString().split('T')[0], to }
    }
    case 'last_month': {
      const from = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const toDate = new Date(today.getFullYear(), today.getMonth(), 0)
      return { from: from.toISOString().split('T')[0], to: toDate.toISOString().split('T')[0] }
    }
    default:
      return { from: to, to }
  }
}
