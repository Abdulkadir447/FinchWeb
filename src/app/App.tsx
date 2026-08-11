import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/sections/Hero'
import { WhatIsFinchSection } from '../components/sections/WhatIsFinchSection'
import { DashboardSection } from '../components/sections/DashboardSection'
import { AnalysisSection } from '../components/sections/AnalysisSection'
import { OperationsSection } from '../components/sections/OperationsSection'
import { AISection } from '../components/sections/AISection'
import { AccessSection } from '../components/sections/AccessSection'
import { DownloadSection } from '../components/sections/DownloadSection'
import { HelpSection } from '../components/sections/HelpSection'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatIsFinchSection />
        <DashboardSection />
        <AnalysisSection />
        <OperationsSection />
        <AISection />
        <AccessSection />
        <DownloadSection />
        <HelpSection />
      </main>
      <Footer />
    </>
  )
}
