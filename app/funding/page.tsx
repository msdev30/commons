"use client"

import Navigation from "../../components/Navigation"
import FundingPage from "../../components/fundingpage2"

export default function () {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <FundingPage />
    </div>
  )
}
