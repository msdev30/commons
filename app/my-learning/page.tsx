"use client"

import Link from "next/link"
import { useState } from "react"

export default function MyLearningPage() {
  const [activeTab, setActiveTab] = useState("in-progress")

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
            <Link href="/my-learning" className="nav-link active">
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
        <div className="row mb-5">
          <div className="col-lg-8">
            <h1 className="display-5 fw-bold text-primary mb-3">My Learning Journey</h1>
            <p className="lead text-muted">Track your professional development and continue growing as an educator</p>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <h3 className="text-primary mb-1">73%</h3>
                <p className="text-muted small mb-0">Overall Progress</p>
                <div className="progress mt-2" style={{ height: "6px" }}>
                  <div className="progress-bar" style={{ width: "73%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm mb-5">
          <div className="card-body p-4">
            <div className="d-flex flex-wrap gap-2 mb-4">
              <button
                className={`btn ${activeTab === "in-progress" ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                onClick={() => setActiveTab("in-progress")}
              >
                In Progress (3)
              </button>
              <button
                className={`btn ${activeTab === "completed" ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                onClick={() => setActiveTab("completed")}
              >
                Completed (12)
              </button>
              <button
                className={`btn ${activeTab === "saved" ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                onClick={() => setActiveTab("saved")}
              >
                Saved for Later (8)
              </button>
              <button
                className={`btn ${activeTab === "certificates" ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                onClick={() => setActiveTab("certificates")}
              >
                Certificates (4)
              </button>
            </div>

            {activeTab === "in-progress" && (
              <div className="row g-4">
                {[
                  {
                    title: "SEL for Educators",
                    progress: 65,
                    timeLeft: "8 min left",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Erudyte%20SEL%20for%20Educators-Nl72PX1NC2LrN6KbeAW470YwgJONyF.png",
                  },
                  {
                    title: "Data-Driven Instruction",
                    progress: 40,
                    timeLeft: "12 min left",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Erudyte%20Data-Driven%20Instruction-1UXP2EdwDMoE1zba844B3LXPIIlQ8U.png",
                  },
                  {
                    title: "Leadership Skills for Educators",
                    progress: 90,
                    timeLeft: "2 min left",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Erudyte%20Leadership%20Skills%20for%20Educators-ISJoKQlQ8YsLctmoimSuEfR5Gs5Lc0.png",
                  },
                ].map((course, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm h-100">
                      <img
                        src={course.image || "/placeholder.svg"}
                        className="card-img-top"
                        alt={course.title}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body p-4">
                        <h5 className="mb-3">{course.title}</h5>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="small text-muted">Progress</span>
                            <span className="small text-muted">{course.progress}%</span>
                          </div>
                          <div className="progress" style={{ height: "6px" }}>
                            <div className="progress-bar" style={{ width: `${course.progress}%` }}></div>
                          </div>
                        </div>
                        <p className="text-muted small mb-3">{course.timeLeft}</p>
                        <button className="btn btn-primary w-100">Continue Learning</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "completed" && (
              <div className="text-center py-5">
                <i className="bx bx-check-circle display-1 text-success mb-3"></i>
                <h4>Congratulations!</h4>
                <p className="text-muted">You've completed 12 courses and earned valuable skills.</p>
                <Link href="/" className="btn btn-primary">
                  Explore More Courses
                </Link>
              </div>
            )}

            {activeTab === "saved" && (
              <div className="text-center py-5">
                <i className="bx bx-bookmark display-1 text-primary mb-3"></i>
                <h4>Saved for Later</h4>
                <p className="text-muted">8 courses waiting for you to dive in when you're ready.</p>
              </div>
            )}

            {activeTab === "certificates" && (
              <div className="row g-4">
                {[
                  "Social-Emotional Learning Specialist",
                  "STEM Education Leadership",
                  "Differentiated Instruction Expert",
                  "Educational Technology Integration",
                ].map((cert, index) => (
                  <div key={index} className="col-md-6">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4 text-center">
                        <i className="bx bx-award display-4 text-warning mb-3"></i>
                        <h5>{cert}</h5>
                        <p className="text-muted small">Earned on {new Date(2024, index, 15).toLocaleDateString()}</p>
                        <button className="btn btn-outline-primary btn-sm">Download Certificate</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <section>
          <h3 className="h4 mb-4">Recommended for You</h3>
          <div className="row g-4">
            {[
              {
                title: "Culturally Responsive Teaching",
                duration: "14 min",
                level: "Intermediate",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/collaborative%20Teaching%20Strategies-%20A%20World%20of%20Difference%20in%20Diverse%20Classrooms-kKsbfJQvYGJhJhJhJhJhJhJhJhJh.png",
              },
              {
                title: "Assessment Strategies",
                duration: "16 min",
                level: "Advanced",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/How%20to%20Create%20and%20Assign%20Quick%20Assessments%20with%20Erudyte-LIpSUBnYKO14hogvBX0BdBovEO20yW.png",
              },
            ].map((course, index) => (
              <div key={index} className="col-md-6">
                <div className="card border-0 shadow-sm">
                  <div className="row g-0">
                    <div className="col-4">
                      <img
                        src={course.image || "/placeholder.svg"}
                        className="img-fluid rounded-start h-100"
                        alt={course.title}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="col-8">
                      <div className="card-body p-4">
                        <h6 className="mb-2">{course.title}</h6>
                        <div className="d-flex gap-3 text-muted small mb-3">
                          <span>
                            <i className="bx bx-time"></i> {course.duration}
                          </span>
                          <span>
                            <i className="bx bx-bar-chart"></i> {course.level}
                          </span>
                        </div>
                        <button className="btn btn-primary btn-sm">Start Course</button>
                      </div>
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
