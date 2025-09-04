"use client"

import Link from "next/link"
import { useState } from "react"

export default function FundingPage() {
  const [activeCategory, setActiveCategory] = useState("all")

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
            <Link href="/funding" className="nav-link active">
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
          <h1 className="display-5 fw-bold text-primary mb-3">Education Funding Opportunities</h1>
          <p className="lead text-muted">
            Discover grants, scholarships, and funding resources to support your educational initiatives
          </p>
        </div>

        <div className="row mb-5">
          <div className="col-lg-10 mx-auto">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Search funding opportunities..." />
                  </div>
                  <div className="col-md-3">
                    <select className="form-select">
                      <option>Amount Range</option>
                      <option>$1,000 - $5,000</option>
                      <option>$5,000 - $25,000</option>
                      <option>$25,000+</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select className="form-select">
                      <option>Deadline</option>
                      <option>Next 30 days</option>
                      <option>Next 3 months</option>
                      <option>Next 6 months</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-2">
                  <button
                    className={`btn btn-sm ${activeCategory === "all" ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                    onClick={() => setActiveCategory("all")}
                  >
                    All Opportunities
                  </button>
                  <button
                    className={`btn btn-sm ${activeCategory === "stem" ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                    onClick={() => setActiveCategory("stem")}
                  >
                    STEM Education
                  </button>
                  <button
                    className={`btn btn-sm ${activeCategory === "technology" ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                    onClick={() => setActiveCategory("technology")}
                  >
                    Technology
                  </button>
                  <button
                    className={`btn btn-sm ${activeCategory === "professional" ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                    onClick={() => setActiveCategory("professional")}
                  >
                    Professional Development
                  </button>
                  <button
                    className={`btn btn-sm ${activeCategory === "classroom" ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
                    onClick={() => setActiveCategory("classroom")}
                  >
                    Classroom Resources
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-5">
          {[
            {
              title: "STEM Innovation Grant",
              organization: "National Science Foundation",
              amount: "$50,000",
              deadline: "March 15, 2025",
              category: "STEM Education",
              description: "Support innovative STEM teaching methods and curriculum development in K-12 schools.",
              eligibility: "Public and private K-12 schools",
              status: "Open",
            },
            {
              title: "Technology Integration Fellowship",
              organization: "Gates Foundation",
              amount: "$25,000",
              deadline: "February 28, 2025",
              category: "Technology",
              description: "Fund technology integration projects that enhance student learning outcomes.",
              eligibility: "Individual educators and schools",
              status: "Open",
            },
            {
              title: "Professional Development Scholarship",
              organization: "Education Excellence Foundation",
              amount: "$5,000",
              deadline: "January 31, 2025",
              category: "Professional Development",
              description: "Support educators pursuing advanced certifications and training programs.",
              eligibility: "Licensed educators with 3+ years experience",
              status: "Closing Soon",
            },
            {
              title: "Classroom Innovation Fund",
              organization: "Local Education Partnership",
              amount: "$10,000",
              deadline: "April 30, 2025",
              category: "Classroom Resources",
              description: "Provide funding for innovative classroom projects and learning materials.",
              eligibility: "Teachers in Title I schools",
              status: "Open",
            },
            {
              title: "Diversity in STEM Initiative",
              organization: "STEM Equity Alliance",
              amount: "$75,000",
              deadline: "May 15, 2025",
              category: "STEM Education",
              description: "Support programs that increase diversity and inclusion in STEM education.",
              eligibility: "Schools with high minority enrollment",
              status: "Open",
            },
            {
              title: "Digital Learning Resources Grant",
              organization: "Tech for Education",
              amount: "$15,000",
              deadline: "March 1, 2025",
              category: "Technology",
              description: "Fund the acquisition of digital learning tools and educational software.",
              eligibility: "Public schools and nonprofits",
              status: "Open",
            },
          ].map((opportunity, index) => (
            <div key={index} className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="mb-1">{opportunity.title}</h5>
                      <p className="text-muted small mb-0">{opportunity.organization}</p>
                    </div>
                    <span className={`badge ${opportunity.status === "Closing Soon" ? "bg-warning" : "bg-success"}`}>
                      {opportunity.status}
                    </span>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <div className="text-center p-2 bg-light rounded">
                        <div className="fw-bold text-primary">{opportunity.amount}</div>
                        <small className="text-muted">Award Amount</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-center p-2 bg-light rounded">
                        <div className="fw-bold text-primary">{opportunity.deadline}</div>
                        <small className="text-muted">Deadline</small>
                      </div>
                    </div>
                  </div>

                  <span className="badge bg-light text-dark mb-3">{opportunity.category}</span>

                  <p className="text-muted small mb-3">{opportunity.description}</p>

                  <div className="mb-3">
                    <strong className="small">Eligibility:</strong>
                    <p className="text-muted small mb-0">{opportunity.eligibility}</p>
                  </div>

                  <div className="d-flex gap-2">
                    <button className="btn btn-primary flex-grow-1">Apply Now</button>
                    <button className="btn btn-outline-secondary">
                      <i className="bx bx-bookmark"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="py-5">
          <h3 className="h4 mb-4">Funding Resources & Tips</h3>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <i className="bx bx-file-blank display-4 text-primary mb-3"></i>
                  <h5>Grant Writing Guide</h5>
                  <p className="text-muted small">Learn how to write compelling grant proposals that get funded.</p>
                  <button className="btn btn-outline-primary btn-sm">Download Guide</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <i className="bx bx-calendar display-4 text-primary mb-3"></i>
                  <h5>Funding Calendar</h5>
                  <p className="text-muted small">Stay on top of important deadlines with our funding calendar.</p>
                  <button className="btn btn-outline-primary btn-sm">View Calendar</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <i className="bx bx-group display-4 text-primary mb-3"></i>
                  <h5>Success Stories</h5>
                  <p className="text-muted small">Read about educators who successfully secured funding.</p>
                  <button className="btn btn-outline-primary btn-sm">Read Stories</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
