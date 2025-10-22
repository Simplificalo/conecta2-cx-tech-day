'use client'

import { useState } from 'react'
import HeroSection from '@/components/landing/HeroSection'
import ParticlesBackground from '@/components/ui/ParticlesBackground'
import DemoModal from '@/components/modal/DemoModal'

export default function CXTechDayPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIndustry, setSelectedIndustry] = useState<string>('')

  const handleIndustrySelect = (industria?: string) => {
    if (industria) {
      setSelectedIndustry(industria)
      setIsModalOpen(true)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedIndustry('')
  }

  return (
    <div className="landing-container">
      <ParticlesBackground />
      
      <div className="content-wrapper">
        <HeroSection onCTAClick={handleIndustrySelect} />
      </div>

      <DemoModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose}
        preselectedIndustry={selectedIndustry}
      />
    </div>
  )
}