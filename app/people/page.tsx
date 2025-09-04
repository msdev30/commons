"use client"

import Navigation from "../../components/Navigation"
import CommunityPage from "../../components/CommunityPage"

export default function PeoplePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <CommunityPage />
    </div>
  )
}
