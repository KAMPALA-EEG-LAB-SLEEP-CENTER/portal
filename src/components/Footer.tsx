import { MapPin, Phone, Clock } from 'lucide-react';
import logo from "../assets/logo.png";

const quickLinks = [
  { label: "Home", href: "/#home" },
  // { label: 'About Us', href: '/#about' },
  { label: "Services", href: "/#services" },
  { label: "FAQs", href: "/#faqs" },
];

const serviceLinks = [
  { label: "Depression Tests", href: "/#services" },
  { label: "Seizure Monitoring", href: "/#services" },
  { label: "Sleep Analysis", href: "/#services" },
  { label: "Stroke Evaluation", href: "/#services" },
];

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src={logo}
              alt="Kampala EEG Labs logo"
              className="h-16 w-auto object-contain"
            />
            <span className="font-semibold text-[#0B1220] text-sm">
              Kampala EEG Lab &amp; Sleep Center
            </span>
          </div>
          <p className="text-sm text-gray-500 max-w-xs">
            Uganda's trusted provider of affordable, accurate brain tests for
            adults and children.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#0B1220] mb-4">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-[#0D9488] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#0B1220] mb-4">
            Services
          </h4>
          <ul className="flex flex-col gap-2.5">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-[#0D9488] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#0B1220] mb-4">Contact</h4>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
              Upper Mulago Hill, Kampala
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-500">
              <Phone className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
              +256 751 943 706
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4 text-[#0D9488] mt-0.5 shrink-0" />
              Mon - Sat: 8 AM - 7 PM
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © 2026 Kampala EEG Lab &amp; Sleep Center Uganda. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
