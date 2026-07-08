import { Link } from 'react-router-dom';
import { CheckCircle2, X } from 'lucide-react';

interface SuccessModalProps {
  onClose: () => void;
}

function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-[#0D9488]" />
        </div>

        <h3 className="text-xl font-semibold text-[#0B1220] mb-2">Appointment Requested!</h3>
        <p className="text-sm text-gray-500 mb-8">
          Thank you for booking with us. Our team will contact you shortly via phone or email to confirm your appointment details.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/" className="flex-1 bg-[#0D9488] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#0B7C71] transition-colors">
            Return Home
          </Link>
          <button onClick={onClose} className="flex-1 border border-gray-300 text-[#0B1220] text-sm font-medium px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
