"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

type Props = {
  unreadCount?: number
  userName?: string
  avatarUrl?: string
}

export default function Navigation({
  unreadCount = 3,
  userName = "Sam",
  avatarUrl = "/avatar/25.jpg",
}: Props) {
  const [openUser, setOpenUser] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const userMenuRef = useRef<HTMLDivElement>(null)

  // ----- Dark mode persistence -----
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldDark = saved ? saved === "dark" : prefersDark
    setIsDark(shouldDark)
    document.documentElement.classList.toggle("dark", shouldDark)
  }, [])

  const toggleDark = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  // ----- Close user menu on outside click / Esc -----
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setOpenUser(false)
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenUser(false)
    }
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onEsc)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onEsc)
    }
  }, [])

  const handleLogout = () => setIsLoggedIn(false)

  return (
    <nav className="sticky-top z-50 w-full border-b border-gray-200/70 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-950/70">
      <div className="container-fluid px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/erudyte-logo-dmm3SiboydR6bY9VBh0oBhFVLLmBhS.png" alt="Erudyte Commons" className="h-10" />
          </div>

          {/* Right controls */}
          <div className="ms-auto flex items-center gap-0.5">
            {/* Primary nav */}
            <div className="hidden md:flex items-center gap-6 text-sm pr-6"> 
              <Link href="/" className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"> Home </Link> 
              <Link href="/hub" className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"> Community </Link> 
              <Link href="/library" className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"> Library </Link> 
              <Link href="/funding" className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium" > Funding </Link> 
              <Link href="/events" className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"> Events </Link>
              </div>
            {/* Dark mode toggle */}
            <button
              type="button"
              onClick={toggleDark}
              className="group flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-pressed={isDark}
            >
              <span className="relative inline-flex h-5 w-5 items-center justify-center">
                {/* moon icon */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-none stroke-current opacity-90"
                >
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="hidden sm:inline">Dark Mode</span>
              <span
                className={`ms-1 inline-flex h-5 w-9 items-center rounded-full bg-gray-300 transition
                after:ml-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition
                ${isDark ? "bg-indigo-500 after:translate-x-4" : "after:translate-x-0"}`}
                aria-hidden="true"
              />
            </button>

            {/* Messages */}
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-label="Messages"
            >
              <ModernChatIcon />
              {unreadCount > 0 && (
                <span
                  className="absolute -right-1 -top-1 inline-flex min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-4 text-white"
                  aria-label={`${unreadCount} unread messages`}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Create */}
            <button
              className="flex items-center gap-1 px-2 py-1.5 rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors font-medium text-sm"
              aria-label="Create"
            >
              <ModernPlusIcon />
              <span>Create</span>
            </button>

            {/* Notifications */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-label="Notifications"
            >
              <ModernBellIcon />
            </button>

            {/* User avatar + menu */}
            {isLoggedIn && (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setOpenUser((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={openUser}
                  className="h-9 w-9 overflow-hidden rounded-full ring-1 ring-gray-300 hover:ring-gray-400 dark:ring-gray-700"
                >
                  <img
                    src={avatarUrl}
                    alt={`${userName} profile`}
                    className="h-full w-full object-cover"
                  />
                </button>

                {openUser && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900"
                  >
                    <MenuButton icon={<UserIcon />}>
                      <div>
                        <div className="font-medium">View Profile</div>
                        <div className="text-xs font-normal text-gray-500 dark:text-gray-400">@{userName}</div>
                      </div>
                    </MenuButton>
                    <div className="border-t border-gray-200 dark:border-gray-800" />
                    <MenuButton icon={<EditIcon />}>Edit profile</MenuButton>
                    <MenuButton icon={<UserIcon />}>Account Details</MenuButton>
                    <MenuButton icon={<CollectionIcon />}>Collections</MenuButton>
                    <MenuButton icon={<DraftIcon />}>Drafts</MenuButton>
                    <MenuButton icon={<AchievementIcon />}>Achievements</MenuButton>
                    <MenuButton icon={<PremiumIcon />}>Premium</MenuButton>
                    <MenuButton icon={<SettingsIcon />}>Settings</MenuButton>
                    <div className="border-t border-gray-200 dark:border-gray-800" />
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                      role="menuitem"
                    >
                      <LogoutIcon />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

/* ---------- Small helpers ---------- */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
    >
      {children}
    </Link>
  )
}

function MenuItem({
  href,
  icon,
  children,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
    >
      {icon}
      {children}
    </Link>
  )
}

function MenuButton({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <button
      role="menuitem"
      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-800 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1">{children}</div>
    </button>
  )
}

/* ---------- Minimal inline icons (pixel-clean, no deps) ---------- */

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" strokeWidth="1.7">
      <path d="M21 12a7 7 0 0 1-7 7H8l-5 3 1.2-4.8A7 7 0 0 1 3 12a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7Z" strokeLinecap="round" />
      <path d="M8 12h8M8 9h8M8 15h5" strokeLinecap="round" />
    </svg>
  )
}
function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" strokeWidth="1.7">
      <path d="M15 18H5l1.3-1.6A7 7 0 0 0 7 13V9a5 5 0 1 1 10 0v4a7 7 0 0 0 .7 3.4L19 18h-4Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 21a2 2 0 0 0 4 0" strokeLinecap="round" />
    </svg>
  )
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" strokeWidth="1.7">
      <path d="M20 21a8 8 0 1 0-16 0" strokeLinecap="round" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  )
}
function CollectionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" strokeWidth="1.7">
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <rect x="3" y="10" width="18" height="4" rx="1" />
      <rect x="3" y="16" width="18" height="4" rx="1" />
    </svg>
  )
}
function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" strokeWidth="1.7">
      <path d="M6 4h12v16l-6-4-6 4V4Z" strokeLinejoin="round" />
    </svg>
  )
}
function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" strokeWidth="1.7">
      <path d="M12 3 4 6v6c0 5 3.6 7.7 8 9 4.4-1.3 8-4 8-9V6l-8-3Z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" strokeWidth="1.7">
      <path d="M15 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 12H9" strokeLinecap="round" />
      <path d="M11 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" strokeLinecap="round" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" strokeWidth="1.7">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DraftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" strokeWidth="1.7">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AchievementIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" strokeWidth="1.7">
      <circle cx="12" cy="8" r="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PremiumIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" strokeWidth="1.7">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 22h16l-1-7H5l-1 7Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14.66V17a2 2 0 0 0 4 0v-2.34" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" strokeWidth="1.7">
      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ModernChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.96 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z" />
      <circle cx="8" cy="12" r="1.5" fill="white" />
      <circle cx="12" cy="12" r="1.5" fill="white" />
      <circle cx="16" cy="12" r="1.5" fill="white" />
    </svg>
  )
}

function ModernPlusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ModernBellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 2C10.9 2 10 2.9 10 4v1.29C7.12 6.14 5 8.82 5 12v4.29L3.29 18c-.63.63-.19 1.71.7 1.71h15.02c.89 0 1.33-1.08.7-1.71L18 16.29V12c0-3.18-2.12-5.86-5-6.71V4c0-1.1-.9-2-2-2zm-2 18c0 1.1.9 2 2 2s2-.9 2-2" />
    </svg>
  )
}
