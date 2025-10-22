import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utilidad para combinar clases de Tailwind de forma segura
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formatear número de teléfono
export function formatPhoneNumber(phone: string): string {
  // Eliminar todo excepto números
  const cleaned = phone.replace(/\D/g, '')
  return cleaned
}

// Validar número de teléfono
export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 7 && cleaned.length <= 15
}

// Validar email
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Formatear fecha para HubSpot
export function formatDateForHubSpot(): string {
  return new Date().toISOString()
}

// Generar ID único para tracking
export function generateTrackingId(): string {
  return `cx-tech-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Delay helper para animaciones
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Sanitizar input para prevenir XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim()
}

// Obtener mensaje de error amigable
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'Ha ocurrido un error inesperado'
}