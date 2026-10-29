import Link from "next/link";
import { headers } from "next/headers";
import { Phone, Mail, MapPin } from "lucide-react";
import { agentInfo, siteConfig } from "@/lib/site-config";
import { DrJanPortrait } from "@/components/brand/DrJanPortrait";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { getAgentPortraitCopy } from "@/lib/agent-portrait";

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = (await headers()).get("x-pathname") || "/";
  const portrait = getAgentPortraitCopy(pathname, "footer");

  return (
    <>
      <DrJanPortrait pathname={pathname} />
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div>
              <div className="mb-4">
                <SiteLogo imageAlt={portrait.alt} tone="light" />
              </div>
              <p className="text-slate-300 mb-4 text-sm">
                Grand Park Village and Summerlin West real estate with Dr. Jan
                Duffy, in real estate since 1983.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://drjanduffy.realscout.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    All Properties
                  </a>
                </li>
                <li>
                  <Link
                    href="/neighborhoods"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    Neighborhoods
                  </Link>
                </li>
                <li>
                  <Link
                    href="/market-report"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    Market Report
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    About Dr. Jan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-4">Real Estate Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/buyers"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    Home Buying
                  </Link>
                </li>
                <li>
                  <Link
                    href="/buyers/california-relocator"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    California Relocators
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sellers"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    Home Selling
                  </Link>
                </li>
                <li>
                  <Link
                    href="/luxury-homes"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    Luxury Homes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/55-plus-communities"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    55+ Communities
                  </Link>
                </li>
                <li>
                  <Link
                    href="/new-construction"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    New Construction
                  </Link>
                </li>
                <li>
                  <Link
                    href="/market-insights"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    Market Insights
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info - NAP (Name, Address, Phone) */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Dr. Jan Duffy</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    9406 W Lake Mead Blvd, Suite 100
                    <br />
                    Las Vegas, NV 89134
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                  <Link
                    href="tel:+17025001942"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    (702) 500-1942
                  </Link>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                  <Link
                    href="mailto:homes@heyberkshire.com"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    Homes@HeyBerkshire.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-sm text-center md:text-left">
                © {currentYear} {siteConfig.name} · {agentInfo.name}. All
                Rights Reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link
                  href="/faq"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="/sitemap.xml"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Sitemap
                </Link>
              </div>
            </div>
            <p className="text-slate-500 text-xs text-center mt-4 max-w-3xl mx-auto">
              Equal Housing Opportunity. We do not discriminate based on race,
              color, religion, sex, handicap, familial status, national origin,
              sexual orientation, or gender identity.
            </p>
            {/* Brokerage disclosure — NAC 645.610: brokerage name shown with prominence,
              license number, and franchise independently-owned statement */}
            <div className="mt-6 mx-auto max-w-3xl rounded-lg border border-slate-700 bg-slate-800/60 px-6 py-5 text-center space-y-1">
              <p className="text-white text-base md:text-lg font-bold">
                Berkshire Hathaway HomeServices Nevada Properties since
                September 2008 · License S.0197614.LLC
              </p>
              <p className="text-slate-200 text-sm font-semibold">
                {agentInfo.name}, {agentInfo.title}
              </p>
              <p className="text-slate-300 text-sm">
                Each office is independently owned and operated.
              </p>
              <p className="text-slate-300 text-sm">
                <a href={agentInfo.phoneTel} className="hover:text-white">
                  {agentInfo.phone}
                </a>
                {" · "}
                <a href={siteConfig.url} className="hover:text-white">
                  {siteConfig.url.replace("https://", "").replace("www.", "")}
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
