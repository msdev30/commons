"use client"

import * as React from "react"

/* =========================
   Types
========================= */
type EventType = "Live Webinar" | "Workshop" | "Conference" | "Panel Discussion" | "Training Session"
type EventStatus = "Upcoming" | "Live" | "Recorded" | "Cancelled"
type Category = "AI & Technology" | "Assessment" | "STEM Education" | "Professional Development" | "Inclusive Teaching" | "Digital Tools"
type ViewMode = "grid" | "list"

interface Event {
  id: string
  title: string
  description: string
  type: EventType
  status: EventStatus
  category: Category
  date: string
  time: string
  duration: string
  presenter: string
  image: string
  tags: string[]
  registrationLink?: string
  recordingLink?: string
  attendees?: number
  maxAttendees?: number
}

/* =========================
   Icons
========================= */
const Icon = {
  Search: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  Calendar: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Clock: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  ),
  Users: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Play: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <polygon points="5,3 19,12 5,21" />
    </svg>
  ),
  ExternalLink: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Filter: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
    </svg>
  ),
  X: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Grid: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  List: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
}

/* =========================
   Mock Data
========================= */
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Introduction to AI in Education",
    description: "Join us for an insightful session on how AI is transforming modern education and practical implementation strategies.",
    type: "Live Webinar",
    status: "Upcoming",
    category: "AI & Technology",
    date: "2025-01-15",
    time: "2:00 PM EST",
    duration: "1.5 hours",
    presenter: "Dr. Sarah Johnson",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Erudyte%20Leadership%20Skills%20for%20Educators-ISJoKQlQ8YsLctmoimSuEfR5Gs5Lc0.png",
    tags: ["AI", "Technology", "Innovation"],
    attendees: 234,
    maxAttendees: 500,
    registrationLink: "#"
  },
  {
    id: "2",
    title: "Digital Assessment Strategies",
    description: "Interactive workshop on implementing effective digital assessment methods that enhance student learning outcomes.",
    type: "Workshop",
    status: "Upcoming",
    category: "Assessment",
    date: "2025-01-20",
    time: "3:00 PM EST",
    duration: "2 hours",
    presenter: "Mark Thompson",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Erudyte%20Data-Driven%20Instruction-1UXP2EdwDMoE1zba844B3LXPIIlQ8U.png",
    tags: ["Assessment", "Digital", "Evaluation"],
    attendees: 156,
    maxAttendees: 300,
    registrationLink: "#"
  },
  {
    id: "3",
    title: "Future of EdTech: 2025 Trends",
    description: "Expert discussion on upcoming educational technology trends and their impact on teaching and learning.",
    type: "Panel Discussion",
    status: "Recorded",
    category: "AI & Technology",
    date: "2024-11-30",
    time: "1:00 PM EST",
    duration: "1 hour",
    presenter: "Panel of Experts",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5%20Edtech%20Trends%20that%20will%20shape%202025%20Data%20from%201400%2B%20Global%20Marketers.jpg-COY6VzbkAu5w3CYYr8tZ6pCNZDVSBM.jpeg",
    tags: ["EdTech", "Trends", "Future"],
    recordingLink: "#"
  },
  {
    id: "4",
    title: "Inclusive Teaching Practices",
    description: "Learn effective strategies for creating inclusive learning environments that support all students.",
    type: "Training Session",
    status: "Recorded",
    category: "Inclusive Teaching",
    date: "2024-11-15",
    time: "2:30 PM EST",
    duration: "1.5 hours",
    presenter: "Dr. Maria Rodriguez",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/collaborative%20Teaching%20Strategies-%20A%20World%20of%20Difference%20in%20Diverse%20Classrooms-psNNTIpGEz9KgUMuEAxQQMsaYUvxKM.png",
    tags: ["Inclusive", "Diversity", "Teaching"],
    recordingLink: "#"
  }
]

const categories: Category[] = ["AI & Technology", "Assessment", "STEM Education", "Professional Development", "Inclusive Teaching", "Digital Tools"]

