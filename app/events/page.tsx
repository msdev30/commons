"use client"

import Navigation from "../../components/Navigation"
import Events from "../../components/events"

export default function events() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <Events />
    </div>
  )
}
