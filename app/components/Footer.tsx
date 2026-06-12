"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../i18n/LanguageProvider";
import { translations, t } from "../i18n/translations";

const MAIN_SITE = "https://tool-connect.com";

export default function Footer() {
  const { lang } = useLanguage();
  const f = translations.footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* ── Brand ── */}
          <div>
            <div className="mb-4">
              <Link href={MAIN_SITE}>
                <Image
                  src="/logo.webp"
                  alt="Tool Connect"
                  width={160}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <p className="text-gray-400 text-sm">{t(f.tagline, lang)}</p>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              {t(f.quickLinks, lang)}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={MAIN_SITE}
                  className="text-gray-400 hover:text-white transition-colors"
                  id="footer-home"
                >
                  {t(f.home, lang)}
                </Link>
              </li>
              <li>
                <Link
                  href={`${MAIN_SITE}/#how-it-works`}
                  className="text-gray-400 hover:text-white transition-colors"
                  id="footer-how-it-works"
                >
                  {t(f.howItWorks, lang)}
                </Link>
              </li>
              <li>
                <Link
                  href={`${MAIN_SITE}/#about`}
                  className="text-gray-400 hover:text-white transition-colors"
                  id="footer-about"
                >
                  {t(f.aboutUs, lang)}
                </Link>
              </li>
              <li>
                <Link
                  href={`${MAIN_SITE}/#faq`}
                  className="text-gray-400 hover:text-white transition-colors"
                  id="footer-faq"
                >
                  {t(f.faqFull, lang)}
                </Link>
              </li>
              <li>
                <Link
                  href={`${MAIN_SITE}/service-providers`}
                  className="text-gray-400 hover:text-white transition-colors"
                  id="footer-service-providers"
                >
                  {t(f.serviceProviders, lang)}
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                  id="footer-blog"
                >
                  {t(f.blog, lang)}
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Support ── */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t(f.support, lang)}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`${MAIN_SITE}/#contact`}
                  className="text-gray-400 hover:text-white transition-colors"
                  id="footer-contact"
                >
                  {t(f.contactSupport, lang)}
                </Link>
              </li>
              <li>
                <Link
                  href={`${MAIN_SITE}/privacy-policy`}
                  className="text-gray-400 hover:text-white transition-colors"
                  id="footer-privacy"
                >
                  {t(f.privacy, lang)}
                </Link>
              </li>
              <li>
                <Link
                  href={`${MAIN_SITE}/terms-conditions`}
                  className="text-gray-400 hover:text-white transition-colors"
                  id="footer-terms"
                >
                  {t(f.terms, lang)}
                </Link>
              </li>
              <li>
                <Link
                  href={`${MAIN_SITE}/cookie-policy`}
                  className="text-gray-400 hover:text-white transition-colors"
                  id="footer-cookies"
                >
                  {t(f.cookies, lang)}
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Social + Apps ── */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              {t(f.followUs, lang)}
            </h4>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.facebook.com/profile.php?id=61572803991796"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                id="social-facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a
                href="https://www.instagram.com/toolconnectcz/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                id="social-instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a
                href="https://www.linkedin.com/company/tool-connect/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                id="social-linkedin"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
            <div className="flex gap-3">
              <a
                href="https://apps.apple.com/us/app/tool/id6739626276"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                id="app-apple"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" /><path d="M10 2c1 .5 2 2 2 5" /></svg>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.tool.toolappconnect"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                id="app-google"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
              </a>
              <Link
                href={`${MAIN_SITE}/search`}
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                id="app-web"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          © {currentYear} Tool Connect. {t(f.copyright, lang)}
        </div>
      </div>
    </footer>
  );
}
