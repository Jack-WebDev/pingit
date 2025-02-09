"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PasswordResetForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (step < 3) {
      setStep(step + 1);
    } else {
      router.replace("/login");
    }

    setLoading(false);
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
          Reset your password
        </h2>
        <div className="mt-4 flex justify-center space-x-2">
          {[1, 2, 3].map((number) => (
            <div
              key={number}
              className={`flex items-center ${number <= step ? "text-[hsl(var(--primary))]" : "text-gray-300"}`}
            >
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center border-2 
                ${number <= step ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-white" : "border-gray-300"}`}
              >
                {number < step ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{number}</span>
                )}
              </div>
              {number < 3 && (
                <div
                  className={`w-12 h-0.5 mx-2 ${
                    number < step ? "bg-[hsl(var(--primary))]" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 w-[90%] mx-auto md:w-1/2 lg:max-w-md">
        <div className="bg-[hsl(var(--secondary))] py-8 px-4 shadow rounded-xl sm:px-10">
          <motion.form
            key={step}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {step === 1 && (
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-200"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-500 focus:outline-none focus:ring-gray-200 focus:border-gray-200 :pla"
                  />
                  <Mail className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-200"
                >
                  Enter OTP
                </label>
                <div className="mt-1">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-text-200 focus:border-text-200"
                    maxLength={6}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-200">
                  We&apos;ve sent a code to{" "}
                  <span className="font-bold underline">{email}</span>
                </p>
              </div>
            )}

            {step === 3 && (
              <>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-200"
                  >
                    New Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                    />
                    <Lock className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-200"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                    />
                    <Lock className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
                  </div>
                </div>
              </>
            )}

            <div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-foreground))] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:[hsl(var(--primary))]"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    {step === 3 ? "Reset Password" : "Continue"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
