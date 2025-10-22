import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { 
    value: '1000+', 
    label: 'Llamadas/día', 
    color: 'cyan',
    delay: 0
  },
  { 
    value: '40+', 
    label: 'Idiomas', 
    color: 'green',
    delay: 0.1
  },
  { 
    value: '60%', 
    label: 'Menos costo', 
    color: 'cyan',
    delay: 0.2
  },
  { 
    value: '24/7', 
    label: 'Disponible', 
    color: 'green',
    delay: 0.3
  }
]

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={`stat-card stat-card-${stat.color}`}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0, 
              scale: 1 
            } : {}}
            transition={{ 
              duration: 0.5, 
              delay: stat.delay,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.05,
              y: -10,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div 
              className="stat-value"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: stat.delay + 0.2,
                type: "spring",
                stiffness: 200
              }}
            >
              {stat.value}
            </motion.div>
            <div className="stat-label">{stat.label}</div>
            
            {/* Efecto de pulso */}
            <div className="pulse-effect" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}