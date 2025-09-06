"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Navigation from "@/components/Navigation"

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("SEL for Educators")

  useEffect(() => {
    const initSwiper = () => {
      if (typeof window !== "undefined" && (window as any).Swiper) {
        // Primary video rail
        ;new (window as any).Swiper(".video-swiper", {
          slidesPerView: 1,
          spaceBetween: 24,
          navigation: {
            nextEl: ".video-swiper-button-next",
            prevEl: ".video-swiper-button-prev",
          },
          pagination: {
            el: ".video-swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
          },
        })
      }
    }

    const t = setInterval(() => {
      if (typeof window !== "undefined" && (window as any).Swiper) {
        initSwiper()
        clearInterval(t)
      }
    }, 120)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="page-wrapper bg-background min-h-screen">
        {/* Top Nav */}
        <Navigation />

        {/* HERO */}
        <section
          className="position-relative overflow-hidden border-bottom"
          style={{ background: "linear-gradient(135deg,var(--bs-body-bg) 0%, rgba(108,22,118,.06) 100%)" }}
        >
          <div className="container py-6 py-lg-8">
            <div className="row align-items-center g-5">
              <div className="col-lg-7">
                {/* Search Bar */}
                <div className="d-flex shadow-sm rounded-3 overflow-hidden bg-white border">
                  <select
                    className="form-select border-0 bg-body-tertiary fw-medium"
                    style={{ maxWidth: 180 }}
                    aria-label="Search category"
                  >
                    <option value="all">All</option>
                    <option value="funding">Funding</option>
                    <option value="courses">Courses</option>
                    <option value="certificates">Certificates</option>
                    <option value="videos">Videos</option>
                    <option value="webinars">Webinars</option>
                    <option value="blogs">Blogs</option>
                    <option value="ebooks">Ebooks</option>
                    <option value="kits">Kits</option>
                  </select>
                  <div className="position-relative flex-grow-1">
                    <input
                      className="form-control form-control-lg border-0 pe-5"
                      placeholder="Search for courses, videos, grants…"
                    />
                    <button
                      className="position-absolute top-50 end-0 translate-middle-y btn btn-link text-muted pe-3"
                      aria-label="Search"
                    >
                      <i className="bx bx-search fs-3"></i>
                    </button>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="d-flex flex-wrap gap-2 mt-3">
                  {["Funding", "Certificates", "Videos", "Webinars", "Blogs"].map((t) => (
                    <Link
                      key={t}
                      href={`/${t.toLowerCase()}`}
                      className="btn btn-sm btn-outline-secondary rounded-pill"
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Hero Feature Card */}
              <div className="col-lg-5">
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden h-100">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%202025%20State%20of%20EdTech%20%26%20Learning%20Trends%20Report%20wideimage-kNJRdgIvWjl5wESnCHrYwZZ6ZyoqDF.png"
                    alt="The 2025 State of EdTech & Learning Trends Report"
                    className="w-100"
                    style={{ objectFit: "cover", height: 260 }}
                  />
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge bg-info-subtle text-info">Featured</span>
                      <span className="text-muted small">Updated Jun 26, 2024</span>
                    </div>
                    <Link href="/library-page" className="text-decoration-none">
                      <h3 className="h4 fw-bold mb-2">The 2025 State of EdTech & Learning Trends Report</h3>
                    </Link>
                    <p className="text-muted mb-3">
                      Data from 1,400+ global educators and leaders on what actually moves the needle this year.
                    </p>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/25.jpg-NNceU41JDAw1lcsy0fme2emlzriQF6.jpeg"
                        className="rounded-circle"
                        width={44}
                        height={44}
                        alt="Author"
                      />
                      <div className="small">
                        <div className="fw-semibold">Maxwell Iskiev</div>
                        <div className="text-muted">Senior Education Researcher</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECOMMENDED / SIDEBAR LAYOUT */}
        <section className="container pt-5 py-lg-8">
          <div className="row g-4 align-items-stretch">
            {/* Main column */}
            <div className="col-lg-8">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h2 className="h3 fw-bold mb-0">Recommended for you</h2>
                <Link href="/library" className="link-primary fw-semibold small">
                  See all
                </Link>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6 col-xl-4">
                  <div className="card card-compact h-100">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/How%20to%20Create%20and%20Assign%20Quick%20Assessments.png-HB4Dw7pjb3jfhtyKjj3LXDfEseKB9s.jpeg"
                      className="card-img-top"
                      alt="Student Engagement Methods"
                    />
                    <div className="card-body">
                      <div className="d-flex align-items-center gap-1 text-muted small mb-1">
                        <i className="bx bx-file"></i>
                        <span>PDF</span>
                      </div>
                      <Link href="/library-page" className="stretched-link text-decoration-none">
                        <h3 className="mb-1 fw-semibold card-title-compact text-primary">Student Engagement Methods</h3>
                      </Link>
                      <p className="text-muted small mb-0">
                        Proven strategies to increase student participation and motivation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-xl-4">
                  <div className="card card-compact h-100">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Erudyte%20Differentiated%20Instruction%20Techniques-6kclpH7KZlFV9yVq1OXXNFh2eSXByA.png"
                      className="card-img-top"
                      alt="Differentiated Instruction Strategies"
                    />
                    <div className="card-body">
                      <div className="d-flex align-items-center gap-1 text-muted small mb-1">
                        <i className="bx bx-play-circle"></i>
                        <span>Video</span>
                      </div>
                      <Link href="/library-page" className="stretched-link text-decoration-none">
                        <h3 className="mb-1 fw-semibold card-title-compact text-primary">
                          Differentiated Instruction Strategies
                        </h3>
                      </Link>
                      <p className="text-muted small mb-0">
                        Walkthrough of effective differentiation techniques for diverse learners.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-xl-4">
                  <div className="card card-compact h-100">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Create%20and%20Assign%20Quick%20Assessments1-ibTc4EPl5aysAl4nCsMhbNXrmrfGDM.png"
                      className="card-img-top"
                      alt="IEP and 504 Implementation"
                    />
                    <div className="card-body">
                      <div className="d-flex align-items-center gap-1 text-muted small mb-1">
                        <i className="bx bx-book-open"></i>
                        <span>Walkthrough</span>
                      </div>
                      <Link href="/library-page" className="stretched-link text-decoration-none">
                        <h3 className="mb-1 fw-semibold card-title-compact text-primary">
                          IEP and 504 Implementation Plan
                        </h3>
                      </Link>
                      <p className="text-muted small mb-0">
                        Comprehensive guide for supporting students with special needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card card-compact-lg flex-grow-1 d-flex flex-column">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="h5 fw-bold mb-0">Your Daily Digest</h3>
                    <div className="d-flex gap-1">
                      <button className="btn btn-light btn-xs rounded-pill">
                        <i className="bx bx-chevron-left"></i>
                      </button>
                      <button className="btn btn-light btn-xs rounded-pill">
                        <i className="bx bx-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                  <p className="mb-2">
                    Today, my students explored the periodic table through a hands-on simulation I learned about here.
                    Seeing their excitement was the highlight of my week!
                  </p>
                  <footer className="d-flex align-items-center gap-2 mt-auto">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/25.jpg-NNceU41JDAw1lcsy0fme2emlzriQF6.jpeg"
                      width={40}
                      height={40}
                      className="rounded-circle"
                      alt="Mrs. Anderson"
                    />
                    <div className="small">
                      <strong>Mrs. Anderson</strong>
                      <div className="text-muted">7th Grade Science Teacher</div>
                    </div>
                  </footer>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="col-lg-4">
              <div className="mb-2">
                <h3 className="h5 fw-bold mb-0">Featured posts</h3>
              </div>

              <div className="d-flex flex-column gap-2 mb-3">
                {[
                  {
                    title: "Collaborative Lesson Design",
                    author: "Maxwell Smith",
                    icon: "bx bx-play-circle",
                    tag: "Webinar",
                    href: "/events",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Collaborative%20Lesson%20Design-EOrWo5OdbxXIe0bfbfllrMAIna8afo.png",
                  },
                  {
                    title: "STEM Career Preparation Guide",
                    author: "Sonia Santiago",
                    icon: "bx bx-book-open",
                    tag: "Article",
                    href: "/library-page",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/STEM%20Career%20Preparation%20Guide-gfGUSq1xK6dRxkfkSFpeLav8Npt8ER.png",
                  },
                  {
                    title: "Classroom Management Fundamentals",
                    author: "Eric Zimmerman",
                    icon: "bx bx-file",
                    tag: "Guide",
                    href: "/library-page",
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Classroom%20Management%20Fundamentals-DbroJ2P4WVqJTqpeyCaJYu7BgURQTg.png",
                  },
                ].map((p, idx) => (
                  <Link href={p.href} key={idx} className="text-decoration-none">
                    <div className="card media-card">
                      <div className="row g-0 align-items-center">
                        <div className="col-4">
                          <img
                            src={p.image || "/placeholder.svg"}
                            className="img-fluid rounded-start media-thumb"
                            alt={p.title}
                          />
                        </div>
                        <div className="col-8">
                          <div className="card-body py-2 pe-3">
                            <div className="d-flex align-items-center gap-1 text-muted xsmall mb-1">
                              <i className={p.icon}></i>
                              <span>{p.tag}</span>
                            </div>
                            <div className="fw-semibold text-primary lh-sm mb-1">{p.title}</div>
                            <div className="text-muted xsmall">{p.author}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div
                className="card rounded-4 text-white p-0 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
              >
                <div className="card-body py-3 px-3">
                  <div className="fw-bold mb-1">Stay updated</div>
                  <div className="text-white-50 xsmall mb-2">Get the latest PD resources in your inbox.</div>
                  <div className="d-flex gap-2">
                    <input type="email" className="form-control form-control-sm" placeholder="you@school.edu" />
                    <button className="btn btn-light btn-sm fw-semibold">Subscribe</button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* FROM ERUDYTE'S VIDEO LIBRARY */}
        <section className="pt-5 py-lg-8 border-top border-bottom bg-body">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h3 fw-black mb-0">From Erudyte's Video Library</h2>
              <div className="d-none d-md-block">
                <Link href="/library" className="btn btn-outline-primary rounded-pill">
                  See all videos
                </Link>
              </div>
            </div>

            {/* Rail on small, grid on large */}
            <div className="d-lg-none">
              <div className="position-relative">
                <div className="swiper video-swiper">
                  <div className="swiper-wrapper">
                    {videoCards.map((v) => (
                      <div key={v.title} className="swiper-slide">
                        <VideoCard {...v} />
                      </div>
                    ))}
                  </div>
                  <button
                    className="video-swiper-button-prev btn btn-light rounded-circle shadow position-absolute top-50 start-0 translate-middle-y"
                    style={{ width: 44, height: 44 }}
                  >
                    <i className="bx bx-chevron-left"></i>
                  </button>
                  <button
                    className="video-swiper-button-next btn btn-light rounded-circle shadow position-absolute top-50 end-0 translate-middle-y"
                    style={{ width: 44, height: 44 }}
                  >
                    <i className="bx bx-chevron-right"></i>
                  </button>
                  <div className="video-swiper-pagination text-center mt-3"></div>
                </div>
              </div>
            </div>

            <div className="row g-4 d-none d-lg-flex">
              {videoCards.slice(0, 4).map((v) => (
                <div className="col-md-6 col-lg-3" key={v.title}>
                  <VideoCard {...v} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROFESSIONAL DEVELOPMENT COURSES */}
        <section className="container pt-5 py-lg-8">
          <h2 className="h3 fw-black text-center mb-4">Professional Development Courses</h2>
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="certOnly" />
              <label className="form-check-label" htmlFor="certOnly">
                Certifications only
              </label>
            </div>
            <select className="form-select w-auto">
              <option>Level</option>
            </select>
            <select className="form-select w-auto">
              <option>Duration</option>
            </select>
            <select className="form-select w-auto">
              <option>Content type</option>
            </select>
            <select className="form-select w-auto">
              <option>Language</option>
            </select>
          </div>

          <div className="row g-4">
            {courseCards.map((c) => (
              <div className="col-md-6 col-lg-3" key={c.title}>
                <CourseCard {...c} />
              </div>
            ))}
          </div>
        </section>

        {/* POPULAR ACADEMY CERTIFICATES */}
        <section className="container pt-5 py-lg-8 pb-5">
          <div className="mb-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <h2 className="h3 fw-bold mb-0">Popular Academy certificates</h2>
              <span className="badge bg-warning-subtle text-warning rounded-circle">●</span>
            </div>
            <p className="text-muted mb-4">
              Elevate your teaching practice, developing specialized techniques for supporting students across all
              proficiency levels and academic subjects.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="d-flex flex-wrap gap-2 mb-4">
            {[
              "SEL for Educators",
              "EdTech",
              "Special Populations",
              "Leadership and Professional Growth",
              "Subject-Specific",
            ].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`btn rounded-pill px-4 py-2 ${
                  activeCategory === category ? "btn-primary text-white" : "btn-outline-secondary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Certificate Content */}
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/25.jpg-NNceU41JDAw1lcsy0fme2emlzriQF6.jpeg"
                  className="card-img-top"
                  style={{ height: 200, objectFit: "cover" }}
                  alt="Workshop instructor"
                />
                <div className="card-body p-4">
                  <div className="text-muted small mb-2">Workshop</div>
                  <h3 className="h5 fw-bold mb-3">Featured Certificate Program</h3>
                  <p className="text-muted mb-3">{getCategoryDescription(activeCategory)}</p>
                  <div className="d-flex justify-content-between align-items-center text-muted small mb-3">
                    <span>6/27/23 @4:00pm - Online/ZOOM</span>
                  </div>
                  <button className="btn btn-primary rounded-pill">RSVP now</button>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row g-4">
                {getCertificateCards(activeCategory).map((cert, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                      <div className="card-body p-4">
                        <h4 className="h6 fw-bold mb-2">{cert.title}</h4>
                        <p className="text-muted small mb-3">{cert.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="text-muted small">{cert.author}</div>
                          <div className="text-muted small">{cert.date}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Compact styling CSS at the end of the component */}
      <style jsx global>{`
        /* Compact card for main grid */
        .card-compact {
          border: 1px solid rgba(0,0,0,.06);
          border-radius: 14px;
          box-shadow: 0 2px 10px rgba(0,0,0,.04);
        }
        .card-compact .card-img-top {
          height: 132px;           /* shorter image like your reference */
          object-fit: cover;
          border-top-left-radius: 14px;
          border-top-right-radius: 14px;
        }
        .card-compact .card-body {
          padding: 12px 14px;      /* tighter padding */
        }
        .card-title-compact {
          font-size: .98rem;       /* slightly smaller title */
          line-height: 1.2;
        }

        /* Even tighter for the digest panel */
        .card-compact-lg {
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,.06);
          box-shadow: 0 2px 12px rgba(0,0,0,.04);
        }
        .card-compact-lg .card-body { padding: 16px; }

        /* Sidebar "media" cards (horizontal) */
        .media-card {
          border: 1px solid rgba(0,0,0,.06);
          border-radius: 14px;
          box-shadow: 0 2px 10px rgba(0,0,0,.04);
          overflow: hidden;
        }
        .media-thumb {
          width: 100%;
          height: 90px;            /* compact horizontal thumbnail */
          object-fit: cover;
        }

        /* Tiny helpers */
        .btn-xs { padding: 2px 8px; font-size: .8rem; }
        .xsmall { font-size: .78rem; }
      `}</style>
    </div>
  )
}

// Helper functions for certificate categories
function getCategoryDescription(category: string): string {
  const descriptions = {
    "SEL for Educators":
      "Building classroom community and supporting student mental health through trauma-informed teaching practices.",
    EdTech: "Digital tools for learning and online teaching essentials for modern educators.",
    "Special Populations":
      "Teaching English language learners and supporting neurodiverse students with specialized strategies.",
    "Leadership and Professional Growth":
      "Teacher leadership development and professional learning community facilitation.",
    "Subject-Specific": "STEM teaching strategies and literacy instruction methods for enhanced student engagement.",
  }
  return descriptions[category as keyof typeof descriptions] || ""
}

function getCertificateCards(category: string) {
  const cards = {
    "SEL for Educators": [
      {
        title: "Building Classroom Community",
        description: "Foster inclusive environments where every student feels valued and connected.",
        author: "Dr. Sarah Johnson",
        date: "12/2/24",
      },
      {
        title: "Trauma-Informed Teaching",
        description: "Understand how trauma impacts learning and develop compassionate responses.",
        author: "Maria Rodriguez",
        date: "10/7/24",
      },
      {
        title: "Culturally Responsive Pedagogy",
        description: "Honor students' cultural backgrounds while bridging home and school experiences.",
        author: "James Chen",
        date: "9/13/24",
      },
      {
        title: "Supporting Student Mental Health",
        description: "Recognize early warning signs and implement appropriate classroom interventions.",
        author: "Dr. Amanda Lee",
        date: "11/20/24",
      },
    ],
    EdTech: [
      {
        title: "Digital Tools for Learning",
        description: "Explore essential educational apps and platforms that enhance instruction.",
        author: "Tech Team",
        date: "12/2/24",
      },
      {
        title: "Online Teaching Essentials",
        description: "Master virtual instruction from platform navigation to student engagement.",
        author: "Digital Ed",
        date: "10/7/24",
      },
      {
        title: "Educational Technology Integration",
        description: "Seamlessly blend technology into curriculum to amplify learning.",
        author: "Innovation Lab",
        date: "9/13/24",
      },
      {
        title: "Data-Driven Instruction",
        description: "Transform student data into actionable insights for personalized learning.",
        author: "Analytics Pro",
        date: "11/20/24",
      },
    ],
    "Special Populations": [
      {
        title: "Teaching English Language Learners",
        description: "Support multilingual students with scaffolding and visual supports.",
        author: "ESL Expert",
        date: "12/2/24",
      },
      {
        title: "Special Needs Accommodations",
        description: "Implement effective modifications using Universal Design principles.",
        author: "SPED Team",
        date: "10/7/24",
      },
      {
        title: "Gifted and Talented Education",
        description: "Challenge advanced learners through differentiated curriculum.",
        author: "GT Specialist",
        date: "9/13/24",
      },
      {
        title: "Supporting Neurodiverse Learners",
        description: "Create inclusive environments for students with neurological differences.",
        author: "Inclusion Expert",
        date: "11/20/24",
      },
    ],
    "Leadership and Professional Growth": [
      {
        title: "Teacher Leadership Development",
        description: "Build capacity to lead change initiatives within your school.",
        author: "Leadership Coach",
        date: "12/2/24",
      },
      {
        title: "Professional Learning Communities",
        description: "Create collaborative teams focused on student learning.",
        author: "PLC Facilitator",
        date: "10/7/24",
      },
      {
        title: "Mentoring New Educators",
        description: "Support beginning teachers through evidence-based practices.",
        author: "Mentor Trainer",
        date: "9/13/24",
      },
      {
        title: "School Improvement Planning",
        description: "Navigate systemic change through data-driven strategies.",
        author: "Change Agent",
        date: "11/20/24",
      },
    ],
    "Subject-Specific": [
      {
        title: "STEM Teaching Strategies",
        description: "Engage students in hands-on science and mathematics learning.",
        author: "STEM Leader",
        date: "12/2/24",
      },
      {
        title: "Literacy Instruction Methods",
        description: "Develop comprehensive reading and writing instruction.",
        author: "Reading Specialist",
        date: "10/7/24",
      },
      {
        title: "Mathematics Pedagogy",
        description: "Transform math instruction through conceptual understanding.",
        author: "Math Coach",
        date: "9/13/24",
      },
      {
        title: "Arts Integration Techniques",
        description: "Enhance learning by incorporating visual arts and music.",
        author: "Arts Educator",
        date: "11/20/24",
      },
    ],
  }
  return cards[category as keyof typeof cards] || []
}

// --------- UI Partials ---------

type Video = { img: string; title: string; duration: string; date: string; href: string }
const videoCards: Video[] = [
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/How%20to%20Create%20and%20Assign%20Quick%20Assessments.png-HB4Dw7pjb3jfhtyKjj3LXDfEseKB9s.jpeg",
    title: "How to Create and Assign Quick Assessments",
    duration: "3:24",
    date: "Jan 16, 2024",
    href: "/videos/quick-assessments",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Culturally%20Relevant%20SEL%20Practices-G7TxqSUP8VvSVsOxPL9XAXLGxTiVT7.png",
    title: "Culturally Relevant SEL Practices",
    duration: "6:12",
    date: "Jan 12, 2024",
    href: "/videos/sel-practices",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Collaborative%20Teaching%20Strategies-viH8QU4OcPkytk7pafweyvsbSCDrvS.png",
    title: "Collaborative Teaching Strategies",
    duration: "8:45",
    date: "Dec 15, 2023",
    href: "/videos/collab-teaching",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Data%E2%80%91Driven%20Instruction%20Using%20Assessment%20Data-w7fFpTOjfZZ8CQVgMxQBdXa9KGs1zd.png",
    title: "Data‑Driven Instruction: Using Assessment Data",
    duration: "12:00",
    date: "Nov 28, 2023",
    href: "/videos/data-driven",
  },
]

function VideoCard(v: Video) {
  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="position-relative">
        <img
          src={v.img || "/placeholder.svg"}
          className="card-img-top"
          style={{ height: 180, objectFit: "cover" }}
          alt={v.title}
        />
        <div className="position-absolute top-50 start-50 translate-middle">
          <button
            className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center shadow"
            style={{ width: 56, height: 56 }}
            aria-label={`Play ${v.title}`}
          >
            <i className="bx bx-play fs-4"></i>
          </button>
        </div>
        <div className="position-absolute top-0 end-0 m-2">
          <span className="badge bg-dark bg-opacity-75 text-white">{v.duration}</span>
        </div>
      </div>
      <div className="card-body">
        <Link href={v.href} className="text-decoration-none">
          <h4 className="h6 fw-bold mb-1">{v.title}</h4>
        </Link>
        <div className="text-muted small d-flex gap-2">
          <span>{v.date}</span>
          <span>•</span>
          <span>Video</span>
        </div>
      </div>
    </div>
  )
}

// Courses

type Course = { img: string; minutes: string; title: string; desc: string; href: string }
const courseCards: Course[] = [
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Erudyte%20SEL%20for%20Educators-Nl72PX1NC2LrN6KbeAW470YwgJONyF.png",
    minutes: "12 min",
    title: "SEL for Educators",
    desc: "Support students' well‑being and foster a compassionate classroom community.",
    href: "/course-home",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Erudyte%20Differentiated%20Instruction-kKsbfJQvYGJhJhJhJhJhJhJhJh.png",
    minutes: "18 min",
    title: "Differentiated Instruction",
    desc: "Tailor instruction for different abilities and learning styles.",
    href: "/course-home",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Erudyte%20Leadership%20Skills%20for%20Educators-ISJoKQlQ8YsLctmoimSuEfR5Gs5Lc0.png",
    minutes: "16 min",
    title: "Leadership Skills for Educators",
    desc: "Lead initiatives and drive positive change across teams.",
    href: "/course-home",
  },
  {
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Erudyte%20Data-Driven%20Instruction-1UXP2EdwDMoE1zba844B3LXPIIlQ8U.png",
    minutes: "15 min",
    title: "Data‑Driven Instruction",
    desc: "Use assessment data to inform and improve practice.",
    href: "/course-home",
  },
]

function CourseCard(c: Course) {
  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <img
        src={c.img || "/placeholder.svg"}
        className="card-img-top"
        style={{ height: 190, objectFit: "cover" }}
        alt={c.title}
      />
      <div className="card-body d-flex flex-column">
        <div className="text-primary small fw-semibold mb-2">{c.minutes}</div>
        <Link href={c.href} className="text-decoration-none">
          <h4 className="h6 fw-bold mb-2">{c.title}</h4>
        </Link>
        <p className="text-muted small mb-3 flex-grow-1">{c.desc}</p>
        <Link href={c.href} className="btn btn-primary rounded-pill align-self-start">
          Start lesson
        </Link>
      </div>
    </div>
  )
}
