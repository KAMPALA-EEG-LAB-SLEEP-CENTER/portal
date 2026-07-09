import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ArrowRight,
  ArrowLeft,
  Smile,
  Clock,
  Users,
  Shield,
  Phone,
  MessageSquare,
  Activity,
  Moon,
  Brain,
  Asterisk,
  Upload,
} from "lucide-react";
import SuccessModal from "../components/SuccessModal";

const stepLabels = ["Patient Info", "Service & Date", "Symptoms"];

const services = [
  {
    id: "EEG_TEST",
    title: "EEG Test",
    desc: "Standard brain activity recording",
    icon: Activity,
  },
  {
    id: "SLEEP_STUDY",
    title: "Sleep Study",
    desc: "Polysomnography for sleep disorders",
    icon: Moon,
  },
  {
    id: "DEPRESSION_SCREEN",
    title: "Depression Screen",
    desc: "Clinical mood assessment",
    icon: Brain,
  },
  {
    id: "OTHER_CONSULTATION",
    title: "Other Consultation",
    desc: "Specific neurological inquiries",
    icon: Asterisk,
  },
];

const symptomOptions = [
  "Seizures",
  "Sleep Problems",
  "Memory Loss",
  "Anxiety / Depression",
  "Frequent Headaches",
  "Other",
];

