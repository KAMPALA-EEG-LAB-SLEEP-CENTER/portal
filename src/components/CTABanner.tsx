import { Link } from 'react-router-dom';
import { Calendar, MessageCircle } from 'lucide-react';

function CTABanner() {
  return (
    <section className="bg-[#0B1220] py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Book Your EEG Brain Scan Today in Kampala
        </h2>
        <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-xl mx-auto">
          Don't wait for symptoms to worsen. Our specialists are ready to help you get clarity. Take the first step toward optimal brain health today.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/book" className="flex items-center gap-2 bg-[#0D9488] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#0B7C71] transition-colors">
            Book Test Now
            <Calendar className="w-4 h-4" />
          </Link>
          <a href="https://wa.me/256751943706" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-white/20 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-white/5 transition-colors">
            WhatsApp Us
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTABanner;
