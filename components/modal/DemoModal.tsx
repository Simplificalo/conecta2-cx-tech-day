'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Sparkles, Zap, Check } from 'lucide-react'

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
  preselectedIndustry?: string
}

type AssistantData = {
  name: string
  greeting: string
  color: string
  icon: string
  questions: string[]
}

// Configuración de asistentes por industria
const assistantConfig: Record<string, AssistantData> = {
  salud: {
    name: 'Dra. Clara',
    greeting: 'Agenda tu consulta médica',
    color: '#FF4458',
    icon: '🏥',
    questions: ['tipo de consulta', 'urgencia', 'síntomas']
  },
  b2b: {
    name: 'Diego',
    greeting: 'Potencia tus ventas B2B',
    color: '#00D4FF',
    icon: '💼',
    questions: ['tamaño de empresa', 'volumen de ventas', 'industria objetivo']
  },
  retail: {
    name: 'Julieta',
    greeting: 'Mejora tu experiencia de compra',
    color: '#00F5A0',
    icon: '🛍️',
    questions: ['tipo de productos', 'volumen de clientes', 'canales de venta']
  },
  restaurantes: {
    name: 'Juan',
    greeting: 'Optimiza las reservas en tu restaurante',
    color: '#FFB800',
    icon: '🍽️',
    questions: ['tipo de cocina', 'capacidad', 'servicios']
  },
  logistica: {
    name: 'Leonardo',
    greeting: 'Optimiza procesos en tu logística',
    color: '#7B61FF',
    icon: '📦',
    questions: ['tipo de envíos', 'volumen mensual', 'cobertura']
  },
  educacion: {
    name: 'Prof. Elena',
    greeting: 'Transforma tu educación',
    color: '#00D4FF',
    icon: '🎓',
    questions: ['nivel educativo', 'número de estudiantes', 'modalidad']
  }
}

export default function DemoModal({ isOpen, onClose, preselectedIndustry }: DemoModalProps) {
  const [step, setStep] = useState(1)
  const [countdown, setCountdown] = useState(30)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    codigoPais: '+57',
    empresa: '',
    industria: preselectedIndustry || ''
  })

  const assistant = formData.industria ? assistantConfig[formData.industria] : null

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
            }, 3000)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [step, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setIsSubmitting(false)
    setStep(2)
    
    // Aquí enviarías los datos reales
    console.log('Datos a enviar:', {
      ...formData,
      assistant: assistant?.name,
      timestamp: new Date().toISOString()
    })
  }

  const handleClose = () => {
    setStep(1)
    setFormData({
      nombre: '',
      telefono: '',
      codigoPais: '+57',
      empresa: '',
      industria: ''
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay con blur */}
          <motion.div 
            className="modal-overlay-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div className="modal-wrapper">
            <motion.div 
              className="modal-modern"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Efecto de brillo animado */}
              <div className="modal-glow" />
              
              {/* Botón cerrar */}
              <motion.button
                className="modal-close-btn"
                onClick={handleClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>

              {/* Header con industria */}
              {assistant && (
                <motion.div 
                  className="modal-industry-header"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ 
                    background: `linear-gradient(135deg, ${assistant.color}20, transparent)`,
                    borderBottom: `1px solid ${assistant.color}40`
                  }}
                >
                  <span className="industry-icon">{assistant.icon}</span>
                  <span className="industry-label">{assistant.greeting}</span>
                </motion.div>
              )}

              {step === 1 ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="modal-step-content"
                >
                  <div className="modal-header">
                    <motion.div 
                      className="modal-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <Sparkles size={16} />
                      <span>Demo en vivo</span>
                    </motion.div>
                    
                    <h2 className="modal-title">
                      {assistant ? `Habla con ${assistant.name}` : 'Experimenta nuestra IA'}
                    </h2>
                    
                    <p className="modal-subtitle">
                      Recibe una llamada real en <span className="text-gradient">30 segundos</span>
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                      <label className="form-label">Nombre completo</label>
                      <input
                        type="text"
                        required
                        className="form-input-modern"
                        placeholder="Juan Pérez"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Teléfono</label>
                      <div className="phone-group">
                        <select
                          className="country-select-modern"
                          value={formData.codigoPais}
                          onChange={(e) => setFormData({...formData, codigoPais: e.target.value})}
                        >
                          <option value="+57">🇨🇴 +57</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+52">🇲🇽 +52</option>
                          <option value="+54">🇦🇷 +54</option>
                          <option value="+56">🇨🇱 +56</option>
                          <option value="+51">🇵🇪 +51</option>
                        </select>
                        <input
                          type="tel"
                          required
                          className="form-input-modern phone-input"
                          placeholder="300 123 4567"
                          value={formData.telefono}
                          onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Empresa (opcional)</label>
                      <input
                        type="text"
                        className="form-input-modern"
                        placeholder="Mi empresa"
                        value={formData.empresa}
                        onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                      />
                    </div>

                    {!preselectedIndustry && (
                      <div className="form-group">
                        <label className="form-label">Industria</label>
                        <select
                          className="form-input-modern"
                          value={formData.industria}
                          onChange={(e) => setFormData({...formData, industria: e.target.value})}
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="salud">🏥 Salud</option>
                          <option value="b2b">💼 B2B</option>
                          <option value="retail">🛍️ Retail</option>
                          <option value="restaurantes">🍽️ Restaurantes</option>
                          <option value="logistica">📦 Logística</option>
                          <option value="educacion">🎓 Educación</option>
                        </select>
                      </div>
                    )}

                    <motion.button
                      type="submit"
                      className="submit-btn-modern"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner" />
                          <span>Iniciando...</span>
                        </>
                      ) : (
                        <>
                          <Phone size={20} />
                          <span>Recibir llamada</span>
                          <Zap size={16} className="btn-icon-end" />
                        </>
                      )}
                    </motion.button>
                  </form>

                  <div className="modal-footer">
                    <div className="security-badge">
                      <Check size={14} />
                      <span>100% seguro y privado</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="countdown-container"
                >
                  <div className="countdown-wrapper">
                    {/* Anillos animados */}
                    <motion.div 
                      className="countdown-ring ring-1"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                      className="countdown-ring ring-2"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                      className="countdown-ring ring-3"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Número del countdown */}
                    <motion.div 
                      className="countdown-number"
                      key={countdown}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {countdown}
                    </motion.div>
                  </div>

                  <motion.div 
                    className="countdown-info"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="countdown-title">
                      {assistant ? `${assistant.name} te está llamando...` : 'Preparando tu llamada...'}
                    </h3>
                    <p className="countdown-phone-number">
                      <Phone size={16} />
                      {formData.codigoPais} {formData.telefono}
                    </p>
                  </motion.div>

                  {countdown === 0 && (
                    <motion.div 
                      className="success-notification"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Check size={24} />
                      <span>¡Llamada conectada con éxito!</span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}