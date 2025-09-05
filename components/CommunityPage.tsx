"use client"

import * as React from "react"

/* =========================
   Types
========================= */
type Media = { type: "image" | "video"; src: string; alt?: string }
type ReactionKey = "like" | "insightful" | "celebrate" | "love" | "curious"
type Visibility = "public" | "friends" | "private"

interface User {
  id: string
  name: string
  avatar: string
  headline?: string
  verified?: boolean
}

interface Group {
  id: string
  name: string
  members: number
  cover?: string
  joined?: boolean
  color?: string
}

interface Post {
  id: string
  author: User
  createdAt: string
  content: string
  media?: Media[]
  poll?: { question: string; options: { id: string; label: string; votes: number }[]; endsAt?: string }
  tags?: string[]
  group?: Group
  visibility: Visibility
  reactions: Record<ReactionKey, number>
  youReacted?: ReactionKey | null
  comments: CommentItem[]
  shares: number
  pinned?: boolean
}

interface CommentItem {
  id: string
  author: User
  createdAt: string
  content: string
  replies?: CommentItem[]
}

/* =========================
   Enhanced Icons
========================= */
const Icon = {
  Logo: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...p}>
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="10" fill="url(#logo-gradient)" />
      <path d="M12 8c-2 0-4 2-4 4v8c0 2 2 4 4 4h8c2 0 4-2 4-4v-8c0-2-2-4-4-4z" fill="white" fillOpacity="0.2" />
      <circle cx="12" cy="14" r="3" fill="white" />
      <circle cx="20" cy="14" r="3" fill="white" />
      <path d="M10 20c2-2 4-2 6 0s4 2 6 0" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  Search: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  Plus: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Heart: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  MessageCircle: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  Share: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  ),
  Trending: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Users: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Pin: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M16 4v6l3 3v1h-6l-1 7-1-7H5v-1l3-3V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2z" />
    </svg>
  ),
  Verified: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 1l3.09 6.26L22 9l-5 5 1.18 6.91L12 17.27 5.82 20.91 7 14l-5-5 6.91-1.74L12 1z" />
    </svg>
  ),
  Image: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21,15 16,10 5,21" />
    </svg>
  ),
  Video: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <polygon points="23,7 16,12 23,17" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  BarChart: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  Globe: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Lock: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <circle cx="12" cy="16" r="1" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
}

/* =========================
   Utility Components
========================= */
const Avatar: React.FC<{ src: string; alt?: string; size?: number; className?: string }> = ({ 
  src, alt, size = 40, className = "" 
}) => (
  <div className={`relative ${className}`}>
    <img
      src={src}
      alt={alt}
      className="rounded-full object-cover ring-2 ring-white/10 shadow-sm"
      style={{ width: size, height: size }}
    />
  </div>
)

const Badge: React.FC<{ children: React.ReactNode; variant?: "default" | "success" | "warning" | "info" }> = ({ 
  children, variant = "default" 
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800", 
    info: "bg-blue-100 text-blue-800"
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}

const Card: React.FC<{ children: React.ReactNode; className?: string; hover?: boolean }> = ({ 
  children, className = "", hover = false 
}) => (
  <div className={`bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl shadow-black/5 ${hover ? "hover:bg-white/90 transition-all duration-200" : ""} ${className}`}>
    {children}
  </div>
)

const GradientBorder: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`relative ${className}`}>
    <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-500 rounded-2xl opacity-20" />
    <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-white/40">
      {children}
    </div>
  </div>
)

/* =========================
   Mock Data
========================= */
const you: User = {
  id: "u0",
  name: "Sam Wane",
  avatar: "/images/avatar-placeholder.png",
  headline: "Founder · Grady Bunch",
  verified: true
}

const friends: User[] = [
  { id: "u1", name: "Whitney Chen", avatar: "/images/community/whit.png", headline: "Lead Educator", verified: true },
  { id: "u2", name: "Max Rivera", avatar: "/images/community/max.png", headline: "Data Engineer" },
  { id: "u3", name: "Rio Martinez", avatar: "/images/community/rio.png", headline: "Curriculum Lead", verified: true },
]

const groups: Group[] = [
  { id: "g1", name: "STEM Teachers Network", members: 8421, cover: "/images/community/g-stem.jpg", joined: true, color: "from-purple-500 to-pink-500" },
  { id: "g2", name: "ELL & MLL Champions", members: 6512, cover: "/images/community/g-ell.jpg", color: "from-cyan-500 to-blue-500" },
  { id: "g3", name: "Workforce Pathways", members: 3124, cover: "/images/community/g-workforce.jpg", color: "from-emerald-500 to-teal-500" },
]

