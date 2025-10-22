import { NextRequest, NextResponse } from 'next/server'
import type { LeadFormData, ApiResponse } from '@/types'
import { validatePhone, formatDateForHubSpot, generateTrackingId, sanitizeInput } from '@/lib/utils'

// Simular guardado en archivo local (para backup)
async function saveToLocalBackup(leadData: LeadFormData) {
  try {
    // En producción esto guardaría en una base de datos real
    console.log('📁 Guardando backup local:', leadData)
    return true
  } catch (error) {
    console.error('Error guardando backup local:', error)
    return false
  }
}

// Enviar lead a HubSpot
async function sendToHubSpot(leadData: LeadFormData) {
  const HUBSPOT_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN
  
  if (!HUBSPOT_TOKEN) {
    console.warn('⚠️ HubSpot token no configurado')
    return { success: false, error: 'HubSpot not configured' }
  }

  try {
    const hubspotData = {
      properties: {
        firstname: leadData.nombre.split(' ')[0],
        lastname: leadData.nombre.split(' ').slice(1).join(' ') || '',
        phone: `${leadData.codigoPais}${leadData.telefono}`,
        company: leadData.empresa || 'No especificada',
        industry: leadData.industria || 'Otro',
        lifecyclestage: 'lead',
        hs_lead_status: 'NEW',
        lead_source: 'CX Tech Day 2025',
        event_date: formatDateForHubSpot(),
        conecta2_demo_requested: true
      }
    }

    // Aquí iría la llamada real a HubSpot API
    console.log('📤 Enviando a HubSpot:', hubspotData)
    
    // Simulación de respuesta exitosa
    return { success: true, contactId: generateTrackingId() }
  } catch (error) {
    console.error('Error enviando a HubSpot:', error)
    return { success: false, error: 'HubSpot API error' }
  }
}

// Trigger llamada en Conecta2
async function triggerConecta2Call(leadData: LeadFormData) {
  const CONECTA2_API_KEY = process.env.CONECTA2_API_KEY
  const CONECTA2_API_URL = process.env.CONECTA2_API_URL
  const CONECTA2_SCENARIO_ID = process.env.CONECTA2_SCENARIO_ID

  if (!CONECTA2_API_KEY) {
    console.warn('⚠️ Conecta2 API key no configurada')
    return { success: false, error: 'Conecta2 not configured' }
  }

  try {
    const callRequest = {
      phone: `${leadData.codigoPais}${leadData.telefono}`,
      name: leadData.nombre,
      scenario_id: CONECTA2_SCENARIO_ID || 'cx-tech-day-demo',
      metadata: {
        source: 'cx_tech_day_2025',
        event: 'demo_request',
        timestamp: new Date().toISOString(),
        empresa: leadData.empresa,
        industria: leadData.industria
      }
    }

    // Aquí iría la llamada real a Conecta2 API
    console.log('📞 Triggering Conecta2 call:', callRequest)
    
    // Simulación de respuesta exitosa
    return { success: true, callId: generateTrackingId() }
  } catch (error) {
    console.error('Error triggering Conecta2 call:', error)
    return { success: false, error: 'Conecta2 API error' }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validación de datos
    if (!body.nombre || !body.telefono) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Nombre y teléfono son requeridos' },
        { status: 400 }
      )
    }

    if (!validatePhone(body.telefono)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Número de teléfono inválido' },
        { status: 400 }
      )
    }

    // Sanitizar inputs
    const leadData: LeadFormData = {
      nombre: sanitizeInput(body.nombre),
      telefono: sanitizeInput(body.telefono),
      codigoPais: body.codigoPais || '+57',
      empresa: body.empresa ? sanitizeInput(body.empresa) : undefined,
      industria: body.industria ? sanitizeInput(body.industria) : undefined,
      source: 'cx_tech_day_2025'
    }

    // Guardar en paralelo
    const [backupResult, hubspotResult, conecta2Result] = await Promise.all([
      saveToLocalBackup(leadData),
      sendToHubSpot(leadData),
      triggerConecta2Call(leadData)
    ])

    // Verificar resultados
    if (!backupResult && !hubspotResult.success) {
      throw new Error('Failed to save lead data')
    }

    // Respuesta exitosa
    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Lead procesado exitosamente',
      data: {
        leadId: generateTrackingId(),
        hubspotSuccess: hubspotResult.success,
        callTriggered: conecta2Result.success
      }
    })

  } catch (error) {
    console.error('Error processing lead:', error)
    return NextResponse.json<ApiResponse>(
      { 
        success: false, 
        error: 'Error procesando el lead. Por favor intenta nuevamente.' 
      },
      { status: 500 }
    )
  }
}

// GET endpoint para obtener estadísticas
export async function GET(request: NextRequest) {
  try {
    // Aquí podrías obtener estadísticas reales de la base de datos
    const stats = {
      totalLeads: 127,
      todayLeads: 45,
      callsCompleted: 42,
      conversionRate: 0.82,
      lastUpdate: new Date().toISOString()
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: stats
    })

  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Error obteniendo estadísticas' },
      { status: 500 }
    )
  }
}