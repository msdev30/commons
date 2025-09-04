"use client"

import Link from "next/link"

export default function PostPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f7f8fa" }}>
      {/* Navigation */}
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
            <Link href="/people" className="nav-link">
              Friends
            </Link>
            <Link href="/library" className="nav-link">
              My Learning
            </Link>
            <Link href="/funding-opportunities" className="nav-link">
              Funding
            </Link>
            <Link href="/events" className="nav-link">
              Webinars
            </Link>
            <Link href="/post" className="btn btn-primary rounded px-4 active">
              Create
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="h2 mb-4">Create New Content</h1>
            <p className="text-muted mb-5">Share your knowledge and resources with the Erudyte Commons community.</p>

            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <form>
                  <div className="mb-4">
                    <label className="form-label">Content Type</label>
                    <select className="form-select">
                      <option>Select content type...</option>
                      <option>Article</option>
                      <option>Lesson Plan</option>
                      <option>Resource</option>
                      <option>Discussion</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" placeholder="Enter a descriptive title..." />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows={4} placeholder="Describe your content..."></textarea>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Tags</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add tags (e.g., STEM, Elementary, Assessment)"
                    />
                  </div>

                  <div className="d-flex gap-3">
                    <button type="submit" className="btn btn-primary">
                      Publish
                    </button>
                    <button type="button" className="btn btn-outline-secondary">
                      Save Draft
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
