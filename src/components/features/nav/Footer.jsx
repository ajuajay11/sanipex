import { useState } from "react";
import { Link } from "react-router";

const sectionTitle =
  "mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white";

const linkClass =
  "text-sm text-white/95 underline-offset-2 transition-opacity hover:opacity-70";

const textLink = `${linkClass} no-underline`;

const externalBase = "https://sanipexgroup.com";

export default function Footer() {
  const [email, setEmail] = useState("");

  const onNewsletterSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="bg-black text-white">
      <div className="w-full px-5 py-14 xxl:px-0 md:py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {/* Contact & social */}
            <section aria-labelledby="footer-contact-heading">
              <h2 id="footer-contact-heading" className={sectionTitle}>
                Contact
              </h2>
              <ul className="list-none space-y-2.5 p-0">
                <li>
                  <a className={`${linkClass} underline`} href="mailto:info@sanipexgroup.com">
                    info@sanipexgroup.com
                  </a>
                </li>
                <li>
                  <a className={textLink} href="tel:+97145076000">
                    Tel +971 4 507 6000
                  </a>
                </li>
              </ul>
              <h3 className={`${sectionTitle} mt-8`}>Follow us</h3>
              <ul className="list-none space-y-2.5 p-0">
                <li>
                  <a
                    className={textLink}
                    href={`${externalBase}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    className={textLink}
                    href={`${externalBase}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    className={textLink}
                    href={`${externalBase}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a className={textLink} href={`${externalBase}/`}>
                    Do not sell or share my personal information
                  </a>
                </li>
              </ul>
            </section>

            {/* Help */}
            <nav aria-labelledby="footer-help-heading">
              <h2 id="footer-help-heading" className={sectionTitle}>
                Need help?
              </h2>
              <ul className="list-none space-y-2.5 p-0">
                <li>
                  <a className={textLink} href={`${externalBase}/`}>
                    Contact us
                  </a>
                </li>
                <li>
                  <a className={textLink} href={`${externalBase}/`}>
                    Distributors
                  </a>
                </li>
                <li>
                  <a className={textLink} href={`${externalBase}/`}>
                    Careers
                  </a>
                </li>
                <li>
                  <a className={textLink} href={`${externalBase}/`}>
                    Support & FAQ
                  </a>
                </li>
                <li>
                  <a className={textLink} href={`${externalBase}/`}>
                    Shipping & returns
                  </a>
                </li>
              </ul>
            </nav>

            {/* Legal / utility */}
            <nav aria-labelledby="footer-links-heading">
              <h2 id="footer-links-heading" className={sectionTitle}>
                Important links
              </h2>
              <ul className="list-none space-y-2.5 p-0">
                <li>
                  <a className={textLink} href={`${externalBase}/`}>
                    Care and maintenance
                  </a>
                </li>
                <li>
                  <a className={textLink} href={`${externalBase}/`}>
                    Terms and conditions
                  </a>
                </li>
                <li>
                  <a className={textLink} href={`${externalBase}/`}>
                    Privacy and cookies
                  </a>
                </li>
                <li>
                  <Link className={textLink} to="/brands">
                    Brands
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Newsletter */}
            <section aria-labelledby="footer-newsletter-heading">
              <h2 id="footer-newsletter-heading" className={sectionTitle}>
                Sign up to our newsletter
              </h2>
              <form
                onSubmit={onNewsletterSubmit}
                className="flex max-w-sm flex-col gap-2.5"
              >
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-white bg-black px-3 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                />
                <button
                  type="submit"
                  className="w-full bg-white py-3 text-xs font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-90"
                >
                  Submit
                </button>
              </form>
            </section>
          </div>

          <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-10 md:mt-16 md:flex-row md:items-end md:justify-between md:pt-12">
            <p className="m-0 text-[clamp(1.75rem,6.5vw,3.75rem)] font-bold uppercase leading-[1.05] tracking-tight">
              Sanipex Group
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-neutral-400 md:justify-end">
              <span>© 2026 Sanipex Group</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
