"use client"

import Navigation from "../../components/Navigation"
import FundingPage from "../../components/FundingPage"

export default function FundingOpportunitiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <FundingPage />
    </div>
  )
}
