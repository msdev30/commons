"use client"

import FundingPage from "@/components/FundingPage"
import Navigation from "../../components/Navigation"

export default function Funding () {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <FundingPage />
    </div>
  )
}
