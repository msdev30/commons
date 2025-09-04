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
}

interface Group {
  id: string
  name: string
  members: number
  cover?: string
  joined?: boolean
}

interface Post {
  id: string
  author: User
  createdAt: string // ISO
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
}

interface CommentItem {
  id: string
  author: User
  createdAt: string
  content: string
  replies?: CommentItem[]
}

/* =========================
   Inline icons (no deps)
========================= */
const Icon = {
  Search: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="11" cy="11" r="7" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" strokeWidth="2" />
    </svg>
  ),
  Image: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2" />
      <path d="M8 13l2.5-3 4.5 6" strokeWidth="2" />
      <circle cx="8" cy="9" r="1.5" />
    </svg>
  ),
  Video: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <rect x="3" y="5" width="14" height="14" rx="2" strokeWidth="2" />
      <path d="M17 9l4-2v10l-4-2z" strokeWidth="2" />
    </svg>
  ),
  Poll: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M5 3v18M12 8v13M19 13v8" strokeWidth="2" />
    </svg>
  ),
  Emoji: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="12" cy="12" r="9" strokeWidth="2" />
      <path d="M8 10h.01M16 10h.01M8 15c1.5 1 3 1.5 4 1.5s2.5-.5 4-1.5" strokeWidth="2" />
    </svg>
  ),
  Like: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 21s-7.5-4.35-9.33-9.31A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.33 5.69C19.5 16.65 12 21 12 21z" />
    </svg>
  ),
  Comment: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M21 15a4 4 0 0 1-4 4H9l-4 4V7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4z" strokeWidth="2" />
    </svg>
  ),
  Share: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M12 16V4m0 0l-4 4m4-4 4 4" strokeWidth="2" />
    </svg>
  ),
  Globe: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="12" cy="12" r="9" strokeWidth="2" />
      <path d="M2 12h20M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" strokeWidth="2" />
    </svg>
  ),
  Friends: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="9" cy="8" r="4" strokeWidth="2" />
      <path d="M17 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM3 22a6 6 0 0 1 12 0M15 22a6 6 0 0 1 6-6" strokeWidth="2" />
    </svg>
  ),
  Bell: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeWidth="2" />
    </svg>
  ),
  Calendar: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="2" />
      <path d="M16 3v4M8 3v4M3 10h18" strokeWidth="2" />
    </svg>
  ),
  Fire: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2s6 4 6 10a6 6 0 0 1-12 0C6 6 12 2 12 2z" />
    </svg>
  ),
  Chat: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M4 4h16v12H7l-3 3z" />
    </svg>
  ),
}

/* =========================
   Small UI helpers
========================= */
const Avatar: React.FC<{ src: string; alt?: string; size?: number }> = ({ src, alt, size = 36 }) => (
  <img src={src} alt={alt} className="rounded-full object-cover" style={{ width: size, height: size }} />
)

const Pill: React.FC<{ children: React.ReactNode; active?: boolean }> = ({ children, active }) => (
  <span
    className={`px-2.5 py-1 rounded-full text-xs font-medium border ${active ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-800 border-gray-200"}`}
  >
    {children}
  </span>
)

const Stat: React.FC<{ label: string; value: React.ReactNode; icon?: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm flex items-center gap-3">
    <div className="h-10 w-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center">{icon}</div>
    <div>
      <div className="font-semibold text-xl leading-none">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  </div>
)

/* =========================
   Mock Data
========================= */
const you: User = {
  id: "u0",
  name: "Murewa Olubela",
  avatar: "/images/avatar-placeholder.png",
  headline: "Founder @ Erudyte",
}

const friends: User[] = [
  { id: "u1", name: "Whitney", avatar: "/images/community/whit.png", headline: "Educator" },
  { id: "u2", name: "Max", avatar: "/images/community/max.png", headline: "Data Engineer" },
  { id: "u3", name: "Rio", avatar: "/images/community/rio.png", headline: "Curriculum Lead" },
]

const groups: Group[] = [
  { id: "g1", name: "STEM Teachers Network", members: 8421, cover: "/images/community/g-stem.jpg", joined: true },
  { id: "g2", name: "ELL & MLL Champions", members: 6512, cover: "/images/community/g-ell.jpg" },
  { id: "g3", name: "Workforce Pathways", members: 3124, cover: "/images/community/g-workforce.jpg" },
]

