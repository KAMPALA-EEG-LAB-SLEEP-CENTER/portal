import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import logo from "../assets/logo.png";

const navLinks = [
  { label: "Home", href: "/#home" },
  // { label: 'About Us', href: '/#about' },
  { label: "Services", href: "/#services" },
  { label: "FAQs", href: "/#faqs" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

return (
  <header className="sticky top-0 z-50 bg-white shadow-sm">
    <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
      <a href="/#home" className="flex items-center gap-2">
        <img
          src={logo}
          alt="Kampala EEG Labs logo"
          className="h-20 w-auto object-contain"
        />
        <span className="font-semibold text-[#0B1220] text-sm sm:text-base">
          Kampala EEG Lab &amp; Sleep Center
        </span>
      </a>

      <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="hover:text-[#0D9488] transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <Link to="/blog" className="hover:text-[#0D9488] transition-colors">
            Our Blog
          </Link>
        </li>
      </ul>

      <div className="hidden md:flex items-center gap-6">
        <a
          href="tel:+256751943706"
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#0D9488] transition-colors"
        >
          <Phone className="w-4 h-4" />
          +256 751-943-706
        </a>
        <Link
          to="/book"
          className="bg-[#0D9488] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#0B7C71] transition-colors"
        >
          Book Now
        </Link>
      </div>

      <button
        className="md:hidden text-[#0B1220]"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </nav>

    {isMenuOpen && (
      <div className="md:hidden border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm font-medium text-gray-700"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="tel:+256751943706"
          className="flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          <Phone className="w-4 h-4" />
          +256 751-943-706
        </a>
        <Link
          to="/book"
          className="bg-[#0D9488] text-white text-sm font-medium px-5 py-2.5 rounded-lg text-center"
          onClick={() => setIsMenuOpen(false)}
        >
          Book Now
        </Link>
      </div>
    )}
  </header>
);
}

export default Navbar;
