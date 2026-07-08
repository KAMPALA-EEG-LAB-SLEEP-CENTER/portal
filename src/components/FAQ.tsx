import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Is an EEG test painful?',
    answer: 'No. An EEG is completely non-invasive and painless. Small sensors are placed on the scalp using a gentle adhesive gel — there is no needle, no electric shock, and no discomfort involved at any stage of the test.',
  },
  {
    question: 'How long does an EEG test take?',
    answer: 'A standard EEG test typically takes 45 minutes to an hour, including setup and sensor placement. Sleep studies or extended monitoring may take longer, and we\'ll always let you know the expected duration when you book.',
  },
  {
    question: 'Is EEG testing safe for children?',
    answer: 'Yes, EEG testing is completely safe for children of all ages, including infants. We use a gentle, child-friendly approach and our staff are experienced in making young patients comfortable throughout the process.',
  },
  {
    question: 'How soon will I receive the results?',
    answer: 'In most cases, you will walk out with same-day results. Our electrophysiologist reviews the scan immediately after your test so you and your doctor can get answers without unnecessary delays.',
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="bg-gray-50 py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1220] mb-3">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-base">Common concerns about EEG testing answered.</p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button onClick={() => toggle(index)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="text-sm font-medium text-[#0B1220]">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