const postsSeed: Post[] = [
  {
    id: "p1",
    author: friends[1],
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    content: "What's your favorite quick formative assessment for middle school algebra? Looking for ideas I can run in 10 minutes that really show student understanding.",
    tags: ["Algebra", "Assessment", "MiddleSchool"],
    visibility: "public",
    reactions: { like: 34, insightful: 12, celebrate: 2, love: 4, curious: 7 },
    youReacted: null,
    comments: [
      {
        id: "c1",
        author: friends[0],
        createdAt: new Date().toISOString(),
        content: "Exit tickets with 2 tiered problems work amazingly well! Students feel accomplished and you get real data.",
      },
    ],
    shares: 3,
    pinned: true
  },
  {
    id: "p2",
    author: you,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    content: "🚀 Just shipped a new Daily Digest feature that auto-curates the most relevant content for educators. Early feedback has been incredible!",
    media: [{ type: "image", src: "/images/community/digest-preview.jpg", alt: "Daily Digest preview" }],
    tags: ["Product", "TeacherTools", "AI"],
    visibility: "public",
    reactions: { like: 66, insightful: 22, celebrate: 11, love: 9, curious: 5 },
    youReacted: "celebrate",
    comments: [],
    shares: 10,
  },
  {
    id: "p3",
    author: friends[2],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    content: "Help me decide our next community webinar topic! These are all highly requested areas.",
    poll: {
      question: "What should we cover next?",
      options: [
        { id: "o1", label: "Data Contracts for K-12 Finance", votes: 86 },
        { id: "o2", label: "ELL Funding Streams 101", votes: 124 },
        { id: "o3", label: "Due Diligence on EdTech Vendors", votes: 59 },
      ],
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    },
    group: groups[0],
    tags: ["Webinar", "Community"],
    visibility: "public",
    reactions: { like: 18, insightful: 7, celebrate: 5, love: 2, curious: 9 },
    youReacted: "like",
    comments: [],
    shares: 2,
  },
]

/* =========================
   Header Component
========================= */
const Header: React.FC<{ searchQuery: string; setSearchQuery: (q: string) => void }> = ({ searchQuery, setSearchQuery }) => (
  <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white/20">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Icon.Logo className="h-8 w-8" />
        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
          Community
        </span>
      </div>
      
      <div className="flex-1 max-w-lg mx-8">
        <div className="relative">
          <Icon.Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts, people, groups..."
            className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-white/50 rounded-xl transition-colors">
          <Icon.Users className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-white/50 rounded-xl transition-colors relative">
          <Icon.MessageCircle className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </button>
        <Avatar src={you.avatar} alt={you.name} size={36} />
      </div>
    </div>
  </header>
)

/* =========================
   Hero Section
========================= */
const HeroSection: React.FC = () => (
  <div className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-cyan-50 to-emerald-50" />
    <div className="absolute inset-0">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000" />
    </div>
    
    <div className="relative max-w-7xl mx-auto px-6 py-16">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Connect with educators who{" "}
          <span className="bg-gradient-to-r from-purple-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
            shape the future
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Join thousands of passionate educators sharing ideas, solving challenges, and building the next generation of learning experiences.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 transform hover:-translate-y-0.5">
            Share Your Story
          </button>
          <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-2xl font-semibold border border-white/40 hover:bg-white transition-all duration-200">
            Explore Groups
          </button>
        </div>
      </div>
    </div>
  </div>
)

/* =========================
   Post Composer
========================= */
const PostComposer: React.FC<{ onSubmit: (content: string) => void }> = ({ onSubmit }) => {
  const [content, setContent] = React.useState("")
  const [showActions, setShowActions] = React.useState(false)

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content)
      setContent("")
      setShowActions(false)
    }
  }

  return (
    <GradientBorder className="mb-8">
      <div className="p-6">
        <div className="flex gap-4">
          <Avatar src={you.avatar} alt={you.name} size={48} />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setShowActions(true)}
              placeholder="Share something inspiring with the community..."
              className="w-full h-24 resize-none bg-transparent text-gray-900 placeholder-gray-400 border-none outline-none text-lg"
            />
            
            {showActions && (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors">
                    <Icon.Image className="h-4 w-4" />
                    Photo
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-xl hover:bg-cyan-200 transition-colors">
                    <Icon.Video className="h-4 w-4" />
                    Video
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-200 transition-colors">
                    <Icon.BarChart className="h-4 w-4" />
                    Poll
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <select className="px-3 py-2 bg-gray-100 rounded-xl text-sm border-none outline-none">
                    <option value="public">🌍 Public</option>
                    <option value="friends">👥 Friends</option>
                    <option value="private">🔒 Private</option>
                  </select>
                  <button 
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Share
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </GradientBorder>
  )
}

