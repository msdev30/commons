"use client"
import * as React from "react"
import { Icon } from "@/components/icons"
import LeftSidebar from "@/components/LeftSidebar"
import Navigation from "@/components/Navigation"

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-xl shadow-black/5 ${className}`}>
    {children}
  </div>
)

export default function BasePage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/30 dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-12 gap-8">
            <LeftSidebar />
            
            <main className="col-span-12 lg:col-span-9">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Hub Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300">Manage your educational community and resources</p>
              </div>

              <Card className="p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                    <Icon.Plus className="h-8 w-8 text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Create Post</span>
                  </button>
                  
                  <button className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    <Icon.PlusCircle className="h-8 w-8 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Create Hub</span>
                  </button>
                  
                  <button className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                    <Icon.BookOpen className="h-8 w-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Add Resource</span>
                  </button>
                  
                  <button className="flex flex-col items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
                    <Icon.UserPlus className="h-8 w-8 text-orange-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Find Friends</span>
                  </button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Icon.Users className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">New member joined STEM Teachers Network</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Icon.Award className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">New grant opportunity available</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}