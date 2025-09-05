"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Default to logged in to bypass authentication

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white border-b border-gray-100 shadow-sm sticky-top">
      <div className="container-fluid px-6">
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/erudyte-logo-dmm3SiboydR6bY9VBh0oBhFVLLmBhS.png"
            alt="Erudyte Commons"
            className="h-10"
          />
        </Link>

        <div className="navbar-nav ms-auto d-flex flex-row align-items-center gap-8">
          <Link href="/" className="nav-link text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Home
          </Link>
          <Link href="/hub" className="nav-link text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Community
          </Link>
          <Link href="/library" className="nav-link text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Library
          </Link>
          <Link
            href="/funding"
            className="nav-link text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Funding
          </Link>
          <Link href="/events" className="nav-link text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Events
          </Link>

          <Link
            href="/post"
            className="btn btn-primary px-6 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all"
            style={{ backgroundColor: "#6366f1", borderColor: "#6366f1" }}
          >
            Create
          </Link>

          {isLoggedIn && (
            <div className="dropdown">
              <button
                className="d-flex align-items-center gap-3 bg-transparent border-0 text-decoration-none p-2 rounded-lg hover:bg-gray-50 transition-colors"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/25.jpg-NNceU41JDAw1lcsy0fme2emlzriQF6.jpeg"
                  className="rounded-circle"
                  width="40"
                  height="40"
                  alt="User Profile"
                  style={{ objectFit: "cover" }}
                />
                <div className="text-start">
                  <div className="text-gray-500 text-sm">Hello,</div>
                  <div className="text-gray-900 font-semibold">Development Admin</div>
                </div>
                <i className="bx bx-chevron-down text-gray-400"></i>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end bg-white border border-gray-200 rounded-xl shadow-lg mt-2"
                style={{ minWidth: "220px" }}
              >
                <li>
                  <Link
                    className="dropdown-item py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors d-flex align-items-center"
                    href="/account-details"
                  >
                    <i className="bx bx-user me-3 text-gray-400"></i>
                    Account Details
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors d-flex align-items-center"
                    href="/account-collections"
                  >
                    <i className="bx bx-collection me-3 text-gray-400"></i>
                    Collections
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors d-flex align-items-center"
                    href="/account-notifications"
                  >
                    <i className="bx bx-bell me-3 text-gray-400"></i>
                    Notifications
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors d-flex align-items-center"
                    href="/account-saved-items"
                  >
                    <i className="bx bx-bookmark me-3 text-gray-400"></i>
                    Saved Items
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors d-flex align-items-center"
                    href="/account-security"
                  >
                    <i className="bx bx-shield me-3 text-gray-400"></i>
                    Security
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider my-2" />
                </li>
                <li>
                  <Link
                    className="dropdown-item py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors d-flex align-items-center"
                    href="/messages"
                  >
                    <i className="bx bx-message me-3 text-gray-400"></i>
                    Messages
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider my-2" />
                </li>
                <li>
                  <button
                    className="dropdown-item py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors text-red-600 d-flex align-items-center w-100"
                    onClick={handleLogout}
                  >
                    <i className="bx bx-log-out me-3"></i>
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