const postsSeed: Post[] = [
  {
    id: "p1",
    author: friends[1],
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    content:
      "What’s your favorite quick formative assessment for middle school algebra? Looking for ideas I can run in 10 minutes.",
    tags: ["Algebra", "Assessment"],
    visibility: "public",
    reactions: { like: 34, insightful: 12, celebrate: 2, love: 4, curious: 7 },
    youReacted: null,
    comments: [
      {
        id: "c1",
        author: friends[0],
        createdAt: new Date().toISOString(),
        content: "Exit tickets with 2 tiered problems. Works like a charm!",
      },
    ],
    shares: 3,
  },
  {
    id: "p2",
    author: you,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    content:
      "Shared a quick template for **Daily Digest** emails we’re testing with teachers—auto-curates 3 relevant threads, 2 open calls, and 1 event.",
    media: [{ type: "image", src: "/images/community/digest-preview.jpg", alt: "Daily Digest preview" }],
    tags: ["Product", "TeacherTools"],
    visibility: "friends",
    reactions: { like: 66, insightful: 22, celebrate: 11, love: 9, curious: 5 },
    youReacted: "insightful",
    comments: [],
    shares: 10,
  },
  {
    id: "p3",
    author: friends[2],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    content: "Poll: Which topic should our next community webinar cover?",
    poll: {
      question: "Next webinar topic?",
      options: [
        { id: "o1", label: "Data Contracts for K-12 Finance", votes: 86 },
        { id: "o2", label: "ELL Funding Streams 101", votes: 124 },
        { id: "o3", label: "Due Diligence on EdTech Vendors", votes: 59 },
      ],
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    },
    group: groups[0],
    tags: ["Webinar", "Survey"],
    visibility: "public",
    reactions: { like: 18, insightful: 7, celebrate: 5, love: 2, curious: 9 },
    youReacted: null,
    comments: [],
    shares: 2,
  },
]

