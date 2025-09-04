"use client"

import Navigation from "../../components/Navigation"
import MyLearningLibrary from "../../components/MyLearningLibrary"

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <MyLearningLibrary />
    </div>
  )
}
