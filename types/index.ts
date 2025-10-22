// Tipos para el formulario de leads
export interface LeadFormData {
  nombre: string
  telefono: string
  codigoPais: string
  empresa?: string
  industria?: string
  cargo?: string
  source?: string
}

// Tipos para respuestas de API
export interface ApiResponse {
  success: boolean
  message?: string
  data?: any
  error?: string
}

// Tipos para HubSpot
export interface HubSpotContact {
  firstname: string
  lastname?: string
  phone: string
  company?: string
  industry?: string
  lifecyclestage: string
  hs_lead_status: string
  lead_source: string
  event_date: string
  conecta2_demo_requested: boolean
}

// Tipos para Conecta2 API
export interface Conecta2CallRequest {
  phone: string
  name: string
  scenario_id: string
  metadata: {
    source: string
    event: string
    timestamp: string
    empresa?: string
    industria?: string
  }
}

// Constantes
export const INDUSTRIAS = [
  'Tecnología',
  'Salud',
  'Retail',
  'Servicios',
  'Educación',
  'Restaurantes',
  'Inmobiliaria',
  'Logística',
  'Manufactura',
  'Finanzas',
  'Otro'
] as const

export const CODIGOS_PAIS = [
  { code: '+57', country: 'Colombia' },
  { code: '+1', country: 'USA / Canadá' },
  { code: '+52', country: 'México' },
  { code: '+54', country: 'Argentina' },
  { code: '+56', country: 'Chile' },
  { code: '+51', country: 'Perú' },
  { code: '+593', country: 'Ecuador' },
  { code: '+34', country: 'España' },
  { code: '+55', country: 'Brasil' },
] as const

export type Industria = typeof INDUSTRIAS[number]
export type CodigoPais = typeof CODIGOS_PAIS[number]