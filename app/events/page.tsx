"use client"

import Link from "next/link"

export default function EventsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f7f8fa" }}>
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
            <Link href="/events" className="nav-link active">
              Webinars
            </Link>
            <Link href="/post" className="btn btn-primary rounded px-4">
              Create
            </Link>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        {/* Search form */}
        <form className="input-group mb-4">
          <input type="text" placeholder="Search for an event..." className="form-control rounded pe-5" />
          <i
            className="bx bx-search position-absolute top-50 end-0 translate-middle-y me-3 fs-lg"
            style={{ zIndex: 5 }}
          ></i>
        </form>

        {/* Webinar Type Tabs */}
        <ul className="nav nav-tabs mb-4" role="tablist">
          <li className="nav-item">
            <button
              className="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#upcoming"
              type="button"
              role="tab"
            >
              Upcoming Webinars
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#past" type="button" role="tab">
              Past Webinars
            </button>
          </li>
        </ul>

        {/* Webinar Content */}
        <div className="tab-content">
          {/* Upcoming Webinars */}
          <div className="tab-pane fade show active" id="upcoming" role="tabpanel">
            <div className="row g-4">
              {/* Webinar 1 */}
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Erudyte%20Leadership%20Skills%20for%20Educators-ISJoKQlQ8YsLctmoimSuEfR5Gs5Lc0.png"
                        className="img-fluid rounded-start h-100"
                        style={{ objectFit: "cover", aspectRatio: "4/4" }}
                        alt="AI in Education"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <span className="badge bg-primary mb-2">Live Webinar</span>
                        <h5 className="card-title">Introduction to AI in Education</h5>
                        <p className="card-text text-muted">
                          Join us for an insightful session on how AI is transforming modern education.
                        </p>
                        <div className="mb-3">
                          <small className="text-muted">
                            <span className="me-3">Dec 15, 2023 - 2:00 PM EST</span>
                            <span>Duration: 1.5 hours</span>
                          </small>
                        </div>
                        <button className="btn btn-primary">Register Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Webinar 2 */}
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Erudyte%20Data-Driven%20Instruction-1UXP2EdwDMoE1zba844B3LXPIIlQ8U.png"
                        className="img-fluid rounded-start h-100"
                        style={{ objectFit: "cover", aspectRatio: "4/4" }}
                        alt="Digital Assessment"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <span className="badge bg-primary mb-2">Workshop</span>
                        <h5 className="card-title">Digital Assessment Strategies</h5>
                        <p className="card-text text-muted">
                          Interactive workshop on implementing effective digital assessment methods.
                        </p>
                        <div className="mb-3">
                          <small className="text-muted">
                            <span className="me-3">Dec 20, 2023 - 3:00 PM EST</span>
                            <span>Duration: 2 hours</span>
                          </small>
                        </div>
                        <button className="btn btn-primary">Register Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Past Webinars */}
          <div className="tab-pane fade" id="past" role="tabpanel">
            <div className="row g-4">
              {/* Past Webinar 1 */}
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5%20Edtech%20Trends%20that%20will%20shape%202025%20Data%20from%201400%2B%20Global%20Marketers.jpg-COY6VzbkAu5w3CYYr8tZ6pCNZDVSBM.jpeg"
                        className="img-fluid rounded-start h-100"
                        style={{ objectFit: "cover", aspectRatio: "4/4" }}
                        alt="EdTech Trends"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <span className="badge bg-secondary mb-2">Recorded</span>
                        <h5 className="card-title">Future of EdTech: 2024 Trends</h5>
                        <p className="card-text text-muted">
                          Expert discussion on upcoming educational technology trends and their impact.
                        </p>
                        <div className="mb-3">
                          <small className="text-muted">
                            <span className="me-3">Nov 30, 2023</span>
                            <span>Duration: 1 hour</span>
                          </small>
                        </div>
                        <button className="btn btn-secondary">Watch Recording</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Past Webinar 2 */}
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/collaborative%20Teaching%20Strategies-%20A%20World%20of%20Difference%20in%20Diverse%20Classrooms-psNNTIpGEz9KgUMuEAxQQMsaYUvxKM.png"
                        className="img-fluid rounded-start h-100"
                        style={{ objectFit: "cover", aspectRatio: "4/4" }}
                        alt="Inclusive Teaching"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <span className="badge bg-secondary mb-2">Recorded</span>
                        <h5 className="card-title">Inclusive Teaching Practices</h5>
                        <p className="card-text text-muted">
                          Learn effective strategies for creating inclusive learning environments.
                        </p>
                        <div className="mb-3">
                          <small className="text-muted">
                            <span className="me-3">Nov 15, 2023</span>
                            <span>Duration: 1.5 hours</span>
                          </small>
                        </div>
                        <button className="btn btn-secondary">Watch Recording</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Sidebar */}
        <div className="row mt-5">
          <div className="col-md-8">{/* Main content area */}</div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Categories</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-1">
                    <a href="#" className="nav-link py-1 px-0 active">
                      All topics <span className="text-muted ms-1">(48)</span>
                    </a>
                  </li>
                  <li className="nav-item mb-1">
                    <a href="#" className="nav-link py-1 px-0">
                      Digital <span className="text-muted ms-1">(12)</span>
                    </a>
                  </li>
                  <li className="nav-item mb-1">
                    <a href="#" className="nav-link py-1 px-0">
                      STEM Education <span className="text-muted ms-1">(8)</span>
                    </a>
                  </li>
                  <li className="nav-item mb-1">
                    <a href="#" className="nav-link py-1 px-0">
                      Assessment <span className="text-muted ms-1">(6)</span>
                    </a>
                  </li>
                  <li className="nav-item mb-1">
                    <a href="#" className="nav-link py-1 px-0">
                      Professional Development <span className="text-muted ms-1">(15)</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">Tags</h5>
                <div className="d-flex flex-wrap gap-2">
                  <a href="#" className="btn btn-outline-secondary btn-sm">
                    #education
                  </a>
                  <a href="#" className="btn btn-outline-secondary btn-sm">
                    #teaching
                  </a>
                  <a href="#" className="btn btn-outline-secondary btn-sm">
                    #STEM
                  </a>
                  <a href="#" className="btn btn-outline-secondary btn-sm">
                    #assessment
                  </a>
                  <a href="#" className="btn btn-outline-secondary btn-sm">
                    #technology
                  </a>
                  <a href="#" className="btn btn-outline-secondary btn-sm">
                    #inclusive
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