/* =========================
   Composer
========================= */
const Composer: React.FC<{
  user: User
  onSubmit: (post: Partial<Post>) => void
}> = ({ user, onSubmit }) => {
  const [text, setText] = React.useState("")
  const [visibility, setVisibility] = React.useState<Visibility>("public")

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
      <div className="flex gap-3">
        <Avatar src={user.avatar} alt={user.name} />
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share an update with your community…"
            className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
            rows={3}
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50">
                <Icon.Image className="h-4 w-4" /> Photo
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50">
                <Icon.Video className="h-4 w-4" /> Video
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50">
                <Icon.Poll className="h-4 w-4" /> Poll
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50">
                <Icon.Emoji className="h-4 w-4" /> Emoji
              </button>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm"
                aria-label="Visibility"
              >
                <option value="public">Public</option>
                <option value="friends">Friends</option>
                <option value="private">Only me</option>
              </select>
              <button
                onClick={() => {
                  if (!text.trim()) return
                  onSubmit({ content: text, visibility })
                  setText("")
                }}
                className="inline-flex items-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================
   Post Card
========================= */
const ReactionBar: React.FC<{
  post: Post
  onReact: (id: string, k: ReactionKey) => void
}> = ({ post, onReact }) => {
  const buttons: { k: ReactionKey; label: string }[] = [
    { k: "like", label: "Like" },
    { k: "insightful", label: "Insightful" },
    { k: "celebrate", label: "Celebrate" },
    { k: "love", label: "Love" },
    { k: "curious", label: "Curious" },
  ]

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {buttons.map(({ k, label }) => (
        <button
          key={k}
          onClick={() => onReact(post.id, k)}
          className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
            post.youReacted === k
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
          }`}
        >
          {label} {post.reactions[k] ? `· ${post.reactions[k]}` : ""}
        </button>
      ))}
      <span className="ml-auto text-xs text-gray-500 inline-flex items-center gap-1">
        <Icon.Comment className="h-4 w-4" /> {post.comments.length}
      </span>
      <span className="text-xs text-gray-500 inline-flex items-center gap-1">
        <Icon.Share className="h-4 w-4" /> {post.shares}
      </span>
    </div>
  )
}

const PollBlock: React.FC<{ post: Post }> = ({ post }) => {
  if (!post.poll) return null
  const total = post.poll.options.reduce((s, o) => s + o.votes, 0) || 1
  return (
    <div className="mt-3 rounded-xl border border-gray-200 p-3">
      <div className="font-medium mb-2">{post.poll.question}</div>
      <div className="grid gap-2">
        {post.poll.options.map((o) => {
          const pct = Math.round((o.votes / total) * 100)
          return (
            <div key={o.id}>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>{o.label}</span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100">
                <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-2 text-xs text-gray-500">Total votes: {total}</div>
    </div>
  )
}

const PostCard: React.FC<{
  post: Post
  onReact: (id: string, k: ReactionKey) => void
}> = ({ post, onReact }) => (
  <article className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
    <div className="flex items-start gap-3">
      <Avatar src={post.author.avatar} alt={post.author.name} />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold">{post.author.name}</span>
          {post.group && <Pill>{post.group.name}</Pill>}
          <span className="text-xs text-gray-500">· {new Date(post.createdAt).toLocaleString()}</span>
          <span className="text-xs text-gray-500 inline-flex items-center gap-1">
            <Icon.Globe className="h-3.5 w-3.5" /> {post.visibility}
          </span>
        </div>

        <div className="prose prose-sm mt-2 max-w-none text-gray-900">{post.content}</div>

        {/* Media */}
        {post.media && post.media.length > 0 && (
          <div className="mt-3 grid gap-2">
            {post.media.map((m, idx) =>
              m.type === "image" ? (
                <img key={idx} src={m.src} alt={m.alt || ""} className="rounded-xl border border-gray-100" />
              ) : (
                <video key={idx} src={m.src} controls className="rounded-xl border border-gray-100" />
              ),
            )}
          </div>
        )}

        {/* Poll */}
        <PollBlock post={post} />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
                #{t}
              </span>
            ))}
          </div>
        )}

        <ReactionBar post={post} onReact={onReact} />

        {/* Quick comment box (mock) */}
        <div className="mt-3 flex items-center gap-2">
          <Avatar src={you.avatar} alt={you.name} size={28} />
          <input
            className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
            placeholder="Write a comment…"
          />
          <button className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs hover:bg-gray-50">
            Send
          </button>
        </div>
      </div>
    </div>
  </article>
)

/* =========================
   Right Rail Widgets
========================= */
const DailyDigest: React.FC = () => (
  <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
    <div className="flex items-center justify-between mb-2">
      <h3 className="font-semibold">Daily Digest</h3>
      <Pill>Auto</Pill>
    </div>
    <ul className="space-y-3">
      <li>
        <a className="block text-sm text-gray-900 hover:underline" href="#">
          3 threads blowing up in “STEM Teachers Network”
        </a>
        <div className="text-xs text-gray-500">+125 replies · 42 new today</div>
      </li>
      <li>
        <a className="block text-sm text-gray-900 hover:underline" href="#">
          Open call: District pilots for Data-Driven Instruction
        </a>
        <div className="text-xs text-gray-500">Closes Friday</div>
      </li>
      <li>
        <a className="block text-sm text-gray-900 hover:underline" href="#">
          Event: Grant Calendars & Capacity Planning (webinar)
        </a>
        <div className="text-xs text-gray-500">Tomorrow · 1pm ET</div>
      </li>
    </ul>
    <button className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50">
      Customize Digest
    </button>
  </div>
)

const PeopleYouMayKnow: React.FC = () => (
  <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
    <h3 className="font-semibold mb-2">People you may know</h3>
    <div className="space-y-3">
      {friends.map((f) => (
        <div key={f.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={f.avatar} alt={f.name} />
            <div>
              <div className="text-sm font-medium">{f.name}</div>
              <div className="text-xs text-gray-500">{f.headline}</div>
            </div>
          </div>
          <button className="rounded-xl bg-gray-900 px-3 py-2 text-xs font-medium text-white hover:bg-black">
            Add friend
          </button>
        </div>
      ))}
    </div>
  </div>
)

const Trending: React.FC = () => (
  <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
    <div className="flex items-center justify-between mb-2">
      <h3 className="font-semibold">Trending</h3>
      <Icon.Fire className="h-4 w-4 text-orange-600" />
    </div>
    <ul className="space-y-2 text-sm">
      <li>
        <a className="hover:underline" href="#">
          ELL/MLL Funding Streams 101
        </a>{" "}
        <span className="text-gray-500">· 1.2k reads</span>
      </li>
      <li>
        <a className="hover:underline" href="#">
          State Funding Formulas, Demystified
        </a>{" "}
        <span className="text-gray-500">· 986 reads</span>
      </li>
      <li>
        <a className="hover:underline" href="#">
          Due Diligence on EdTech Vendors
        </a>{" "}
        <span className="text-gray-500">· 742 reads</span>
      </li>
    </ul>
  </div>
)

const EventsWidget: React.FC = () => (
  <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
    <div className="flex items-center justify-between mb-2">
      <h3 className="font-semibold">Upcoming events</h3>
      <Icon.Calendar className="h-4 w-4 text-gray-600" />
    </div>
    <ul className="space-y-2 text-sm">
      <li>
        <strong>Oct 19</strong> — Collaborative Lesson Design Workshop
      </li>
      <li>
        <strong>Nov 12</strong> — STEM + SEL Virtual Summit
      </li>
      <li>
        <strong>Dec 05</strong> — Workforce Readiness Roundtable
      </li>
    </ul>
    <button className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50">
      View calendar
    </button>
  </div>
)

const GroupsToJoin: React.FC = () => (
  <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
    <h3 className="font-semibold mb-2">Groups to join</h3>
    <div className="space-y-3">
      {groups.map((g) => (
        <div key={g.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={g.cover || "/images/community/group.jpg"} alt="" className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <div className="text-sm font-medium">{g.name}</div>
              <div className="text-xs text-gray-500">{g.members.toLocaleString()} members</div>
            </div>
          </div>
          <button
            className={`rounded-xl px-3 py-2 text-xs font-medium ${g.joined ? "border border-gray-200" : "bg-gray-900 text-white hover:bg-black"}`}
          >
            {g.joined ? "Joined" : "Join"}
          </button>
        </div>
      ))}
    </div>
  </div>
)

/* =========================
   Left Rail
========================= */
const LeftRail: React.FC = () => (
  <aside className="space-y-3">
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
      <div className="flex items-center gap-3">
        <Avatar src={you.avatar} alt={you.name} size={48} />
        <div>
          <div className="font-semibold">{you.name}</div>
          <div className="text-xs text-gray-500">{you.headline}</div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <StatMini label="Friends" value="248" />
        <StatMini label="Groups" value="8" />
        <StatMini label="Posts" value="56" />
      </div>
      <div className="mt-3">
        <a
          href="/profile"
          className="inline-flex items-center rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white hover:bg-gray-50"
        >
          View profile
        </a>
      </div>
    </div>

    <nav className="rounded-2xl bg-white border border-gray-100 shadow-sm p-2">
      <NavItem label="Feed" href="/community" active />
      <NavItem label="Friends" href="/community/friends" icon={<Icon.Friends className="h-4 w-4" />} />
      <NavItem label="Groups" href="/community/groups" />
      <NavItem label="Messages" href="/messages" />
      <NavItem label="Notifications" href="/notifications" icon={<Icon.Bell className="h-4 w-4" />} />
      <div className="px-3 py-2">
        <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Your groups</div>
        <div className="flex flex-col gap-1">
          {groups.slice(0, 3).map((g) => (
            <a key={g.id} href={`/community/groups/${g.id}`} className="text-sm text-gray-700 hover:underline">
              {g.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  </aside>
)

const StatMini: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="rounded-xl bg-gray-50 p-2">
    <div className="font-semibold">{value}</div>
    <div className="text-[11px] text-gray-500">{label}</div>
  </div>
)

const NavItem: React.FC<{ label: string; href: string; active?: boolean; icon?: React.ReactNode }> = ({
  label,
  href,
  active,
  icon,
}) => (
  <a
    href={href}
    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${active ? "bg-gray-900 text-white" : "text-gray-800 hover:bg-gray-50"}`}
  >
    {icon && <span>{icon}</span>}
    {label}
  </a>
)

/* =========================
   Main Component
========================= */
export default function CommunityPage() {
  const [posts, setPosts] = React.useState<Post[]>(postsSeed)
  const [query, setQuery] = React.useState("")
  const [sort, setSort] = React.useState<"top" | "new">("top")
  const [composerKey, setComposerKey] = React.useState(0) // reset media state if you add it later
  const [chatOpen, setChatOpen] = React.useState(false)

  // Simple client-side search & sort
  const visiblePosts = posts
    .filter((p) => [p.content, p.author.name, ...(p.tags || [])].join(" ").toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sort === "new") return +new Date(b.createdAt) - +new Date(a.createdAt)
      // "top": sort by total reactions + comments + shares
      const score = (p: Post) => Object.values(p.reactions).reduce((s, n) => s + n, 0) + p.comments.length + p.shares
      return score(b) - score(a)
    })

  const handleReact = (id: string, k: ReactionKey) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p
        const current = p.youReacted
        const reactions = { ...p.reactions }
        // remove old
        if (current) reactions[current] = Math.max(0, reactions[current] - 1)
        // toggle same reaction
        if (current === k) {
          return { ...p, youReacted: null, reactions }
        }
        reactions[k] = (reactions[k] || 0) + 1
        return { ...p, youReacted: k, reactions }
      }),
    )
  }

  const handleCreatePost = (partial: Partial<Post>) => {
    const newPost: Post = {
      id: `p${Date.now()}`,
      author: you,
      createdAt: new Date().toISOString(),
      content: partial.content || "",
      visibility: partial.visibility || "public",
      reactions: { like: 0, insightful: 0, celebrate: 0, love: 0, curious: 0 },
      youReacted: null,
      comments: [],
      shares: 0,
    }
    setPosts((prev) => [newPost, ...prev])
    setComposerKey((k) => k + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
              EH
            </div>
            <span className="font-semibold">Community</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="relative w-[360px]">
              <Icon.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts, people, groups…"
                className="w-full rounded-xl border border-gray-200 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
              />
            </div>
            <a
              href="/library"
              className="hidden lg:inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white hover:bg-gray-50"
            >
              Library
            </a>
            <img src={you.avatar} alt="" className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-12 gap-6">
        {/* Left rail */}
        <div className="col-span-12 md:col-span-3">
          <LeftRail />
        </div>

        {/* Feed */}
        <div className="col-span-12 md:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Pill active={sort === "top"}>Top</Pill>
              <button className="text-sm text-gray-600" onClick={() => setSort(sort === "top" ? "new" : "top")}>
                {sort === "top" ? "Switch to New" : "Switch to Top"}
              </button>
            </div>
            <div className="text-sm text-gray-500">Showing {visiblePosts.length} posts</div>
          </div>

          <Composer key={composerKey} user={you} onSubmit={handleCreatePost} />

          {visiblePosts.map((p) => (
            <PostCard key={p.id} post={p} onReact={handleReact} />
          ))}
        </div>

        {/* Right rail */}
        <div className="col-span-12 md:col-span-3 space-y-4">
          <Stat label="New posts today" value="342" icon={<Icon.Fire className="h-5 w-5" />} />
          <DailyDigest />
          <PeopleYouMayKnow />
          <GroupsToJoin />
          <Trending />
          <EventsWidget />
        </div>
      </div>

      {/* Chat launcher */}
      <button
        onClick={() => setChatOpen((s) => !s)}
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-4 py-3 shadow-lg hover:bg-black"
        aria-expanded={chatOpen}
      >
        <Icon.Chat className="h-5 w-5" /> Messages
      </button>

      {/* Chat drawer (mock) */}
      {chatOpen && (
        <div className="fixed bottom-20 right-6 w-[320px] rounded-2xl bg-white border border-gray-100 shadow-xl overflow-hidden">
          <div className="p-3 border-b flex items-center justify-between">
            <div className="font-semibold">Chats</div>
            <button onClick={() => setChatOpen(false)} className="text-sm text-gray-500">
              Close
            </button>
          </div>
          <div className="p-3 space-y-2 max-h-[360px] overflow-auto">
            {friends.map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-2 hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <span className="relative">
                    <Avatar src={f.avatar} alt={f.name} />
                    <span className="absolute -right-0 -bottom-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                  </span>
                  <div>
                    <div className="text-sm font-medium">{f.name}</div>
                    <div className="text-xs text-gray-500">Online</div>
                  </div>
                </div>
                <button className="rounded-xl bg-gray-900 text-white px-3 py-1.5 text-xs">Open</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
