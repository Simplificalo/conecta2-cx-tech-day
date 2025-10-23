'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  Heart, 
  Building2, 
  ShoppingBag, 
  Utensils, 
  Package, 
  GraduationCap,
  Phone,
  Sparkles,
  Calendar,
  CalendarCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface HeroSectionProps {
  onCTAClick: (industria?: string) => void
}

// Configuración con imágenes tipo banner
const industryData = {
  salud: {
    name: 'Dra. Clara',
    role: 'Agenda citas, responde dudas frecuentes y confirma asistencia sin saturar al personal de salud.',
    image: '/avatars/salud-banner.jpg',
    color: '#FF4458'
  },
  b2b: {
    name: 'Diego',
    role: 'Identifica empresas, cualifica el potencial de conversión, valida presupuesto y transfiere leads listos al equipo comercial.',
    image: '/avatars/b2b-banner.jpg',
    color: '#00D4FF'
  },
  retail: {
    name: 'Julieta',
    role: 'Llama automáticamente al cliente, confirma dirección y programa la entrega sin intervención humana.',
    image: '/avatars/retail-banner.jpg',
    color: '#00F5A0'
  },
  restaurantes: {
    name: 'Juan',
    role: 'Gestiona reservas por teléfono, responde sobre el menú y optimiza el servicio sin necesidad de meseros.',
    image: '/avatars/restaurant-banner.jpg',
    color: '#FFB800'
  },
  logistica: {
    name: 'Leonardo',
    role: 'Resuelve preguntas frecuentes, guía al cliente paso a paso, gestiona tickets de soporte y libera tiempo del equipo técnico.',
    image: '/avatars/logistics-banner.jpg',
    color: '#7B61FF'
  },
  educacion: {
    name: 'Prof. Elena',
    role: 'Contacta a estudiantes que han abandonado sus cursos o estudios, evalúa y califica su interés y necesidades en segundos.',
    image: '/avatars/education-banner.jpg',
    color: '#00BFA5'
  }
}

export default function HeroSection({ onCTAClick }: HeroSectionProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(3)
  
  const industries = [
    { id: 'salud', Icon: Heart, name: 'Salud' },
    { id: 'b2b', Icon: Building2, name: 'B2B' },
    { id: 'retail', Icon: ShoppingBag, name: 'Retail' },
    { id: 'restaurantes', Icon: Utensils, name: 'Restaurantes' },
    { id: 'logistica', Icon: Package, name: 'Logística' },
    { id: 'educacion', Icon: GraduationCap, name: 'Educación' }
  ]

  // Detectar tamaño de pantalla y ajustar cards por página
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerPage(1) // Móvil: 1 card
      } else {
        setCardsPerPage(3) // iPad y Desktop: 3 cards
      }
    }
    
    // Ejecutar al montar
    handleResize()
    
    // Escuchar cambios de tamaño
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Resetear página actual cuando cambia el número de cards por página
  useEffect(() => {
    setCurrentPage(0)
  }, [cardsPerPage])

  const totalPages = Math.ceil(industries.length / cardsPerPage)
  const currentIndustries = industries.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  )

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  return (
    <>
      {/* Botón Flotante de Agendar Cita */}
      <motion.div
        className="floating-calendar-btn"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          delay: 1.5,
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <a 
          href="https://cal.com/conecta2.ai/reunion-de-conexion-y-entendimiento" // CAMBIA ESTE LINK
          target="_blank"
          rel="noopener noreferrer"
          className="calendar-btn-link"
        >
          <div className="btn-pulse-ring" />
          <div className="btn-pulse-ring delay-1" />
          <div className="btn-inner">
            <Calendar size={24} />
          </div>
          <div className="btn-tooltip">
            <CalendarCheck size={16} />
            <span>Agendar Demo con Ventas</span>
          </div>
        </a>
      </motion.div>

      <section className="hero-section-fullscreen">
        <motion.div 
          className="hero-content-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo GRANDE */}
          <motion.div 
            className="logo-container-huge"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/logo-conecta2.png"
              alt="Conecta2"
              width={800}
              height={240}
              priority
              className="logo-image-huge"
            />
          </motion.div>

          {/* Título Principal */}
          <motion.h1 
            className="hero-title-large"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Asistentes de IA Trabajando 24/7
          </motion.h1>

          {/* Subtítulo */}
          <motion.p 
            className="hero-subtitle-large"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Experimenta el poder de la IA conversacional
            <span className="text-highlight-pulse"> Recibe una llamada real en 30 segundos</span>
          </motion.p>

          {/* Carrusel de Industrias */}
          <motion.div 
            className="industries-carousel-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.p 
              className="grid-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Sparkles size={16} />
              <span>SELECCIONA TU INDUSTRIA</span>
              <Sparkles size={16} />
            </motion.p>
            
            <div className="carousel-wrapper">
              {/* Botón Anterior */}
              <motion.button
                className="carousel-nav-btn prev"
                onClick={handlePrevious}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <ChevronLeft size={24} />
              </motion.button>

              {/* Cards Container con AnimatePresence */}
              <div className="carousel-cards-container">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentPage}-${cardsPerPage}`} // Key única que incluye cardsPerPage
                    className="carousel-cards-grid"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ 
                      duration: 0.5, 
                      type: "spring", 
                      stiffness: 80, 
                      damping: 20,
                      ease: "easeInOut"
                    }}
                  >
                    {currentIndustries.map((industry, index) => {
                      const data = industryData[industry.id as keyof typeof industryData]
                      return (
                        <motion.div
                          key={industry.id}
                          className="industry-card-carousel"
                          onClick={() => onCTAClick(industry.id)}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.4, 
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 100
                          }}
                          whileHover={{ 
                            scale: 1.03,
                            y: -8,
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            '--industry-color': data.color
                          } as React.CSSProperties}
                        >
                          {/* Imagen Banner */}
                          <div className="card-image-banner-tall">
                            <Image
                              src={data.image}
                              alt={industry.name}
                              width={400}
                              height={260}
                              className="banner-image"
                            />
                            <div className="image-overlay" />
                            
                            {/* Icono superpuesto */}
                            <div className="floating-icon">
                              <industry.Icon size={32} />
                            </div>
                            
                            {/* Badge Demo */}
                            <div className="demo-badge">
                              <Phone size={12} />
                              <span>Demo</span>
                            </div>
                          </div>
                          
                          {/* Contenido de la Card */}
                          <div className="card-body-compact">
                            <h3 className="card-title-modern">{industry.name}</h3>
                            
                            <div className="card-assistant-info">
                              <p className="assistant-name">{data.name}</p>
                              <p className="assistant-role">{data.role}</p>
                            </div>
                            
                            <div className="card-hover-cta">
                              <span>Probar ahora</span>
                              <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                              >
                                →
                              </motion.div>
                            </div>
                          </div>
                          
                          {/* Borde de color dinámico */}
                          <div className="card-border-glow" />
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Botón Siguiente */}
              <motion.button
                className="carousel-nav-btn next"
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>

            {/* Indicadores de página */}
            <div className="carousel-indicators">
              {Array.from({ length: totalPages }).map((_, index) => (
                <motion.button
                  key={index}
                  className={`indicator ${currentPage === index ? 'active' : ''}`}
                  onClick={() => setCurrentPage(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}