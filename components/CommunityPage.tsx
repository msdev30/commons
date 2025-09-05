"use client"

import * as React from "react"
import { Icon } from "@/components/icons"
import LeftSidebar from "@/components/LeftSidebar"
import { CommentSection } from "@/components/CommentSection"

/* =========================
   Types
========================= */
type Media = { type: "image" | "video"; src: string; alt?: string }
type ReactionKey = "like" | "insightful" | "celebrate" | "love" | "curious"
type Visibility = "public" | "friends" | "selected" | "private"

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

interface CommentItem {
  id: string
  author: User
  createdAt: string
  content: string
  replies?: CommentItem[]
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

/* =========================
   Small UI Atoms
========================= */
const Avatar: React.FC<{ src: string; alt?: string; size?: number; className?: string }> = ({
  src,
  alt,
  size = 40,
  className = "",
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
  children,
  variant = "default",
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    info: "bg-blue-100 text-blue-800",
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}

const Card: React.FC<{ children: React.ReactNode; className?: string; hover?: boolean }> = ({
  children,
  className = "",
  hover = false,
}) => (
  <div
    className={`bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl shadow-black/5 ${
      hover ? "hover:bg-white/90 transition-all duration-200" : ""
    } ${className}`}
  >
    {children}
  </div>
)

/* =========================
   Mock Data
========================= */
const you: User = {
  id: "u0",
  name: "Sam Wane",
  avatar: "/avatar/02.jpg",
  headline: "Founder · Grady Bunch",
  verified: true,
}

const friends: User[] = [
  { id: "u1", name: "Whitney Chen", avatar: "/avatar/14.jpg", headline: "Lead Educator", verified: true },
  { id: "u2", name: "Max Rivera", avatar: "/avatar/31.jpg", headline: "Data Engineer" },
  { id: "u3", name: "Rio Martinez", avatar: "/avatar/39.jpg", headline: "Curriculum Lead", verified: true },
]

const groups: Group[] = [
  {
    id: "g1",
    name: "STEM Teachers Network",
    members: 8421,
    cover: "/images/community/g-stem.jpg",
    joined: true,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "g2",
    name: "ELL & MLL Champions",
    members: 6512,
    cover: "/images/community/g-ell.jpg",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "g3",
    name: "Workforce Pathways",
    members: 3124,
    cover: "/images/community/g-workforce.jpg",
    color: "from-emerald-500 to-teal-500",
  },
]

const postsSeed: Post[] = [
  {
    id: "p1",
    author: friends[1],
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    content:
      "What's your favorite quick formative assessment for middle school algebra? Looking for ideas I can run in 10 minutes that really show student understanding.",
    tags: ["Algebra", "Assessment", "MiddleSchool"],
    visibility: "public",
    reactions: { like: 34, insightful: 12, celebrate: 2, love: 4, curious: 7 },
    youReacted: null,
    comments: [
      {
        id: "c1",
        author: friends[0],
        createdAt: new Date().toISOString(),
        content:
          "Exit tickets with 2 tiered problems work amazingly well! Students feel accomplished and you get real data.",
      },
    ],
    shares: 3,
    pinned: true,
  },
  {
    id: "p2",
    author: you,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    content:
      "🚀 Just shipped a new Daily Digest feature that auto-curates the most relevant content for educators. Early feedback has been incredible!",
    media: [{ type: "image", src: "/software-company/case-study02.jpg", alt: "Daily Digest preview" }],
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
   Post Card (center column)
========================= */
const PostCard: React.FC<{ post: Post; onReact: (postId: string, reaction: ReactionKey) => void }> = ({
  post,
  onReact,
}) => {
  const [showComments, setShowComments] = React.useState(false)
  const [showShareMenu, setShowShareMenu] = React.useState(false)
  const [showMoreMenu, setShowMoreMenu] = React.useState(false)
  const [showVisibilityMenu, setShowVisibilityMenu] = React.useState(false)
  const [isFollowing, setIsFollowing] = React.useState(false)
  const [isSaved, setIsSaved] = React.useState(false)
  const [postVisibility, setPostVisibility] = React.useState<Visibility>(post.visibility)
  
  const timeAgo = (dateString: string) => {
    const now = new Date()
    const d = new Date(dateString)
    const mins = Math.floor((now.getTime() - d.getTime()) / (1000 * 60))
    if (mins < 60) return `${mins}m`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h`
    return `${Math.floor(hrs / 24)}d`
  }

  const totalReactions = Object.values(post.reactions).reduce((s, n) => s + n, 0)
  
  const handleAddComment = (comment: { text: string; gif?: string; image?: string }) => {
    // In real app, this would call an API to add comment to the post
    console.log('Adding comment to post:', post.id, comment)
  }
  
  const handleShare = (platform: string) => {
    const url = `${window.location.origin}/post/${post.id}`
    const text = `Check out this post: ${post.content.slice(0, 100)}...`
    
    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(url)
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case 'linkedin':
        window.open(`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        break
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent('Interesting post')}&body=${encodeURIComponent(text + ' ' + url)}`)
        break
    }
    setShowShareMenu(false)
  }
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    setShowMoreMenu(false)
    console.log(isFollowing ? 'Unfollowed' : 'Followed', post.author.name)
  }
  
  const handleSave = () => {
    setIsSaved(!isSaved)
    setShowMoreMenu(false)
    console.log(isSaved ? 'Unsaved' : 'Saved', 'post')
  }
  
  const handleAward = () => {
    setShowMoreMenu(false)
    console.log('Award post:', post.id)
    // In real app, this would open award selection modal
  }
  
  const handleReport = () => {
    setShowMoreMenu(false)
    console.log('Report post:', post.id)
    // In real app, this would open report modal
  }
  
  const handleVisibilityChange = (visibility: Visibility) => {
    setPostVisibility(visibility)
    setShowVisibilityMenu(false)
    console.log('Changed post visibility to:', visibility)
    // In real app, this would update the post visibility via API
  }
  
  const getVisibilityIcon = (visibility: Visibility) => {
    switch (visibility) {
      case 'public':
        return <Icon.Globe className="h-4 w-4" />
      case 'friends':
        return <Icon.Users className="h-4 w-4" />
      case 'selected':
        return <Icon.UserPlus className="h-4 w-4" />
      case 'private':
        return <Icon.Lock className="h-4 w-4" />
      default:
        return <Icon.Globe className="h-4 w-4" />
    }
  }
  
  const getVisibilityLabel = (visibility: Visibility) => {
    switch (visibility) {
      case 'public':
        return 'Public'
      case 'friends':
        return 'Friends'
      case 'selected':
        return 'Selected'
      case 'private':
        return 'Private'
      default:
        return 'Public'
    }
  }

  return (
    <Card className="p-6" hover>
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
            {post.author.verified && <Icon.Verified className="h-4 w-4 text-blue-500" />}
            {post.group && <span className="text-sm text-gray-500">in</span>}
            {post.group && <Badge variant="info">{post.group.name}</Badge>}
            <span className="text-sm text-gray-400">·</span>
            <span className="text-sm text-gray-400">{timeAgo(post.createdAt)}</span>
            <div className="ml-auto flex items-center gap-2">
              {/* Visibility Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowVisibilityMenu(!showVisibilityMenu)}
                  className="flex items-center gap-1 px-2 py-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {getVisibilityIcon(postVisibility)}
                  <Icon.ChevronDown className="h-3 w-3" />
                </button>
                {showVisibilityMenu && (
                  <div className="absolute top-full right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                    <button
                      onClick={() => handleVisibilityChange('public')}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-sm flex items-center gap-3 ${
                        postVisibility === 'public' ? 'bg-purple-50 text-purple-700' : ''
                      }`}
                    >
                      <Icon.Globe className="h-4 w-4" />
                      <div>
                        <div className="font-medium">Public</div>
                        <div className="text-xs text-gray-500">Anyone can see</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleVisibilityChange('friends')}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-sm flex items-center gap-3 ${
                        postVisibility === 'friends' ? 'bg-purple-50 text-purple-700' : ''
                      }`}
                    >
                      <Icon.Users className="h-4 w-4" />
                      <div>
                        <div className="font-medium">Friends</div>
                        <div className="text-xs text-gray-500">Friends only</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleVisibilityChange('selected')}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-sm flex items-center gap-3 ${
                        postVisibility === 'selected' ? 'bg-purple-50 text-purple-700' : ''
                      }`}
                    >
                      <Icon.UserPlus className="h-4 w-4" />
                      <div>
                        <div className="font-medium">Selected</div>
                        <div className="text-xs text-gray-500">Specific people</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleVisibilityChange('private')}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-sm flex items-center gap-3 ${
                        postVisibility === 'private' ? 'bg-purple-50 text-purple-700' : ''
                      }`}
                    >
                      <Icon.Lock className="h-4 w-4" />
                      <div>
                        <div className="font-medium">Private</div>
                        <div className="text-xs text-gray-500">Only you</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
              
              {/* Meatball Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Icon.MoreHorizontal className="h-4 w-4" />
                </button>
                {showMoreMenu && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                    <button
                      onClick={handleFollow}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm flex items-center gap-3"
                    >
                      <Icon.UserPlus className="h-4 w-4" />
                      {isFollowing ? 'Unfollow' : 'Follow'} {post.author.name}
                    </button>
                    <button
                      onClick={handleSave}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm flex items-center gap-3"
                    >
                      <Icon.Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                      {isSaved ? 'Unsave' : 'Save'} post
                    </button>
                    <button
                      onClick={handleAward}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm flex items-center gap-3"
                    >
                      <Icon.Award className="h-4 w-4" />
                      Give award
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={handleReport}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm flex items-center gap-3 text-red-600"
                    >
                      <Icon.Flag className="h-4 w-4" />
                      Report post
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="text-gray-800 text-lg leading-relaxed mb-4">{post.content}</p>

          {post.media?.length ? (
            <div className="mb-4">
              {post.media.map((m, i) => (
                <img key={i} src={m.src} alt={m.alt} className="w-full rounded-xl border border-gray-100" />
              ))}
            </div>
          ) : null}

          {post.poll && (
            <div className="mb-4 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold mb-3">{post.poll.question}</h4>
              <div className="space-y-2">
                {post.poll.options.map((o) => {
                  const total = post.poll!.options.reduce((s, x) => s + x.votes, 0)
                  const pct = total > 0 ? Math.round((o.votes / total) * 100) : 0
                  return (
                    <div key={o.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{o.label}</span>
                        <span className="text-gray-500">{pct}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {post.poll.options.reduce((s, x) => s + x.votes, 0)} votes
              </p>
            </div>
          )}

          {post.tags?.length ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((t) => (
                <span key={t} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  #{t}
                </span>
              ))}
            </div>
          ) : null}

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-6">
              <button
                onClick={() => onReact(post.id, "like")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  post.youReacted === "like" ? "bg-red-100 text-red-600" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon.Heart className="h-5 w-5" />
                <span className="font-medium">{totalReactions}</span>
              </button>
              <button 
                onClick={() => setShowComments(!showComments)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  showComments ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon.MessageCircle className="h-5 w-5" />
                <span className="font-medium">{post.comments.length}</span>
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-200"
                >
                  <Icon.Share className="h-5 w-5" />
                  <span className="font-medium">{post.shares}</span>
                </button>
                {showShareMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                    <button onClick={() => handleShare('copy')} className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm">Copy link</button>
                    <button onClick={() => handleShare('twitter')} className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm">Share on Twitter</button>
                    <button onClick={() => handleShare('linkedin')} className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm">Share on LinkedIn</button>
                    <button onClick={() => handleShare('email')} className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm">Share via Email</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Comments Section */}
          {showComments && (
            <CommentSection
              comments={post.comments}
              currentUser={you}
              onAddComment={handleAddComment}
            />
          )}
        </div>
      </div>
    </Card>
  )
}

/* =========================
   Right Rail Cards
========================= */
const ProfileCard: React.FC = () => (
  <Card className="p-6 mb-6">
    <div className="text-center">
      <Avatar src={you.avatar} alt={you.name} size={64} className="mx-auto mb-4" />
      <h3 className="font-bold text-lg text-gray-900">{you.name}</h3>
      <p className="text-gray-600 mb-2">{you.headline}</p>
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
  <Card className="p-4 mb-6">
    <div className="flex items-center gap-2 mb-3">
      <Icon.Flame className="h-4 w-4 text-orange-500" />
      <h6 className="font-bold text-sm text-gray-900">Trending</h6>
    </div>
    <div className="space-y-1">
      {[
        { topic: "AI in Education", posts: "1.2k posts", trend: "+15%" },
        { topic: "Remote Learning", posts: "986 posts", trend: "+8%" },
        { topic: "STEM Curriculum", posts: "742 posts", trend: "+12%" },
        { topic: "EdTech Funding", posts: "523 posts", trend: "+22%" },
      ].map((item, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between py-2 px-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
        >
          <div>
            <div className="font-medium text-sm text-gray-900">#{item.topic}</div>
            <div className="text-xs text-gray-500">{item.posts}</div>
          </div>
          <span className="text-xs font-medium text-emerald-600">{item.trend}</span>
        </div>
      ))}
    </div>
  </Card>
)

const SuggestedConnections: React.FC = () => (
  <Card className="p-4 mb-6">
    <h6 className="font-bold text-sm text-gray-900 mb-3">People to Follow</h6>
    <div className="space-y-2">
      {friends.map((f) => (
        <div key={f.id} className="flex items-center gap-3 py-1">
          <Avatar src={f.avatar} alt={f.name} size={32} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-medium text-sm text-gray-900 truncate">{f.name}</span>
              {f.verified && <Icon.Verified className="h-3 w-3 text-blue-500 flex-shrink-0" />}
            </div>
            <p className="text-xs text-gray-500 truncate">{f.headline}</p>
          </div>
          <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium hover:bg-purple-200 transition-colors flex-shrink-0">
            Follow
          </button>
        </div>
      ))}
    </div>
  </Card>
)

const ActiveGroups: React.FC = () => (
  <Card className="p-4">
    <h6 className="font-bold text-sm text-gray-900 mb-3">Your Groups</h6>
    <div className="space-y-1">
      {groups.map((g) => (
        <div key={g.id} className="flex items-center gap-3 py-2 px-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${g.color} flex items-center justify-center`}>
            <Icon.Home className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm text-gray-900 truncate">{g.name}</div>
            <div className="text-xs text-gray-500">{g.members.toLocaleString()} members</div>
          </div>
          {g.joined && <Badge variant="success">Joined</Badge>}
        </div>
      ))}
    </div>
  </Card>
)

