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

              {/* Quick Actions */}
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

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 mb-6">
                <button className="px-6 py-3 bg-white/90 text-gray-900 rounded-2xl font-semibold shadow-lg">
                  Dashboard
                </button>
                <button className="px-6 py-3 text-gray-600 hover:bg-white/50 rounded-2xl font-semibold transition-all duration-200">
                  Resources
                </button>
                <button className="px-6 py-3 text-gray-600 hover:bg-white/50 rounded-2xl font-semibold transition-all duration-200">
                  Grants
                </button>
                <button className="px-6 py-3 text-gray-600 hover:bg-white/50 rounded-2xl font-semibold transition-all duration-200">
                  Connections
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
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

                {/* Shared Resources */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Shared Resources</h3>
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                      Add Resource
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Icon.Database className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">STEM Education Grant Database</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Comprehensive database of STEM education funding opportunities</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">STEMGrants</span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Education</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Grant Opportunities */}
              <Card className="p-6 mt-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Grant Opportunities</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">NSF Education Innovation Grant</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Supporting innovative STEM education programs</p>
                      </div>
                      <button className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
                        Set Reminder
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium text-green-600">$50,000 - $200,000</span>
                      <span>Due: 2024-03-15</span>
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