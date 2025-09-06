"use client"
import * as React from "react"
import { Icon } from "@/components/icons"

/* ============ tiny atoms ============ */
const SectionTitle: React.FC<{children: React.ReactNode; isCollapsed: boolean; onToggle: () => void}> = ({ children, isCollapsed, onToggle }) => (
  <button 
    onClick={onToggle}
    className="w-full flex items-center justify-between px-3 pt-4 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500/90 hover:text-gray-700 transition-colors"
  >
    <span>{children}</span>
    <Icon.Plus className={`h-3 w-3 transition-transform ${isCollapsed ? '' : 'rotate-45'}`} />
  </button>
)

type ItemProps = {
  icon: React.ReactNode
  label: string
  badge?: string
  active?: boolean
  onClick?: () => void
}
const Item: React.FC<ItemProps> = ({ icon, label, badge, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-current={active ? "page" : undefined}
    className={[
      "group relative w-full flex items-center justify-between",
      "rounded-xl px-3 py-2 text-[13px]",
      active
        ? "bg-white text-gray-900 shadow-sm"
        : "text-gray-700 hover:text-gray-900 hover:bg-white/80",
      "outline-none ring-0 focus-visible:ring-2 focus-visible:ring-indigo-300/60",
      "transition-colors"
    ].join(" ")}
  >
    {/* left accent rail for active item */}
    <span
      className={[
        "absolute left-0 top-1/2 -translate-y-1/2 h-6 rounded-full",
        active ? "w-1 bg-gradient-to-b from-indigo-500 to-fuchsia-500" : "w-0"
      ].join(" ")}
    />
    <span className="flex items-center gap-2.5">
      <span className="text-gray-500 group-hover:text-gray-700">{icon}</span>
      <span className="truncate">{label}</span>
    </span>
    {badge && (
      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
        {badge}
      </span>
    )}
  </button>
)

const GroupAvatar: React.FC<{ name: string; color: string }> = ({ name, color }) => {
  const initials = name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-[10px] font-semibold`}>
      {initials}
    </div>
  )
}

const HubPill: React.FC<{ name: string; icon?: React.ReactNode; active?: boolean; isGroup?: boolean; groupColor?: string; href?: string }> = ({
  name,
  icon,
  active,
  isGroup = false,
  groupColor = "from-gray-400 to-gray-600",
  href = "#",
}) => (
  <button
    type="button"
    className={[
      "flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] w-full text-left",
      active
        ? "bg-white text-gray-900 shadow-sm"
        : "text-gray-700 hover:text-gray-900 hover:bg-white/80",
      "transition-colors"
    ].join(" ")}
  >
    {isGroup ? (
      <GroupAvatar name={name} color={groupColor} />
    ) : (
      <span className="text-gray-500">{icon ?? <Icon.Hash className="h-4 w-4" />}</span>
    )}
    <span className="truncate">{name}</span>
  </button>
)

/* ============ component ============ */
const LeftSidebar: React.FC = () => {
  // if you want to control which menu item is active from page state,
  // pass a prop and use it here. For now, “Trending” is demo-active.
  const [activeKey] = React.useState<"lounge" | "base" | "trending" | "explore" | "all">("lounge")
  const [collapsed, setCollapsed] = React.useState({
    menu: false,
    recent: false,
    hubs: false,
    resources: false,
    rules: false
  })

  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="sticky top-20">
        <div
          className={[
            "relative rounded-2xl border border-white/30 bg-white/70",
            "backdrop-blur-xl shadow-xl shadow-black/5 p-2 mb-44"
          ].join(" ")}
        >
          {/* soft gradient halo */}
          <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-indigo-500/5 via-transparent to-fuchsia-500/5" />

          {/* MENU */}
          <SectionTitle isCollapsed={collapsed.menu} onToggle={() => setCollapsed(prev => ({...prev, menu: !prev.menu}))}>Menu</SectionTitle>
          {!collapsed.menu && <div className="space-y-1 px-2 pb-2">
            <Item icon={<Icon.Home className="h-4 w-4" />} label="Lounge" active={activeKey === "lounge"} />
            <Item icon={<Icon.Pen className="h-4 w-4" />} label="Base" active={activeKey === "base"} />
            <Item icon={<Icon.Flame className="h-4 w-4" />} label="Trending" active={activeKey === "trending"} />
            <Item icon={<Icon.Compass className="h-4 w-4" />} label="Explore" active={activeKey === "explore"} />
            <Item icon={<Icon.Hash className="h-4 w-4" />} label="All" active={activeKey === "all"} />
          </div>}

          {/* RECENT */}
          <SectionTitle isCollapsed={collapsed.recent} onToggle={() => setCollapsed(prev => ({...prev, recent: !prev.recent}))}>Recent</SectionTitle>
          {!collapsed.recent && <div className="space-y-1 px-2 pb-2">
            <HubPill name="SEL for Educators" isGroup groupColor="from-blue-500 to-indigo-500" />
            <HubPill name="ELL/MLL Champions" isGroup groupColor="from-amber-500 to-orange-500" />
            <HubPill name="Mathematics Pedagogy" isGroup groupColor="from-green-500 to-emerald-500" />
            <HubPill name="Science Lab Network" isGroup groupColor="from-red-500 to-pink-500" />
            <HubPill name="Digital Learning Hub" isGroup groupColor="from-purple-500 to-violet-500" />
          </div>}

          {/* HUBS */}
          <SectionTitle isCollapsed={collapsed.hubs} onToggle={() => setCollapsed(prev => ({...prev, hubs: !prev.hubs}))}>Hubs</SectionTitle>
          {!collapsed.hubs && <div className="space-y-1 px-2 pb-2">
            <Item 
              icon={<Icon.PlusCircle className="h-4 w-4" />} 
              label="Create Hub" 
              onClick={() => window.location.href = '/hub'}
            />
            <Item 
              icon={<Icon.Settings className="h-4 w-4" />} 
              label="Manage Hub" 
              onClick={() => window.location.href = '/hub'}
            />
            <div className="pt-1 space-y-1">
              <HubPill name="STEM Teachers Network" isGroup groupColor="from-purple-500 to-pink-500" />
              <HubPill name="ELL & MLL Champions" isGroup groupColor="from-cyan-500 to-blue-500" />
              <HubPill name="Workforce Pathways" isGroup groupColor="from-emerald-500 to-teal-500" />
              <HubPill name="Special Education" isGroup groupColor="from-indigo-500 to-purple-500" />
              <HubPill name="Early Childhood Ed" isGroup groupColor="from-teal-500 to-cyan-500" />
            </div>
          </div>}

          {/* RESOURCES */}
          <SectionTitle isCollapsed={collapsed.resources} onToggle={() => setCollapsed(prev => ({...prev, resources: !prev.resources}))}>Resources</SectionTitle>
          {!collapsed.resources && <div className="space-y-1 px-2 pb-2">
            <Item icon={<Icon.HubIcon className="h-4 w-4" />} label="Hubs" />
            <Item icon={<Icon.Grid className="h-4 w-4" />} label="Topics" />
            <Item icon={<Icon.Crown className="h-4 w-4" />} label="E-Commons Pro" badge="New" />
            <Item icon={<Icon.HelpCircle className="h-4 w-4" />} label="Help" />
            <Item icon={<Icon.BookOpen className="h-4 w-4" />} label="About" />
          </div>}

          {/* POLICIES */}
          <SectionTitle isCollapsed={collapsed.rules} onToggle={() => setCollapsed(prev => ({...prev, rules: !prev.rules}))}>Policies</SectionTitle>
          {!collapsed.rules && <div className="space-y-1 px-2 pb-2">
            <Item icon={<Icon.Scale className="h-4 w-4" />} label="E-Commons Rules" />
            <Item icon={<Icon.Gavel className="h-4 w-4" />} label="Privacy Policy" />
            <Item icon={<Icon.FileText className="h-4 w-4" />} label="User Agreement" />
            <Item icon={<Icon.Eye className="h-4 w-4" />} label="Accessibility" />
          </div>}
        </div>
      </div>
    </aside>
  )
}

export default LeftSidebar
