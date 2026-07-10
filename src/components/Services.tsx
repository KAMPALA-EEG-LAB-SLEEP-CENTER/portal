import { HeartPulse, Zap, Moon, BrainCircuit, Baby} from 'lucide-react';

function Services() {
  return (
    <section id="services" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#0D9488] tracking-wide">EXPERT DIAGNOSTICS</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1220] mt-3 mb-4">Specialized EEG Services</h2>
          <p className="text-gray-500 text-base">
            We offer advanced brain testing for both adults and children facing neurological and mental health challenges.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm grid sm:grid-cols-2 overflow-hidden">
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-50 mb-5">
                  <HeartPulse className="w-5 h-5 text-[#0D9488]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Depression &amp; Anxiety</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Support mental health diagnosis through real-time brain monitoring. Detect biomarkers associated with treatment-resistant depression.
                </p>
              </div>
             
            </div>
            <img src="/src/assets/services-depression.jpg" alt="Doctors reviewing patient EEG results" className="w-full h-full object-cover min-h-[220px]" />
          </div>

          <div className="bg-[#0B1220] rounded-2xl p-8 flex flex-col justify-between text-white">
            <div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 mb-5">
                <Zap className="w-5 h-5 text-[#5EEAD4]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Epilepsy &amp; Seizures</h3>
              <p className="text-sm text-gray-300">
                Detect abnormal brain waves and seizure patterns with high precision.
              </p>
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
              <span className="text-sm text-gray-300">High-Resolution Scans</span>
              
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-50 mb-5">
              <Moon className="w-5 h-5 text-[#0D9488]" />
            </div>
            <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Sleep Disorders</h3>
            <p className="text-sm text-gray-500">
              Diagnose for insomnia, apnea, and restlessness. Evaluate sleep cycles for root causes of fatigue.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-50 mb-5">
              <BrainCircuit className="w-5 h-5 text-[#0D9488]" />
            </div>
            <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Memory Loss</h3>
            <p className="text-sm text-gray-500">
              Track post-stroke recovery and early-stage cognitive changes through neuro-activity mapping.
            </p>
          </div>

          <div className="bg-[#0D9488] rounded-2xl p-8 text-white">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/15 mb-5">
              <Baby className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Pediatric EEG</h3>
            <p className="text-sm text-teal-50">
              Gentle, child-friendly testing for developmental delays or unexplained movements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
