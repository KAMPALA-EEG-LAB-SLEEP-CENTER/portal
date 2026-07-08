import { Star } from 'lucide-react';

const testimonials = [
  {
    initials: 'GN',
    name: 'Grace N.',
    location: 'Wakiso',
    quote: "My 7-year-old started having strange movements and blank stares. We were told it could be survival, but Dr. Ochola gave us real answers. Now she's on treatment and doing much better. I'm so thankful.",
  },
  {
    initials: 'DM',
    name: 'Daniel M.',
    location: 'Makindye',
    quote: "I used to think my stress and constant fear were just part of life, but I felt like I was losing control. The EEG test helped me and my doctor understand what was happening in my brain.",
  },
  {
    initials: 'SM',
    name: 'Samuel M.',
    location: 'Mukono',
    quote: "After my stroke, I kept forgetting things and feeling dizzy. Kampala EEG Lab checked my brain activity and found a hidden problem. I wish I had come sooner.",
  },
];

function PatientStories() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1220] mb-3">Patient Stories</h2>
          <p className="text-gray-500 text-base">Real outcomes from our community.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-gray-50 rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#0D9488] text-[#0D9488]" />
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-teal-100 text-[#0D9488] text-xs font-semibold shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0B1220]">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PatientStories;
