'use client'

import { useState, useEffect } from 'react'
import { X, Phone } from 'lucide-react'

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
  preselectedIndustry?: string
}

export default function DemoModal({ isOpen, onClose, preselectedIndustry }: DemoModalProps) {
  const [step, setStep] = useState(1)
  const [countdown, setCountdown] = useState(30)
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    codigoPais: '+57',
    empresa: '',
    industria: ''
  })

  useEffect(() => {
    if (preselectedIndustry) {
      setFormData(prev => ({ ...prev, industria: preselectedIndustry }))
    }
  }, [preselectedIndustry])

  useEffect(() => {
    if (step === 2) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setTimeout(() => {
              onClose()
              setStep(1)
              setCountdown(30)
              setFormData({
                nombre: '',
                telefono: '',
                codigoPais: '+57',
                empresa: '',
                industria: ''
              })
            }, 2000)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [step, onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  if (!isOpen) return null

  return (
    <>
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 245, 160, 0.1))',
            border: '2px solid #00D4FF',
            borderRadius: '20px',
            padding: '3rem',
            maxWidth: '500px',
            width: '100%',
            position: 'relative',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 100px rgba(0, 212, 255, 0.3)'
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '2rem',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            <X size={24} />
          </button>

          {step === 1 ? (
            <div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #00D4FF, #00F5A0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textAlign: 'center'
              }}>
                Demo Rápida
              </h2>
              <p style={{ color: '#aaa', textAlign: 'center', marginBottom: '2rem' }}>
                30 segundos para experimentar el futuro
              </p>
              
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    marginBottom: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                />
                
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <select
                    value={formData.codigoPais}
                    onChange={(e) => setFormData({...formData, codigoPais: e.target.value})}
                    style={{
                      padding: '1rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="+57" style={{ background: '#1a1a1a' }}>CO +57</option>
                    <option value="+1" style={{ background: '#1a1a1a' }}>US +1</option>
                    <option value="+52" style={{ background: '#1a1a1a' }}>MX +52</option>
                    <option value="+54" style={{ background: '#1a1a1a' }}>AR +54</option>
                    <option value="+56" style={{ background: '#1a1a1a' }}>CL +56</option>
                    <option value="+51" style={{ background: '#1a1a1a' }}>PE +51</option>
                  </select>
                  
                  <input
                    type="tel"
                    placeholder="Tu teléfono"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                
                <input
                  type="text"
                  placeholder="Empresa (opcional)"
                  value={formData.empresa}
                  onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    marginBottom: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                />
                
                {!preselectedIndustry && (
                  <select
                    value={formData.industria}
                    onChange={(e) => setFormData({...formData, industria: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      marginBottom: '2rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="" style={{ background: '#1a1a1a' }}>Selecciona tu industria</option>
                    <option value="salud" style={{ background: '#1a1a1a' }}>Salud</option>
                    <option value="b2b" style={{ background: '#1a1a1a' }}>B2B</option>
                    <option value="retail" style={{ background: '#1a1a1a' }}>Retail</option>
                    <option value="tecnologia" style={{ background: '#1a1a1a' }}>Tecnología</option>
                    <option value="servicios" style={{ background: '#1a1a1a' }}>Servicios</option>
                    <option value="educacion" style={{ background: '#1a1a1a' }}>Educación</option>
                    <option value="restaurantes" style={{ background: '#1a1a1a' }}>Restaurantes</option>
                    <option value="logistica" style={{ background: '#1a1a1a' }}>Logística</option>
                  </select>
                )}
                
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '1.2rem',
                    background: 'linear-gradient(135deg, #00D4FF, #00F5A0)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#000',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(0, 212, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Phone size={20} />
                  <span>Iniciar Demo</span>
                </button>
              </form>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{
                fontSize: '5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #00D4FF, #00F5A0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1rem'
              }}>
                {countdown}
              </div>
              <p style={{ fontSize: '1.5rem', color: '#00D4FF', marginBottom: '0.5rem' }}>
                Preparando tu llamada...
              </p>
              <p style={{ color: '#aaa', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Phone size={16} />
                {formData.codigoPais} {formData.telefono}
              </p>
              {countdown === 0 && (
                <p style={{ 
                  marginTop: '2rem', 
                  fontSize: '1.2rem', 
                  color: '#00F5A0'
                }}>
                  Llamada iniciada con éxito
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}