/* =========================
   Main Page
========================= */
export default function ModernCommunityPage() {
  const [posts, setPosts] = React.useState<Post[]>(postsSeed)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState<"all" | "following" | "groups">("all")

  const filteredPosts = posts.filter((post) => {
    const q = searchQuery.toLowerCase()
    const matches =
      post.content.toLowerCase().includes(q) ||
      post.author.name.toLowerCase().includes(q) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(q)))
    if (!matches) return false
    if (activeFilter === "following") return friends.some((f) => f.id === post.author.id)
    if (activeFilter === "groups") return !!post.group
    return true
  })

  const handleReact = (postId: string, reaction: ReactionKey) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p
        const next = { ...p.reactions }
        if (p.youReacted === reaction) {
          next[reaction] = Math.max(0, next[reaction] - 1)
          return { ...p, reactions: next, youReacted: null }
        }
        if (p.youReacted) next[p.youReacted] = Math.max(0, next[p.youReacted] - 1)
        next[reaction] = (next[reaction] || 0) + 1
        return { ...p, reactions: next, youReacted: reaction }
      }),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/30">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* LEFT (static sidebar) */}
          <LeftSidebar />

          {/* CENTER */}
          <main className="col-span-12 lg:col-span-6">
            {/* Simple tabs */}
            <div className="flex items-center gap-2 mb-6">
              {[
                { key: "all", label: "For You", count: posts.length },
                {
                  key: "following",
                  label: "Following",
                  count: posts.filter((p) => friends.some((f) => f.id === p.author.id)).length,
                },
                { key: "groups", label: "Groups", count: posts.filter((p) => !!p.group).length },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveFilter(t.key as any)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                    activeFilter === t.key ? "bg-white/90 text-gray-900 shadow-lg" : "text-gray-600 hover:bg-white/50"
                  }`}
                >
                  {t.label}
                  <span className="ml-2 text-sm opacity-60">({t.count})</span>
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-6 pb-12">
              {filteredPosts.length ? (
                filteredPosts.map((post) => <PostCard key={post.id} post={post} onReact={handleReact} />)
              ) : (
                <Card className="p-12 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters</p>
                </Card>
              )}
            </div>
          </main>

          {/* RIGHT */}
          <aside className="col-span-12 lg:col-span-3">
            <ProfileCard />
            <TrendingTopics />
            <SuggestedConnections />
            <ActiveGroups />
          </aside>
        </div>
      </div>
    </div>
  )
}
