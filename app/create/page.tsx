"use client"

import Link from "next/link"
import { useState } from "react"

export default function CreatePage() {
  const [contentType, setContentType] = useState("")

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
            <Link href="/webinars" className="nav-link">
              Webinars
            </Link>
            <Link href="/create" className="btn btn-primary rounded px-4 active">
              Create
            </Link>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-primary mb-3">Create & Share</h1>
          <p className="lead text-muted">Share your expertise and contribute to the educator community</p>
        </div>

        <div className="row mb-5">
          <div className="col-lg-8 mx-auto">
            <h3 className="h4 mb-4">What would you like to create?</h3>
            <div className="row g-4">
              {[
                {
                  type: "lesson-plan",
                  title: "Lesson Plan",
                  description: "Share detailed lesson plans with activities and assessments",
                  icon: "bx-book-content",
                  color: "primary",
                },
                {
                  type: "resource",
                  title: "Educational Resource",
                  description: "Upload worksheets, templates, or educational materials",
                  icon: "bx-file",
                  color: "success",
                },
                {
                  type: "video",
                  title: "Video Tutorial",
                  description: "Create instructional videos or classroom demonstrations",
                  icon: "bx-video",
                  color: "info",
                },
                {
                  type: "article",
                  title: "Article/Blog Post",
                  description: "Write about teaching strategies, experiences, or insights",
                  icon: "bx-edit",
                  color: "warning",
                },
                {
                  type: "webinar",
                  title: "Host a Webinar",
                  description: "Schedule and host live educational sessions",
                  icon: "bx-broadcast",
                  color: "danger",
                },
                {
                  type: "discussion",
                  title: "Start Discussion",
                  description: "Begin conversations about educational topics",
                  icon: "bx-chat",
                  color: "secondary",
                },
              ].map((item, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <div
                    className={`card border-0 shadow-sm h-100 ${contentType === item.type ? "border-primary" : ""}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setContentType(item.type)}
                  >
                    <div className="card-body p-4 text-center">
                      <i className={`bx ${item.icon} display-4 text-${item.color} mb-3`}></i>
                      <h5 className="mb-3">{item.title}</h5>
                      <p className="text-muted small">{item.description}</p>
                      {contentType === item.type && <button className="btn btn-primary btn-sm">Get Started</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {contentType && (
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="mb-4">
                    Create{" "}
                    {contentType === "lesson-plan"
                      ? "Lesson Plan"
                      : contentType === "resource"
                        ? "Educational Resource"
                        : contentType === "video"
                          ? "Video Tutorial"
                          : contentType === "article"
                            ? "Article"
                            : contentType === "webinar"
                              ? "Webinar"
                              : "Discussion"}
                  </h4>

                  <form>
                    <div className="mb-4">
                      <label className="form-label">Title *</label>
                      <input type="text" className="form-control" placeholder="Enter a descriptive title..." />
                    </div>

                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label">Subject Area</label>
                        <select className="form-select">
                          <option>Select subject...</option>
                          <option>Mathematics</option>
                          <option>Science</option>
                          <option>English Language Arts</option>
                          <option>Social Studies</option>
                          <option>Arts</option>
                          <option>Physical Education</option>
                          <option>Technology</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Grade Level</label>
                        <select className="form-select">
                          <option>Select grade level...</option>
                          <option>Pre-K</option>
                          <option>K-2</option>
                          <option>3-5</option>
                          <option>6-8</option>
                          <option>9-12</option>
                          <option>Higher Education</option>
                          <option>Adult Education</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Description *</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Provide a detailed description of your content..."
                      ></textarea>
                    </div>

                    {contentType === "lesson-plan" && (
                      <>
                        <div className="mb-4">
                          <label className="form-label">Learning Objectives</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            placeholder="List the key learning objectives..."
                          ></textarea>
                        </div>
                        <div className="mb-4">
                          <label className="form-label">Duration</label>
                          <input type="text" className="form-control" placeholder="e.g., 45 minutes, 2 class periods" />
                        </div>
                      </>
                    )}

                    {contentType === "resource" && (
                      <div className="mb-4">
                        <label className="form-label">Upload Files</label>
                        <input type="file" className="form-control" multiple />
                        <small className="text-muted">Supported formats: PDF, DOC, PPT, images</small>
                      </div>
                    )}

                    {contentType === "video" && (
                      <div className="mb-4">
                        <label className="form-label">Video URL or Upload</label>
                        <input type="url" className="form-control" placeholder="YouTube, Vimeo URL or upload file" />
                      </div>
                    )}

                    {contentType === "webinar" && (
                      <>
                        <div className="row g-3 mb-4">
                          <div className="col-md-6">
                            <label className="form-label">Date</label>
                            <input type="date" className="form-control" />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Time</label>
                            <input type="time" className="form-control" />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="form-label">Duration (minutes)</label>
                          <input type="number" className="form-control" placeholder="60" />
                        </div>
                      </>
                    )}

                    <div className="mb-4">
                      <label className="form-label">Tags</label>
                      <input type="text" className="form-control" placeholder="Add tags separated by commas..." />
                      <small className="text-muted">Help others find your content with relevant tags</small>
                    </div>

                    <div className="mb-4">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="sharePublic" />
                        <label className="form-check-label" htmlFor="sharePublic">
                          Share publicly with the Erudyte Commons community
                        </label>
                      </div>
                    </div>

                    <div className="d-flex gap-3">
                      <button type="submit" className="btn btn-primary">
                        {contentType === "webinar" ? "Schedule Webinar" : "Publish Content"}
                      </button>
                      <button type="button" className="btn btn-outline-secondary">
                        Save as Draft
                      </button>
                      <button type="button" className="btn btn-outline-secondary" onClick={() => setContentType("")}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {!contentType && (
          <section>
            <h3 className="h4 mb-4">Your Recent Creations</h3>
            <div className="row g-4">
              {[
                {
                  title: "Hands-on Chemistry Experiments",
                  type: "Lesson Plan",
                  date: "2 days ago",
                  views: 156,
                  likes: 23,
                },
                {
                  title: "Math Problem Solving Strategies",
                  type: "Article",
                  date: "1 week ago",
                  views: 342,
                  likes: 45,
                },
                {
                  title: "Classroom Management Tips",
                  type: "Video Tutorial",
                  date: "2 weeks ago",
                  views: 789,
                  likes: 67,
                },
              ].map((item, index) => (
                <div key={index} className="col-md-4">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <span className="badge bg-light text-dark">{item.type}</span>
                        <small className="text-muted">{item.date}</small>
                      </div>
                      <h6 className="mb-3">{item.title}</h6>
                      <div className="d-flex justify-content-between text-muted small">
                        <span>
                          <i className="bx bx-show me-1"></i>
                          {item.views} views
                        </span>
                        <span>
                          <i className="bx bx-heart me-1"></i>
                          {item.likes} likes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
