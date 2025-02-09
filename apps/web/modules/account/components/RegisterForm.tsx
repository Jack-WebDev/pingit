"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    dayOfBirth: "",
    monthOfBirth: "",
    yearOfBirth: "",
    username: "",
    otp: "",
  });

  console.log(formData)

  const steps = [
    { title: "Account", description: "Basic info" },
    { title: "Profile", description: "Username" },
    { title: "Verify", description: "OTP check" },
  ];

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push("/login");
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-6">
      <span
        onClick={() => router.back()}
        className="text-gray-200 font-semibold cursor-pointer hover:underline"
      >
        Go Back Home
      </span>
      <div className="max-w-md w-full bg-[hsl(var(--secondary))] rounded-xl p-8 text-gray-200">
        <div className="mb-8">
          <div className="relative flex justify-between">

            {/* Step Indicators */}
            {steps.map((s, index) => (
              <div key={index} className="relative flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    step > index + 1
                      ? "bg-[hsl(var(--primary))] border-[hsl(var(--primary))] text-white"
                      : step === index + 1
                        ? "bg-white border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
                        : "bg-white border-gray-300 text-gray-300"
                  }`}
                >
                  {step > index + 1 ? <Check size={20} /> : index + 1}
                </div>
                <div className="absolute -bottom-10 text-center">
                  <div className={`text-sm font-medium text-gray-200`}>
                    {s.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          key={step}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
          className="mt-16"
        >
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">
                Create Account
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                  required
                />
              </div>
              <div className="flex justify-evenly items-center gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Day
                  </label>
                  <input
                    type="text"
                    name="dayOfBirth"
                    value={formData.dayOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Month
                  </label>
                  <input
                    type="text"
                    name="monthOfBirth"
                    value={formData.monthOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    name="yearOfBirth"
                    value={formData.yearOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">
                Choose Your Username
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                  required
                />
                <p className="text-md my-4">
                  Your full username will be{" "}
                  <span className="font-bold">{`@${formData.username}.pingit`}</span>
                </p>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">
                Verify Email
              </h2>
              <div className="text-center mb-6">
                <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
                  <Mail className="w-6 h-6 text-[hsl(var(--primary))]" />
                </div>
                <p className="text-gray-300">
                  We&apos;ve sent a code to your email
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent text-center tracking-widest"
                  maxLength={6}
                  required
                />
              </div>
            </form>
          )}

          <div className="flex gap-4 mt-6">
            {step > 1 && (
              <button
                onClick={handlePrevStep}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            )}
            <button
              onClick={handleNextStep}
              className={`flex-1 px-6 py-3 bg-[hsl(var(--primary))] text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-[hsl(var(--primary-foreground))] transition-colors ${
                step === 1 ? "w-full" : ""
              }`}
            >
              <span>{step === 3 ? "Create Account" : "Continue"}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