/* =========================
   Utility Components
========================= */
const Badge: React.FC<{ children: React.ReactNode; variant?: "default" | "success" | "warning" | "info" | "live" }> = ({ 
  children, variant = "default" 
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    info: "bg-blue-100 text-blue-800",
    live: "bg-red-100 text-red-800"
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${className}`}>
    {children}
  </div>
)

/* =========================
   Event Card Component
========================= */
const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const getStatusBadgeVariant = (status: EventStatus) => {
    switch (status) {
      case "Live": return "live"
      case "Upcoming": return "success"
      case "Recorded": return "info"
      case "Cancelled": return "warning"
      default: return "default"
    }
  }

  const isUpcoming = event.status === "Upcoming" || event.status === "Live"

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <div className="flex flex-col">
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant={getStatusBadgeVariant(event.status)}>{event.status}</Badge>
            <Badge variant="default">{event.type}</Badge>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {event.title}
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>

          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Icon.Calendar className="h-4 w-4" />
              {formatDate(event.date)}
            </div>
            <div className="flex items-center gap-1">
              <Icon.Clock className="h-4 w-4" />
              {event.time}
            </div>
            <div className="flex items-center gap-1">
              <Icon.Clock className="h-4 w-4" />
              {event.duration}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {event.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="flex gap-2">
              {isUpcoming ? (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-1">
                  Register Now
                  <Icon.ExternalLink className="h-3 w-3" />
                </button>
              ) : (
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-1">
                  <Icon.Play className="h-3 w-3" />
                  Watch Recording
                </button>
              )}
            </div>
          </div>

          {event.attendees && event.maxAttendees && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Icon.Users className="h-4 w-4" />
                {event.attendees}/{event.maxAttendees} registered
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

/* =========================
   Event List Item Component
========================= */
const EventListItem: React.FC<{ event: Event }> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const getStatusBadgeVariant = (status: EventStatus) => {
    switch (status) {
      case "Live": return "live"
      case "Upcoming": return "success"
      case "Recorded": return "info"
      case "Cancelled": return "warning"
      default: return "default"
    }
  }

  const isUpcoming = event.status === "Upcoming" || event.status === "Live"

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-80 flex-shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge variant={getStatusBadgeVariant(event.status)}>{event.status}</Badge>
              <Badge variant="default">{event.type}</Badge>
            </div>
            {event.attendees && event.maxAttendees && (
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Icon.Users className="h-4 w-4" />
                {event.attendees}/{event.maxAttendees}
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {event.title}
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>

          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Icon.Calendar className="h-4 w-4" />
              {formatDate(event.date)}
            </div>
            <div className="flex items-center gap-1">
              <Icon.Clock className="h-4 w-4" />
              {event.time}
            </div>
            <div className="flex items-center gap-1">
              <Icon.Clock className="h-4 w-4" />
              {event.duration}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {event.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="flex gap-2">
              {isUpcoming ? (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-1">
                  Register Now
                  <Icon.ExternalLink className="h-3 w-3" />
                </button>
              ) : (
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-1">
                  <Icon.Play className="h-3 w-3" />
                  Watch Recording
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

/* =========================
   Sidebar Component
========================= */
const Sidebar: React.FC<{ 
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedTags: string[]
  onTagToggle: (tag: string) => void
}> = ({ selectedCategory, onCategoryChange, selectedTags, onTagToggle }) => {
  const allTags = ["AI", "Technology", "Assessment", "Digital", "EdTech", "Inclusive", "STEM", "Teaching", "Innovation", "Trends"]
  
  return (
    <div className="w-64 flex-shrink-0 space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon.Filter className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Categories</h3>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange("All")}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedCategory === "All" 
                ? "bg-blue-100 text-blue-700 font-medium" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Events
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === category 
                  ? "bg-blue-100 text-blue-700 font-medium" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}

/* =========================
   Main Component
========================= */
export default function ModernEventsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeTab, setActiveTab] = React.useState<"upcoming" | "past">("upcoming")
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid")

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSelectedCategory("All")
    setSelectedTags([])
    setSearchQuery("")
  }

  const filteredEvents = mockEvents.filter(event => {
    // Filter by tab
    const isUpcoming = event.status === "Upcoming" || event.status === "Live"
    if (activeTab === "upcoming" && !isUpcoming) return false
    if (activeTab === "past" && isUpcoming) return false

    // Filter by search
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.presenter.toLowerCase().includes(searchLower) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchLower))
      if (!matchesSearch) return false
    }

    // Filter by category
    if (selectedCategory !== "All" && event.category !== selectedCategory) return false

    // Filter by tags
    if (selectedTags.length > 0 && !selectedTags.some(tag => event.tags.includes(tag))) return false

    return true
  })

  const activeFiltersCount = 
    (selectedCategory !== "All" ? 1 : 0) + 
    selectedTags.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-6 py-16 pb-44">
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Events &{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Webinars
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community of educators for expert-led sessions, workshops, and discussions on the latest in education.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-lg">
            <Icon.Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events and webinars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        <div className="flex gap-6">
          <Sidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
          />

          <div className="flex-1">
            {/* Tab Navigation and View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "upcoming"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Upcoming Events
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "past"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Past Events
                </button>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{filteredEvents.length} events found</span>
                
                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "grid"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Icon.Grid className="h-4 w-4" />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "list"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Icon.List className="h-4 w-4" />
                    List
                  </button>
                </div>

                {activeFiltersCount > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge variant="info">{activeFiltersCount} filters active</Badge>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                    >
                      <Icon.X className="h-3 w-3" />
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Events Display */}
            {filteredEvents.length === 0 ? (
              <Card className="p-12 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Clear all filters
                </button>
              </Card>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredEvents.map((event) => (
                  <EventListItem key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}