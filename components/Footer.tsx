import Link from "next/link"

export default function Footer() {
  return (
    <>
      <footer className="footer bg-dark border-top border-light pt-5 pb-4 pb-lg-5">
        <div className="container pt-lg-4">
          <div className="row pb-5">
            <div className="col-lg-4 col-md-6">
              <div className="navbar-brand text-light p-0 me-0 mb-3 mb-lg-4">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/erudyte-logo-dmm3SiboydR6bY9VBh0oBhFVLLmBhS.png"
                  width="47"
                  alt="Erudyte Commons"
                />
                <span className="ms-2">Erudyte Commons</span>
              </div>
              <p className="fs-sm text-light opacity-70 pb-lg-3 mb-4">
                Empowering educators through collaborative learning, professional development, and innovative teaching
                resources. Join our community of passionate educators making a difference in classrooms worldwide.
              </p>
              <form className="needs-validation" noValidate>
                <label htmlFor="subscr-email" className="form-label text-light">
                  Subscribe to our newsletter
                </label>
                <div className="input-group">
                  <input
                    type="email"
                    id="subscr-email"
                    className="form-control rounded-start ps-5"
                    placeholder="Your email"
                    required
                  />
                  <i
                    className="bx bx-envelope fs-lg text-muted position-absolute top-50 start-0 translate-middle-y ms-3"
                    style={{ zIndex: 5 }}
                  ></i>
                  <div className="invalid-tooltip position-absolute top-100 start-0">
                    Please provide a valid email address.
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
            <div className="col-xl-6 col-lg-7 col-md-5 offset-xl-2 offset-md-1 pt-4 pt-md-1 pt-lg-0">
              <div id="footer-links" className="row">
                <div className="col-lg-4">
                  <h6 className="mb-2 text-light">
                    <a
                      href="#useful-links"
                      className="d-block text-light dropdown-toggle d-lg-none py-2"
                      data-bs-toggle="collapse"
                    >
                      Useful Links
                    </a>
                  </h6>
                  <div id="useful-links" className="collapse d-lg-block" data-bs-parent="#footer-links">
                    <ul className="nav flex-column pb-lg-1 mb-lg-3">
                      <li className="nav-item">
                        <Link href="/" className="nav-link d-inline-block px-0 pt-1 pb-2 text-light opacity-70">
                          Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/library" className="nav-link d-inline-block px-0 pt-1 pb-2 text-light opacity-70">
                          Library
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/events" className="nav-link d-inline-block px-0 pt-1 pb-2 text-light opacity-70">
                          Webinars
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/people" className="nav-link d-inline-block px-0 pt-1 pb-2 text-light opacity-70">
                          Community
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="/funding-opportunities"
                          className="nav-link d-inline-block px-0 pt-1 pb-2 text-light opacity-70"
                        >
                          Funding
                        </Link>
                      </li>
                    </ul>
                    <ul className="nav flex-column mb-2 mb-lg-0">
                      <li className="nav-item">
                        <Link href="/terms" className="nav-link d-inline-block px-0 pt-1 pb-2 text-light opacity-70">
                          Terms &amp; Conditions
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/privacy" className="nav-link d-inline-block px-0 pt-1 pb-2 text-light opacity-70">
                          Privacy Policy
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-3">
                  <h6 className="mb-2 text-light">
                    <a
                      href="#social-links"
                      className="d-block text-light dropdown-toggle d-lg-none py-2"
                      data-bs-toggle="collapse"
                    >
                      Socials
                    </a>
                  </h6>
                  <div id="social-links" className="collapse d-lg-block" data-bs-parent="#footer-links">
                    <ul className="nav flex-column mb-2 mb-lg-0">
                      <li className="nav-item">
                        <a href="#" className="nav-link d-inline-block px-0 pt-1 pb-2 text-light opacity-70">
                          Facebook
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link d-inline-block px-0 pt-1 pb-2 text-light opacity-70">
                          LinkedIn
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link d-inline-block px-0 pt-1 pb-2 text-light opacity-70">
                          Twitter
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link d-inline-block px-0 pt-1 pb-2 text-light opacity-70">
                          Instagram
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-5 pt-2 pt-lg-0">
                  <h6 className="mb-2 text-light">Contact Us</h6>
                  <a href="mailto:hello@erudytecommons.org" className="fw-medium text-light opacity-70">
                    hello@erudytecommons.org
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p className="nav d-block fs-xs text-center text-md-start pb-2 pb-lg-0 mb-0">
            <span className="text-light opacity-50">&copy; All rights reserved. </span>
            <a className="nav-link d-inline-block p-0 text-light opacity-70" href="/" rel="noopener">
              Erudyte Commons
            </a>
          </p>
        </div>
      </footer>

      <a
        href="#top"
        className="btn-scroll-top position-fixed bottom-0 end-0 m-3 btn btn-primary rounded-circle p-2"
        style={{ zIndex: 1000 }}
      >
        <i className="bx bx-chevron-up fs-4"></i>
      </a>
    </>
  )
}
