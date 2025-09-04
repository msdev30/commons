"use client"

import Link from "next/link"
import { useState } from "react"

export default function WebinarsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

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
            <Link href="/friends" className="nav-link">
              Friends
            </Link>
            <Link href="/my-learning" className="nav-link">
              My Learning
            </Link>
            <Link href="/funding" className="nav-link">
              Funding
            </Link>
            <Link href="/webinars" className="nav-link active">
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
          <h1 className="display-5 fw-bold text-primary mb-3">Professional Development Webinars</h1>
          <p className="lead text-muted">Join live sessions with education experts and connect with peers worldwide</p>
        </div>

        <div className="card border-0 shadow-sm mb-5">
          <div className="card-body p-4">
            <div className="d-flex flex-wrap gap-2 mb-4">
              <button
                className={`btn ${activeTab === "upcoming" ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming Webinars
              </button>
              <button
                className={`btn ${activeTab === "recorded" ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                onClick={() => setActiveTab("recorded")}
              >
                Recorded Sessions
              </button>
              <button
                className={`btn ${activeTab === "my-webinars" ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                onClick={() => setActiveTab("my-webinars")}
              >
                My Registered Webinars
              </button>
            </div>

            {activeTab === "upcoming" && (
              <div className="row g-4">
                {[
                  {
                    title: "AI in the Classroom: Practical Applications for 2025",
                    presenter: "Dr. Sarah Mitchell",
                    date: "January 28, 2025",
                    time: "3:00 PM EST",
                    duration: "60 minutes",
                    attendees: 1247,
                    description:
                      "Explore practical ways to integrate AI tools into your teaching practice while maintaining pedagogical best practices.",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5%20EdTech%20Trends%20that%20will%20Shape%202025-4DUGVE0yUecssrnQu4pBuA8Wjeq74V.png",
                  },
                  {
                    title: "Building Inclusive STEM Classrooms",
                    presenter: "Prof. Marcus Johnson",
                    date: "February 5, 2025",
                    time: "4:00 PM EST",
                    duration: "90 minutes",
                    attendees: 892,
                    description:
                      "Learn strategies to create welcoming STEM environments for students from all backgrounds and abilities.",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Erudyte%20collaborative%20guide-z95vuSNHwMOm8jTQO47T1wvRFSG9vC.png",
                  },
                  {
                    title: "Social-Emotional Learning Implementation",
                    presenter: "Dr. Elena Rodriguez",
                    date: "February 12, 2025",
                    time: "2:00 PM EST",
                    duration: "75 minutes",
                    attendees: 1156,
                    description:
                      "Practical strategies for implementing SEL programs that support student well-being and academic success.",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Culturally%20Relevancy%20SEL%20Practices-nm6UZCfVgaDLEN290T2YeD6OR4OnQM.png",
                  },
                ].map((webinar, index) => (
                  <div key={index} className="col-lg-6">
                    <div className="card border-0 shadow-sm h-100">
                      <img
                        src={webinar.image || "/placeholder.svg"}
                        className="card-img-top"
                        alt={webinar.title}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <span className="badge bg-success">Live</span>
                          <small className="text-muted">{webinar.attendees} registered</small>
                        </div>

                        <h5 className="mb-3">{webinar.title}</h5>
                        <p className="text-muted small mb-3">{webinar.description}</p>

                        <div className="row g-2 mb-3">
                          <div className="col-6">
                            <div className="d-flex align-items-center gap-2 text-muted small">
                              <i className="bx bx-user"></i>
                              <span>{webinar.presenter}</span>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="d-flex align-items-center gap-2 text-muted small">
                              <i className="bx bx-time"></i>
                              <span>{webinar.duration}</span>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="d-flex align-items-center gap-2 text-muted small">
                              <i className="bx bx-calendar"></i>
                              <span>{webinar.date}</span>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="d-flex align-items-center gap-2 text-muted small">
                              <i className="bx bx-time-five"></i>
                              <span>{webinar.time}</span>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex gap-2">
                          <button className="btn btn-primary flex-grow-1">Register Now</button>
                          <button className="btn btn-outline-secondary">
                            <i className="bx bx-calendar-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "recorded" && (
              <div className="row g-4">
                {[
                  {
                    title: "Differentiated Instruction Strategies",
                    presenter: "Dr. Amanda Foster",
                    recordedDate: "December 15, 2024",
                    views: 3421,
                    duration: "85 minutes",
                    rating: 4.8,
                  },
                  {
                    title: "Technology Integration Best Practices",
                    presenter: "Michael Chen",
                    recordedDate: "November 28, 2024",
                    views: 2156,
                    duration: "70 minutes",
                    rating: 4.6,
                  },
                  {
                    title: "Assessment in the Digital Age",
                    presenter: "Prof. Lisa Wang",
                    recordedDate: "November 10, 2024",
                    views: 1987,
                    duration: "60 minutes",
                    rating: 4.9,
                  },
                ].map((webinar, index) => (
                  <div key={index} className="col-lg-4">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <span className="badge bg-secondary">Recorded</span>
                          <div className="d-flex align-items-center gap-1 text-warning">
                            <i className="bx bx-star"></i>
                            <small>{webinar.rating}</small>
                          </div>
                        </div>

                        <h6 className="mb-3">{webinar.title}</h6>

                        <div className="mb-3">
                          <div className="d-flex align-items-center gap-2 text-muted small mb-2">
                            <i className="bx bx-user"></i>
                            <span>{webinar.presenter}</span>
                          </div>
                          <div className="d-flex align-items-center gap-2 text-muted small mb-2">
                            <i className="bx bx-time"></i>
                            <span>{webinar.duration}</span>
                          </div>
                          <div className="d-flex align-items-center gap-2 text-muted small">
                            <i className="bx bx-show"></i>
                            <span>{webinar.views} views</span>
                          </div>
                        </div>

                        <button className="btn btn-primary w-100">
                          <i className="bx bx-play me-2"></i>
                          Watch Recording
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "my-webinars" && (
              <div className="text-center py-5">
                <i className="bx bx-calendar-check display-1 text-primary mb-3"></i>
                <h4>Your Registered Webinars</h4>
                <p className="text-muted mb-4">You have 2 upcoming webinars registered.</p>
                <div className="row g-3 justify-content-center">
                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-3">
                        <h6>AI in the Classroom</h6>
                        <small className="text-muted">January 28, 2025 at 3:00 PM EST</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-3">
                        <h6>Building Inclusive STEM Classrooms</h6>
                        <small className="text-muted">February 5, 2025 at 4:00 PM EST</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <section>
          <h3 className="h4 mb-4">Featured Speakers</h3>
          <div className="row g-4">
            {[
              {
                name: "Dr. Sarah Mitchell",
                title: "AI Education Researcher",
                bio: "Leading expert in educational technology and AI integration",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/25.jpg-NNceU41JDAw1lcsy0fme2emlzriQF6.jpeg",
              },
              {
                name: "Prof. Marcus Johnson",
                title: "STEM Education Specialist",
                bio: "Advocate for inclusive STEM education practices",
                image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14.jpg-ruy24.jpeg",
              },
              {
                name: "Dr. Elena Rodriguez",
                title: "SEL Implementation Expert",
                bio: "Pioneer in social-emotional learning program development",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/25.jpg-NNceU41JDAw1lcsy0fme2emlzriQF6.jpeg",
              },
            ].map((speaker, index) => (
              <div key={index} className="col-md-4">
                <div className="card border-0 shadow-sm text-center">
                  <div className="card-body p-4">
                    <img
                      src={speaker.image || "/placeholder.svg"}
                      alt={speaker.name}
                      className="rounded-circle mb-3"
                      width="80"
                      height="80"
                      style={{ objectFit: "cover" }}
                    />
                    <h5>{speaker.name}</h5>
                    <p className="text-primary small mb-2">{speaker.title}</p>
                    <p className="text-muted small">{speaker.bio}</p>
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