/* =========================
   Post Card
========================= */
const PostCard: React.FC<{ post: Post; onReact: (postId: string, reaction: ReactionKey) => void }> = ({ post, onReact }) => {
  const timeAgo = (dateString: string) => {
    const now = new Date()
    const postDate = new Date(dateString)
    const diffMs = now.getTime() - postDate.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) return `${diffMins}m`
    if (diffHours < 24) return `${diffHours}h`
    return `${diffDays}d`
  }

  const totalReactions = Object.values(post.reactions).reduce((sum, count) => sum + count, 0)

  return (
    <Card className="p-6 mb-6" hover>
      {post.pinned && (
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
          <Icon.Pin className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-600">Pinned Post</span>
        </div>
      )}
      
      <div className="flex gap-4">
        <Avatar src={post.author.avatar} alt={post.author.name} size={48} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-900">{post.author.name}</span>
            {post.author.verified && (
              <Icon.Verified className="h-4 w-4 text-blue-500" />
            )}
            {post.group && (
              <span className="text-sm text-gray-500">in</span>
            )}
            {post.group && (
              <Badge variant="info">{post.group.name}</Badge>
            )}
            <span className="text-sm text-gray-400">·</span>
            <span className="text-sm text-gray-400">{timeAgo(post.createdAt)}</span>
            <div className="ml-auto flex items-center gap-1">
              {post.visibility === "public" && <Icon.Globe className="h-4 w-4 text-gray-400" />}
              {post.visibility === "friends" && <Icon.Users className="h-4 w-4 text-gray-400" />}
              {post.visibility === "private" && <Icon.Lock className="h-4 w-4 text-gray-400" />}
            </div>
          </div>

          <p className="text-gray-800 text-lg leading-relaxed mb-4">{post.content}</p>

          {post.media && post.media.length > 0 && (
            <div className="mb-4">
              {post.media.map((media, index) => (
                <img
                  key={index}
                  src={media.src}
                  alt={media.alt}
                  className="w-full rounded-xl border border-gray-100"
                />
              ))}
            </div>
          )}

          {post.poll && (
            <div className="mb-4 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold mb-3">{post.poll.question}</h4>
              <div className="space-y-2">
                {post.poll.options.map((option) => {
                  const totalVotes = post.poll!.options.reduce((sum, opt) => sum + opt.votes, 0)
                  const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0
                  
                  return (
                    <div key={option.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{option.label}</span>
                        <span className="text-gray-500">{Math.round(percentage)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {post.poll.options.reduce((sum, opt) => sum + opt.votes, 0)} votes
              </p>
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => onReact(post.id, "like")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  post.youReacted === "like" 
                    ? "bg-red-100 text-red-600" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon.Heart className="h-5 w-5" />
                <span className="font-medium">{totalReactions}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-200">
                <Icon.MessageCircle className="h-5 w-5" />
                <span className="font-medium">{post.comments.length}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-200">
                <Icon.Share className="h-5 w-5" />
                <span className="font-medium">{post.shares}</span>
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Icon.Share className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

/* =========================
   Sidebar Components
========================= */
const ProfileCard: React.FC = () => (
  <Card className="p-6 mb-6">
    <div className="text-center">
      <Avatar src={you.avatar} alt={you.name} size={64} className="mx-auto mb-4" />
      <h3 className="font-bold text-lg text-gray-900">{you.name}</h3>
      <p className="text-gray-600 mb-4">{you.headline}</p>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">248</div>
          <div className="text-sm text-gray-500">Following</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">1.2k</div>
          <div className="text-sm text-gray-500">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">56</div>
          <div className="text-sm text-gray-500">Posts</div>
        </div>
      </div>
      
      <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
        View Profile
      </button>
    </div>
  </Card>
)

const TrendingTopics: React.FC = () => (
  <Card className="p-6 mb-6">
    <div className="flex items-center gap-2 mb-4">
      <Icon.Trending className="h-5 w-5 text-orange-500" />
      <h3 className="font-bold text-lg text-gray-900">Trending</h3>
    </div>
    
    <div className="space-y-3">
      {[
        { topic: "AI in Education", posts: "1.2k posts", trend: "+15%" },
        { topic: "Remote Learning", posts: "986 posts", trend: "+8%" },
        { topic: "STEM Curriculum", posts: "742 posts", trend: "+12%" },
        { topic: "EdTech Funding", posts: "523 posts", trend: "+22%" },
      ].map((item, index) => (
        <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
          <div>
            <div className="font-semibold text-gray-900">#{item.topic}</div>
            <div className="text-sm text-gray-500">{item.posts}</div>
          </div>
          <span className="text-sm font-medium text-emerald-600">{item.trend}</span>
        </div>
      ))}
    </div>
  </Card>
)

const SuggestedConnections: React.FC = () => (
  <Card className="p-6 mb-6">
    <h3 className="font-bold text-lg text-gray-900 mb-4">People to Follow</h3>
    
    <div className="space-y-4">
      {friends.map((friend) => (
        <div key={friend.id} className="flex items-center gap-3">
          <Avatar src={friend.avatar} alt={friend.name} size={40} />
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-900">{friend.name}</span>
              {friend.verified && <Icon.Verified className="h-3 w-3 text-blue-500" />}
            </div>
            <p className="text-sm text-gray-500">{friend.headline}</p>
          </div>
          <button className="px-4 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors">
            Follow
          </button>
        </div>
      ))}
    </div>
  </Card>
)

const ActiveGroups: React.FC = () => (
  <Card className="p-6">
    <h3 className="font-bold text-lg text-gray-900 mb-4">Your Groups</h3>
    
    <div className="space-y-3">
      {groups.map((group) => (
        <div key={group.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${group.color} flex items-center justify-center`}>
            <Icon.Users className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{group.name}</div>
            <div className="text-sm text-gray-500">{group.members.toLocaleString()} members</div>
          </div>
          {group.joined && (
            <Badge variant="success">Joined</Badge>
          )}
        </div>
      ))}
    </div>
  </Card>
)

/* =========================
   Main Component
========================= */
export default function ModernCommunityPage() {
  const [posts, setPosts] = React.useState<Post[]>(postsSeed)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState<"all" | "following" | "groups">("all")

  const filteredPosts = posts.filter(post => {
    const searchMatch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    
    if (!searchMatch) return false
    
    switch (activeFilter) {
      case "following":
        return friends.some(friend => friend.id === post.author.id)
      case "groups":
        return !!post.group
      default:
        return true
    }
  })

  const handleReact = (postId: string, reaction: ReactionKey) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id !== postId) return post
        
        const newReactions = { ...post.reactions }
        
        if (post.youReacted === reaction) {
          // Remove reaction
          newReactions[reaction] = Math.max(0, newReactions[reaction] - 1)
          return { ...post, reactions: newReactions, youReacted: null }
        } else {
          // Remove old reaction if exists
          if (post.youReacted) {
            newReactions[post.youReacted] = Math.max(0, newReactions[post.youReacted] - 1)
          }
          // Add new reaction
          newReactions[reaction] = (newReactions[reaction] || 0) + 1
          return { ...post, reactions: newReactions, youReacted: reaction }
        }
      })
    )
  }

  const handleCreatePost = (content: string) => {
    const newPost: Post = {
      id: `p${Date.now()}`,
      author: you,
      createdAt: new Date().toISOString(),
      content,
      visibility: "public",
      reactions: { like: 0, insightful: 0, celebrate: 0, love: 0, curious: 0 },
      youReacted: null,
      comments: [],
      shares: 0,
    }
    setPosts(prevPosts => [newPost, ...prevPosts])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/30">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <ProfileCard />
            <TrendingTopics />
            <SuggestedConnections />
          </div>

          {/* Main Feed */}
          <div className="col-span-12 lg:col-span-6">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 mb-6">
              {[
                { key: "all", label: "For You", count: posts.length },
                { key: "following", label: "Following", count: posts.filter(p => friends.some(f => f.id === p.author.id)).length },
                { key: "groups", label: "Groups", count: posts.filter(p => !!p.group).length },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key as any)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                    activeFilter === filter.key
                      ? "bg-white/90 text-gray-900 shadow-lg"
                      : "text-gray-600 hover:bg-white/50"
                  }`}
                >
                  {filter.label}
                  <span className="ml-2 text-sm opacity-60">({filter.count})</span>
                </button>
              ))}
            </div>

            <PostComposer onSubmit={handleCreatePost} />

            {/* Posts */}
            <div className="space-y-6">
              {filteredPosts.length === 0 ? (
                <Card className="p-12 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters</p>
                </Card>
              ) : (
                filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} onReact={handleReact} />
                ))
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <ActiveGroups />
          </div>
        </div>
      </div>
    </div>
  )
}