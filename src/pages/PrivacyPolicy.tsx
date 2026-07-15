import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-[#0B1220] mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-10">Last updated: July 2026</p>

          <div className="flex flex-col gap-8 text-sm text-gray-600 leading-relaxed">
            <div>
              <h2 className="text-lg font-semibold text-[#0B1220] mb-2">1. Introduction</h2>
              <p>
                Kampala EEG Lab &amp; Sleep Center ("we," "us," or "our") is committed to protecting your privacy and handling your personal and medical information responsibly. This Privacy Policy explains what information we collect when you use our website or book an appointment with us, how we use it, and the choices you have.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#0B1220] mb-2">2. Information We Collect</h2>
              <p className="mb-2">When you book an appointment through our website, we collect:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1">
                <li>Full name, date of birth, and gender</li>
                <li>Phone number and email address</li>
                <li>Requested service and preferred appointment date/time</li>
                <li>Symptoms, medications, and any details you provide about your condition</li>
                <li>Medical referral documents or previous test results, if you choose to upload them</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#0B1220] mb-2">3. How We Use Your Information</h2>
              <p className="mb-2">We use the information you provide to:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1">
                <li>Schedule, confirm, and manage your appointment</li>
                <li>Communicate with you about your booking, including confirmation and reminder emails</li>
                <li>Prepare our clinical staff for your visit</li>
                <li>Maintain accurate patient records for continuity of care</li>
              </ul>
              <p className="mt-2">We do not sell, rent, or trade your personal or medical information to third parties for marketing purposes.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#0B1220] mb-2">4. How We Store and Protect Your Information</h2>
              <p>
                Your information is stored on secure, encrypted infrastructure provided by our database and hosting partners. Access to patient records is restricted to authorized clinic staff who require it to provide your care. We use industry-standard security practices, including encrypted connections (HTTPS) and access-controlled admin systems, to protect your data from unauthorized access.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#0B1220] mb-2">5. Third-Party Services</h2>
              <p>
                We use trusted third-party providers to help operate our services, including email delivery for appointment confirmations and reminders. These providers only receive the information necessary to perform their function and are contractually obligated to protect your data.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#0B1220] mb-2">6. Data Retention</h2>
              <p>
                We retain your appointment and medical information for as long as necessary to provide you care, comply with legal and medical record-keeping obligations, and resolve any disputes. You may request deletion of your data, subject to any legal retention requirements applicable to medical records in Uganda.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#0B1220] mb-2">7. Your Rights</h2>
              <p className="mb-2">Under the Uganda Data Protection and Privacy Act (2019), you have the right to:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information, where legally permissible</li>
                <li>Withdraw consent for non-essential communications at any time</li>
              </ul>
              <p className="mt-2">To exercise any of these rights, please contact us using the details below.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#0B1220] mb-2">8. Cookies</h2>
              <p>
                Our website may use minimal cookies necessary for the site to function correctly. We do not use cookies for third-party advertising or tracking.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#0B1220] mb-2">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The "Last updated" date at the top of this page will reflect the most recent revision.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#0B1220] mb-2">10. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or how your information is handled, please contact us:
              </p>
              <p className="mt-2">
                Kampala EEG Lab &amp; Sleep Center<br />
                Upper Mulago Hill, Kampala, Uganda<br />
                Phone: +256 751 943 706
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
