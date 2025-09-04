"use client"

import Link from "next/link"
import { useState } from "react"

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <main style={{ backgroundColor: "#f7f8fa", minHeight: "100vh" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" href="/">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/erudyte-logo-dmm3SiboydR6bY9VBh0oBhFVLLmBhS.png"
              alt="Erudyte Commons"
              style={{ height: "40px" }}
            />
          </Link>
          <div className="navbar-nav ms-auto d-flex flex-row align-items-center gap-4">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/friends" className="nav-link active">
              Friends
            </Link>
            <Link href="/my-learning" className="nav-link">
              My Learning
            </Link>
            <Link href="/funding" className="nav-link">
              Funding
            </Link>
            <Link href="/webinars" className="nav-link">
              Webinars
            </Link>
            <Link href="/create" className="btn btn-primary rounded px-4">
              Create
            </Link>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-primary mb-3">Connect & Collaborate</h1>
          <p className="lead text-muted">Build meaningful connections with fellow educators worldwide</p>
        </div>

        <div className="row mb-5">
          <div className="col-lg-8 mx-auto">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex gap-3 mb-4">
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search educators by name, subject, or location..."
                    />
                  </div>
                  <button className="btn btn-primary">
                    <i className="bx bx-search"></i>
                  </button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  <button
                    className={`btn btn-sm ${activeTab === "all" ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                    onClick={() => setActiveTab("all")}
                  >
                    All Educators
                  </button>
                  <button
                    className={`btn btn-sm ${activeTab === "stem" ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                    onClick={() => setActiveTab("stem")}
                  >
                    STEM Teachers
                  </button>
                  <button
                    className={`btn btn-sm ${activeTab === "elementary" ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                    onClick={() => setActiveTab("elementary")}
                  >
                    Elementary
                  </button>
                  <button
                    className={`btn btn-sm ${activeTab === "secondary" ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                    onClick={() => setActiveTab("secondary")}
                  >
                    Secondary
                  </button>
                  <button
                    className={`btn btn-sm ${activeTab === "admin" ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                    onClick={() => setActiveTab("admin")}
                  >
                    Administrators
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {[
            {
              name: "Dr. Sarah Chen",
              role: "High School Chemistry Teacher",
              location: "San Francisco, CA",
              specialties: ["STEM Education", "Lab Safety", "AP Chemistry"],
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/25.jpg-NNceU41JDAw1lcsy0fme2emlzriQF6.jpeg",
              mutualConnections: 12,
            },
            {
              name: "Marcus Johnson",
              role: "Elementary Math Specialist",
              location: "Chicago, IL",
              specialties: ["Math Intervention", "Special Education", "Technology Integration"],
              image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14.jpg-ruy24.jpeg",
              mutualConnections: 8,
            },
            {
              name: "Prof. Elena Rodriguez",
              role: "Curriculum Director",
              location: "Austin, TX",
              specialties: ["Curriculum Design", "Teacher Training", "Educational Leadership"],
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/25.jpg-NNceU41JDAw1lcsy0fme2emlzriQF6.jpeg",
              mutualConnections: 15,
            },
            {
              name: "James Park",
              role: "Middle School Science Teacher",
              location: "Seattle, WA",
              specialties: ["Environmental Science", "Project-Based Learning", "Outdoor Education"],
              image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14.jpg-ruy24.jpeg",
              mutualConnections: 6,
            },
          ].map((educator, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={educator.image || "/placeholder.svg"}
                      alt={educator.name}
                      className="rounded-circle me-3"
                      width="60"
                      height="60"
                      style={{ objectFit: "cover" }}
                    />
                    <div>
                      <h5 className="mb-1">{educator.name}</h5>
                      <p className="text-muted small mb-0">{educator.role}</p>
                      <p className="text-muted small mb-0">
                        <i className="bx bx-map me-1"></i>
                        {educator.location}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex flex-wrap gap-1">
                      {educator.specialties.map((specialty, idx) => (
                        <span key={idx} className="badge bg-light text-dark small">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{educator.mutualConnections} mutual connections</small>
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="bx bx-message-dots"></i>
                      </button>
                      <button className="btn btn-primary btn-sm">Connect</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="py-5">
          <h3 className="h4 mb-4">Suggested Connections</h3>
          <div className="row g-3">
            {[
              "Dr. Amanda Foster - Special Education Coordinator",
              "Michael Thompson - Technology Integration Specialist",
              "Lisa Wang - ESL Program Director",
            ].map((suggestion, index) => (
              <div key={index} className="col-md-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="small">{suggestion}</span>
                      <button className="btn btn-outline-primary btn-sm">Connect</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