const phoneRegex = /^\+?[0-9\s-]{7,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

function BookAppointment() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [referralFile, setReferralFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "Male",
    phone: "",
    email: "",
    service: "EEG_TEST",
    date: "",
    timeSlot: "",
    symptoms: [] as string[],
    symptomDetails: "",
    medications: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleSymptom = (symptom: string) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
    if (errors.symptoms) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.symptoms;
        return next;
      });
    }
  };

  const handleFileSelect = (file: File | null | undefined) => {
    if (!file) return;

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        referralFile: "Please upload a PDF, JPG or PNG file.",
      }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        referralFile: "File is too large. Max size is 5MB.",
      }));
      return;
    }

    setErrors((prev) => {
      const next = { ...prev };
      delete next.referralFile;
      return next;
    });
    setReferralFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    handleFileSelect(e.dataTransfer.files?.[0]);
  };

  const removeReferralFile = () => {
    setReferralFile(null);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.referralFile;
      return next;
    });
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 0) {
      if (!formData.fullName.trim())
        newErrors.fullName = "Full name is required.";
      if (!formData.dob) {
        newErrors.dob = "Date of birth is required.";
      } else if (new Date(formData.dob) > new Date()) {
        newErrors.dob = "Date of birth cannot be in the future.";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required.";
      } else if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = "Enter a valid phone number, e.g. +256 700 000 000.";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email address is required.";
      } else if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Enter a valid email address.";
      }
    }

    if (currentStep === 1) {
      if (!formData.date) {
        newErrors.date = "Preferred date is required.";
      } else if (
        new Date(formData.date) < new Date(new Date().toDateString())
      ) {
        newErrors.date = "Preferred date cannot be in the past.";
      }
      if (!formData.timeSlot) newErrors.timeSlot = "Please select a time slot.";
    }

    if (currentStep === 2) {
      if (formData.symptoms.length === 0) {
        newErrors.symptoms = 'Select at least one symptom, or choose "Other".';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToStep = (target: number) => {
    if (target > step) {
      if (!validateStep(step)) return;
    } else {
      setErrors({});
    }
    setStep(target);
  };

  const handleConfirm = async () => {
    if (!validateStep(2)) return;

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("dateOfBirth", formData.dob);
      payload.append("gender", formData.gender);
      payload.append("phoneNumber", formData.phone);
      payload.append("email", formData.email);
      payload.append("service", formData.service);
      payload.append("preferredDate", formData.date);
      payload.append("preferredTime", formData.timeSlot);
      payload.append("symptoms", JSON.stringify(formData.symptoms));
      payload.append("symptomDetails", formData.symptomDetails);
      payload.append("medications", formData.medications);
      if (referralFile) {
        payload.append("referralFile", referralFile);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/appointments`,
        {
          method: "POST",
          body: payload,
        },
      );

      if (!response.ok) {
        let message =
          "Something went wrong submitting your appointment. Please try again or contact us directly.";

        try {
          const data = await response.json();
          if (typeof data.message === "string") {
            message = data.message;
          } else if (Array.isArray(data.message)) {
            // class-validator sometimes returns an array of messages
            message = data.message[0];
          }
        } catch {
          // Response body wasn't JSON — fall back to the generic message above
        }

        // If the backend rejected the file specifically, show it inline
        // next to the upload field instead of a disruptive alert.
        if (response.status === 400 && /file/i.test(message)) {
          setErrors((prev) => ({ ...prev, referralFile: message }));
          setStep(2); // make sure the user is on the step where they can see it
          return;
        }

        throw new Error(message);
      }

      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong submitting your appointment. Please try again or contact us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-400 focus:ring-red-300"
        : "border-gray-200 focus:ring-[#0D9488]"
    }`;

  return (
    <>
      <Navbar />

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block bg-teal-50 text-[#0D9488] text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              Patient-Centered Diagnostics
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1220] mb-3">
              Schedule Your EEG Test
            </h1>
            <p className="text-gray-500 text-base">
              Take the first step toward neurological clarity. Our painless
              diagnostic procedures are handled by experts in a comfortable
              environment, ensuring you get accurate answers fast.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-8 overflow-x-auto">
                  {stepLabels.map((label, index) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 sm:gap-3 shrink-0"
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold shrink-0 ${index < step ? "bg-[#0D9488] text-white" : index === step ? "bg-[#0D9488] text-white" : "bg-gray-100 text-gray-400"}`}
                      >
                        {index < step ? "✓" : index + 1}
                      </div>
                      <span
                        className={`hidden sm:inline text-sm font-medium whitespace-nowrap ${index === step ? "text-[#0B1220]" : "text-gray-400"}`}
                      >
                        {label}
                      </span>
                      {index < stepLabels.length - 1 && (
                        <div className="w-6 sm:w-16 h-px bg-gray-200 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                {step === 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-[#0B1220] mb-5">
                      Personal Details
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) =>
                            updateField("fullName", e.target.value)
                          }
                          placeholder="John Doe"
                          className={inputClass("fullName")}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.fullName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={formData.dob}
                          onChange={(e) => updateField("dob", e.target.value)}
                          className={inputClass("dob")}
                        />
                        {errors.dob && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.dob}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Gender
                        </label>
                        <select
                          value={formData.gender}
                          onChange={(e) =>
                            updateField("gender", e.target.value)
                          }
                          className={inputClass("gender")}
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          placeholder="+256 ..."
                          className={inputClass("phone")}
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mb-8">
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="name@example.com"
                        className={inputClass("email")}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => goToStep(1)}
                        className="flex items-center gap-2 bg-[#0D9488] text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-[#0B7C71] transition-colors"
                      >
                        Next Step
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h3 className="text-sm font-semibold text-[#0B1220] mb-5">
                      Service &amp; Schedule
                    </h3>
                    <p className="text-xs font-medium text-gray-600 mb-3">
                      Select Required Service
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      {services.map((service) => {
                        const Icon = service.icon;
                        const selected = formData.service === service.id;
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => updateField("service", service.id)}
                            className={`flex items-start gap-3 text-left p-4 rounded-lg border transition-colors ${selected ? "border-[#0D9488] bg-teal-50" : "border-gray-200 bg-gray-50"}`}
                          >
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white shrink-0">
                              <Icon className="w-4 h-4 text-[#0D9488]" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#0B1220]">
                                {service.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                {service.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5 mb-8">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => updateField("date", e.target.value)}
                          className={inputClass("date")}
                        />
                        {errors.date && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.date}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Preferred Time Slot
                        </label>
                        <select
                          value={formData.timeSlot}
                          onChange={(e) =>
                            updateField("timeSlot", e.target.value)
                          }
                          className={inputClass("timeSlot")}
                        >
                          <option value="">Select a slot</option>
                          <option>8:00 AM - 10:00 AM</option>
                          <option>10:00 AM - 12:00 PM</option>
                          <option>1:00 PM - 3:00 PM</option>
                          <option>3:00 PM - 5:00 PM</option>
                        </select>
                        {errors.timeSlot && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.timeSlot}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => goToStep(0)}
                        className="flex items-center gap-2 border border-gray-300 text-[#0B1220] text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        onClick={() => goToStep(2)}
                        className="flex items-center gap-2 bg-[#0D9488] text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-[#0B7C71] transition-colors"
                      >
                        Next Step
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#0B1220] mb-2">
                      Symptom Details
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                      Please provide as much information as possible to help our
                      specialists prepare for your visit.
                    </p>

                    <p className="text-xs font-medium text-gray-600 mb-3">
                      Common Symptoms (Select all that apply)
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3 mb-2">
                      {symptomOptions.map((symptom) => (
                        <label
                          key={symptom}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-700 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.symptoms.includes(symptom)}
                            onChange={() => toggleSymptom(symptom)}
                            className="accent-[#0D9488]"
                          />
                          {symptom}
                        </label>
                      ))}
                    </div>
                    {errors.symptoms && (
                      <p className="text-xs text-red-500 mb-4">
                        {errors.symptoms}
                      </p>
                    )}

                    <div className="mb-6 mt-6">
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Describe your symptoms in detail
                      </label>
                      <textarea
                        rows={4}
                        value={formData.symptomDetails}
                        onChange={(e) =>
                          updateField("symptomDetails", e.target.value)
                        }
                        placeholder="How long have you had these symptoms? When do they occur?"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] resize-none"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Are you currently taking any medications? (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.medications}
                        onChange={(e) =>
                          updateField("medications", e.target.value)
                        }
                        placeholder="List medications and dosages"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                      />
                    </div>

                    <div className="mb-8">
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Medical Referral or Previous Test Results (Optional)
                      </label>
                      <label
                        htmlFor="referralFile"
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragActive(true);
                        }}
                        onDragLeave={() => setIsDragActive(false)}
                        onDrop={handleDrop}
                        className={`cursor-pointer border border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition-colors ${
                          isDragActive
                            ? "border-[#0D9488] bg-teal-50"
                            : "border-gray-300"
                        }`}
                      >
                        <input
                          id="referralFile"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) =>
                            handleFileSelect(e.target.files?.[0])
                          }
                        />
                        <Upload className="w-5 h-5 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PDF, JPG or PNG (Max 5MB)
                        </p>
                      </label>
                      {referralFile && (
                        <div className="flex items-center justify-between mt-3 px-4 py-2.5 rounded-lg bg-teal-50 text-sm">
                          <span className="text-[#0B1220] truncate">
                            {referralFile.name}
                          </span>
                          <button
                            type="button"
                            onClick={removeReferralFile}
                            className="text-xs text-red-500 hover:text-red-600 ml-3 shrink-0"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                      {errors.referralFile && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.referralFile}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => goToStep(1)}
                        className="flex items-center gap-2 border border-gray-300 text-[#0B1220] text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        onClick={handleConfirm}
                        disabled={isSubmitting}
                        className="bg-[#0D9488] text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-[#0B7C71] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : "Confirm Appointment"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {step < 2 && (
                <div className="relative rounded-2xl overflow-hidden h-56">
                  <img
                    src="/src/assets/expert-care.jpg"
                    alt="Doctor at her desk"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                    <h4 className="text-white font-semibold mb-1">
                      Expert Care, Every Time
                    </h4>
                    <p className="text-gray-200 text-sm max-w-md">
                      Our lead technicians and neurologists ensure your visit is
                      smooth and results are delivered with clinical precision.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Smile className="w-4 h-4 text-[#0B1220]" />
                  <h4 className="text-sm font-semibold text-[#0B1220]">
                    What to Expect
                  </h4>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-50 shrink-0">
                      <Smile className="w-4 h-4 text-[#0D9488]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0B1220]">
                        Painless Procedure
                      </p>
                      <p className="text-xs text-gray-500">
                        Non-invasive sensors are placed on the scalp without any
                        discomfort.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-50 shrink-0">
                      <Clock className="w-4 h-4 text-[#0D9488]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0B1220]">
                        Same-day Results
                      </p>
                      <p className="text-xs text-gray-500">
                        Walk out with your results and initial interpretation
                        ready for your doctor.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-50 shrink-0">
                      <Users className="w-4 h-4 text-[#0D9488]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0B1220]">
                        Professional Staff
                      </p>
                      <p className="text-xs text-gray-500">
                        Experienced electrophysiologists dedicated to your brain
                        health journey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0B1220] rounded-2xl p-6 text-white">
                <h4 className="text-sm font-semibold mb-2">Need Assistance?</h4>
                <p className="text-xs text-gray-300 mb-5">
                  Our team is available to answer any questions about the EEG
                  process or requirements.
                </p>
                <a
                  href="tel:+256751943706"
                  className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 mb-3 hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#5EEAD4]" />
                  <div>
                    <p className="text-xs text-gray-400">Call Us Directly</p>
                    <p className="text-sm font-semibold">+256 751 943 706</p>
                  </div>
                </a>
                <a
                  href="https://wa.me/256751943706"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#0D9488] rounded-lg px-4 py-3 hover:bg-[#0B7C71] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <div>
                    <p className="text-xs text-teal-50">WhatsApp Support</p>
                    <p className="text-sm font-semibold">Message Support</p>
                  </div>
                </a>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-50 mx-auto mb-3">
                  <Shield className="w-5 h-5 text-[#0D9488]" />
                </div>
                <h4 className="text-sm font-semibold text-[#0B1220] mb-1">
                  Secure &amp; Confidential
                </h4>
                <p className="text-xs text-gray-500">
                  Your medical data is encrypted and handled with absolute
                  privacy protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}

      <Footer />
    </>
  );
}

export default BookAppointment;
