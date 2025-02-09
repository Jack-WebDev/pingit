"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@pingit/ui";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const handleCreateAccount = () => {
    router.push("/register");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-6">
      <motion.div
        className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-2xl"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image
          src="/logo.webp"
          alt="Pingit Logo"
          width={200}
          height={100}
          style={{ objectFit: "cover" }}
        />
      </motion.div>
      <motion.h1
        className="text-4xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[#FF9EDB]  bg-clip-text text-transparent"
        animate={{
          backgroundPosition: ["0%", "100%"],
          transition: {
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      >
        PingIt
      </motion.h1>
      <p className="text-gray-300 text-lg">What&apos;s up?</p>
      <div className="flex flex-col items-center justify-center space-y-4  w-[70%] md:w-[20%]">
        <Button
          onClick={handleLogin}
          className="w-full px-6 py-4 bg-[hsl(var(--secondary))] text-white font-medium rounded-xl shadow-md transition-all duration-300 hover:bg-[hsl(var(--secondary-foreground))] hover:shadow-lg"
        >
          Login
        </Button>
        <Button
          onClick={handleCreateAccount}
          className="w-full px-6 py-4 bg-[hsl(var(--primary))] text-white font-medium rounded-xl shadow-md transition-all duration-300 hover:[hsl(var(--primary-foreground))] hover:shadow-lg"
        >
          Create Account
        </Button>
      </div>
    </div>
  );
}
