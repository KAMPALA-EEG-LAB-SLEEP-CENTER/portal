import { ArrowRight, Clock, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from "../assets/hero-doctor.jpg";

function Hero() {
  return (
    <section id="home" className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block bg-teal-50 text-[#0D9488] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            UGANDA'S LEADING EEG DIAGNOSTIC CENTER
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#0B1220] leading-tight mb-6">
            Your First Step Toward Answers{" "}
            <span className="text-[#0D9488]">Fast, Accurate</span> Brain
            Testing.
          </h1>

          <p className="text-gray-500 text-base mb-8 max-w-lg">
            Struggling with anxiety, depression, memory loss, or sleep problems?
            We provide advanced, non-invasive EEG scans to help uncover the root
            causes of neurological issues.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <Link
              to="/book"
              className="flex items-center gap-2 bg-[#0D9488] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#0B7C71] transition-colors"
            >
              Book EEG Test Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/book"
              className="flex items-center gap-2 border border-gray-300 text-[#0B1220] text-sm font-medium px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Free Consultation
            </a>
          </div>

          {/* <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-teal-100 border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-teal-200 border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-teal-300 border-2 border-white" />
            </div>
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-[#0B1220]">
                500+ Patients
              </span>{" "}
              helped this year in Kampala.
            </p>
          </div> */}
        </div>

        <div className="relative">
          <img
            src={heroImage}
            alt="EEG specialist at Kampala EEG Labs"
            className="rounded-2xl w-full h-auto object-cover"
          />

          <div className="absolute -bottom-6 left-6 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3 max-w-xs">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-teal-50 shrink-0">
              <Clock className="w-4 h-4 text-[#0D9488]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0B1220]">
                Same-Day Results
              </p>
              <p className="text-xs text-gray-500">
                Walk out with your diagnostic reports in under an hour.
              </p>
            </div>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/256751943706"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </section>
  );
}

export default Hero;
