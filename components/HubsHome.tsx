"use client"
import * as React from "react"
import { Icon } from "@/components/icons"
import LeftSidebar from "@/components/LeftSidebar"
import ModernCommunityPage from "@/components/CommunityPage"
import Navigation from "@/components/Navigation"
import { CommentSection } from "@/components/CommentSection"

/* =========================
   Types & Interfaces
========================= */
type MenuKey = "lounge" | "base" | "trending" | "explore" | "all"
interface User {
  id: string
  name: string
  avatar: string
  headline?: string
  verified?: boolean
}

interface Resource {
  id: string
  title: string
  description: string
  url: string
  category: string
  tags: string[]
  author: User
  createdAt: string
}

interface Grant {
  id: string
  title: string
  amount: string
  deadline: string
  description: string
  eligibility: string[]
}

interface Hub {
  id: string
  name: string
  description: string
  members: number
  isOwner: boolean
  color: string
}

/* =========================
   Mock Data
========================= */
const currentUser: User = {
  id: "u0",
  name: "Sam Wane",
  avatar: "/avatar/02.jpg",
  headline: "Founder · Grady Bunch",
  verified: true,
}

const mockResources: Resource[] = [
  {
    id: "r1",
    title: "STEM Education Grant Database",
    description: "Comprehensive database of STEM education funding opportunities",
    url: "https://example.com/stem-grants",
    category: "Funding",
    tags: ["STEM", "Grants", "Education"],
    author: currentUser,
    createdAt: new Date().toISOString()
  }
]

const mockGrants: Grant[] = [
  {
    id: "g1",
    title: "NSF Education Innovation Grant",
    amount: "$50,000 - $200,000",
    deadline: "2024-03-15",
    description: "Supporting innovative STEM education programs",
    eligibility: ["K-12 Schools", "Universities", "Non-profits"]
  }
]

/* =========================
   Components
========================= */
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/5 ${className}`}>
    {children}
  </div>
)

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ 
  isOpen, onClose, title, children 
}) => {
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Icon.Plus className="h-5 w-5 rotate-45" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

const ShareResourceModal: React.FC<{ isOpen: boolean; onClose: () => void; resource?: Resource }> = ({ 
  isOpen, onClose, resource 
}) => {
  const [shareMethod, setShareMethod] = React.useState<'app' | 'email'>('app')
  const [recipients, setRecipients] = React.useState('')
  const [message, setMessage] = React.useState('')

  const handleShare = () => {
    console.log('Sharing resource:', { resource, shareMethod, recipients, message })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Resource">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Share Method</label>
          <div className="flex gap-4">
            <button
              onClick={() => setShareMethod('app')}
              className={`px-4 py-2 rounded-lg ${shareMethod === 'app' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100'}`}
            >
              In-App
            </button>
            <button
              onClick={() => setShareMethod('email')}
              className={`px-4 py-2 rounded-lg ${shareMethod === 'email' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100'}`}
            >
              Email
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            {shareMethod === 'app' ? 'Select Friends' : 'Email Addresses'}
          </label>
          <input
            type="text"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            placeholder={shareMethod === 'app' ? 'Search friends...' : 'email1@example.com, email2@example.com'}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Message (Optional)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a personal message..."
            className="w-full p-3 border rounded-lg h-24 resize-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <button
          onClick={handleShare}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
        >
          Share Resource
        </button>
      </div>
    </Modal>
  )
}

const CreateHubModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [hubData, setHubData] = React.useState({
    name: '',
    description: '',
    category: '',
    privacy: 'public' as 'public' | 'private',
    color: 'from-purple-500 to-pink-500'
  })

  const handleCreate = () => {
    console.log('Creating hub:', hubData)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Hub">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Hub Name</label>
          <input
            type="text"
            value={hubData.name}
            onChange={(e) => setHubData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter hub name..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={hubData.description}
            onChange={(e) => setHubData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your hub..."
            className="w-full p-3 border rounded-lg h-24 resize-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={hubData.category}
            onChange={(e) => setHubData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select category...</option>
            <option value="education">Education</option>
            <option value="stem">STEM</option>
            <option value="language">Language Learning</option>
            <option value="special-ed">Special Education</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Privacy</label>
          <div className="flex gap-4">
            <button
              onClick={() => setHubData(prev => ({ ...prev, privacy: 'public' }))}
              className={`px-4 py-2 rounded-lg ${hubData.privacy === 'public' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100'}`}
            >
              Public
            </button>
            <button
              onClick={() => setHubData(prev => ({ ...prev, privacy: 'private' }))}
              className={`px-4 py-2 rounded-lg ${hubData.privacy === 'private' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100'}`}
            >
              Private
            </button>
          </div>
        </div>
        
        <button
          onClick={handleCreate}
          disabled={!hubData.name || !hubData.description}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          Create Hub
        </button>
      </div>
    </Modal>
  )
}

const CreatePostModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [postData, setPostData] = React.useState({
    content: '',
    visibility: 'public' as 'public' | 'friends' | 'selected' | 'private',
    attachments: [] as string[],
    tags: [] as string[]
  })

  const handlePublish = () => {
    console.log('Publishing post:', postData)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Post">
      <div className="space-y-4">
        <textarea
          value={postData.content}
          onChange={(e) => setPostData(prev => ({ ...prev, content: e.target.value }))}
          placeholder="What's on your mind?"
          className="w-full p-4 border rounded-lg h-32 resize-none focus:ring-2 focus:ring-purple-500"
        />
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Icon.Image className="h-4 w-4" />
            Photo
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Icon.Video className="h-4 w-4" />
            Video
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Icon.BarChart className="h-4 w-4" />
            Poll
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Visibility</label>
          <select
            value={postData.visibility}
            onChange={(e) => setPostData(prev => ({ ...prev, visibility: e.target.value as any }))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="public">Public</option>
            <option value="friends">Friends</option>
            <option value="selected">Selected</option>
            <option value="private">Private</option>
          </select>
        </div>
        
        <button
          onClick={handlePublish}
          disabled={!postData.content.trim()}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          Publish Post
        </button>
      </div>
    </Modal>
  )
}

const AddResourceModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [resourceData, setResourceData] = React.useState({
    title: '',
    description: '',
    url: '',
    category: '',
    tags: ''
  })

  const handleAdd = () => {
    console.log('Adding resource:', resourceData)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Resource">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={resourceData.title}
            onChange={(e) => setResourceData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={resourceData.description}
            onChange={(e) => setResourceData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full p-3 border rounded-lg h-24 resize-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">URL</label>
          <input
            type="url"
            value={resourceData.url}
            onChange={(e) => setResourceData(prev => ({ ...prev, url: e.target.value }))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={resourceData.category}
            onChange={(e) => setResourceData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select category...</option>
            <option value="funding">Funding</option>
            <option value="tools">Tools</option>
            <option value="research">Research</option>
            <option value="curriculum">Curriculum</option>
          </select>
        </div>
        
        <button
          onClick={handleAdd}
          disabled={!resourceData.title || !resourceData.description}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          Add Resource
        </button>
      </div>
    </Modal>
  )
}

/* =========================
   Main Hub Page
========================= */
export default function HubPage() {
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'resources' | 'grants' | 'connections'>('dashboard')
  const [activeMenuKey, setActiveMenuKey] = React.useState<MenuKey>("lounge")
  const [modals, setModals] = React.useState({
    shareResource: false,
    createHub: false,
    createPost: false,
    addResource: false,
    findFriends: false
  })

  const openModal = (modal: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modal]: true }))
  }

  const closeModal = (modal: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modal]: false }))
  }

  const handleNavigate = (key: MenuKey) => {
    setActiveMenuKey(key)
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/30 dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {(LeftSidebar as any)({ 
            activeKey: activeMenuKey, 
            onNavigate: handleNavigate,
            onCreateHub: () => openModal('createHub'),
            onManageHub: () => openModal('createHub')
          })}
          
          {/* Main Content */}
          <main className="col-span-12 lg:col-span-9">
            {activeMenuKey === "lounge" ? (
              <ModernCommunityPage />
            ) : (
              <>
                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Hub Dashboard</h1>
                  <p className="text-gray-600 dark:text-gray-300">Manage your educational community and resources</p>
                </div>

            {/* Quick Actions */}
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => openModal('createPost')}
                  className="flex flex-col items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                >
                  <Icon.Plus className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Create Post</span>
                </button>
                
                <button
                  onClick={() => openModal('createHub')}
                  className="flex flex-col items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <Icon.PlusCircle className="h-8 w-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Create Hub</span>
                </button>
                
                <button
                  onClick={() => openModal('addResource')}
                  className="flex flex-col items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                >
                  <Icon.BookOpen className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Add Resource</span>
                </button>
                
                <button
                  onClick={() => openModal('findFriends')}
                  className="flex flex-col items-center p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
                >
                  <Icon.UserPlus className="h-8 w-8 text-orange-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Find Friends</span>
                </button>
              </div>
            </Card>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6">
              {[
                { key: 'dashboard', label: 'Dashboard', icon: Icon.Home },
                { key: 'resources', label: 'Resources', icon: Icon.BookOpen },
                { key: 'grants', label: 'Grants', icon: Icon.Award },
                { key: 'connections', label: 'Connections', icon: Icon.Users }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                    activeTab === tab.key ? 'bg-white/90 text-gray-900 shadow-lg' : 'text-gray-600 hover:bg-white/50'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Icon.Users className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">New member joined STEM Teachers Network</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Icon.Award className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">New grant opportunity available</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Shared Resources</h3>
                    <button
                      onClick={() => openModal('addResource')}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Add Resource
                    </button>
                  </div>
                  <div className="space-y-4">
                    {mockResources.map((resource) => (
                      <div key={resource.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{resource.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                            <div className="flex gap-2 mt-2">
                              {resource.tags.map((tag) => (
                                <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => openModal('shareResource')}
                            className="ml-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                          >
                            <Icon.Share className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'grants' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">Grant Opportunities</h3>
                  <div className="space-y-4">
                    {mockGrants.map((grant) => (
                      <div key={grant.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{grant.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{grant.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <span className="text-green-600 font-medium">{grant.amount}</span>
                              <span className="text-red-600">Due: {grant.deadline}</span>
                            </div>
                          </div>
                          <button className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200">
                            Set Reminder
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Modals */}
      <ShareResourceModal 
        isOpen={modals.shareResource} 
        onClose={() => closeModal('shareResource')} 
      />
      <CreateHubModal 
        isOpen={modals.createHub} 
        onClose={() => closeModal('createHub')} 
      />
      <CreatePostModal 
        isOpen={modals.createPost} 
        onClose={() => closeModal('createPost')} 
      />
      <AddResourceModal 
        isOpen={modals.addResource} 
        onClose={() => closeModal('addResource')} 
      />
    </div>
    </>
  )
}