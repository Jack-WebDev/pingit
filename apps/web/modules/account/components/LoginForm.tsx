"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@pingit/ui";
import { Input } from "@pingit/ui";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, AtSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});
export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-8 border border-slate-500 p-8"
      >
        <motion.div variants={itemVariants} className="space-y-6 lg:pr-8">
          <div className="space-y-2">
            <motion.h1
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[#FF9EDB] bg-clip-text text-transparent text-center"
              whileHover={{ scale: 1.02 }}
            >
              Welcome Back
            </motion.h1>
            <p className="text-gray-400 text-center">
              Sign in to your account to continue
            </p>
          </div>

          <div className="hidden lg:flex justify-center items-center w-full h-[75%]">
            <motion.div
              className="relative h-64 w-64"
              animate={{
                rotate: [0, 5, -5, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Image
                src="/logo.webp"
                alt="Pingit Logo"
                width={200}
                height={100}
                className="rounded-2xl"
              />
            </motion.div>
          </div>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          placeholder="Enter your username"
                          {...field}
                          className="bg-slate-900/50 border-slate-700 pl-10 h-12 rounded-xl focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                          className="bg-slate-900/50 border-slate-700 pl-10 h-12 rounded-xl focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="mt-4 text-gray-100 font-medium text-end">
                <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-between gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.replace("/")}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-700/50 text-gray-300 hover:bg-slate-700 transition-colors"
                type="button"
              >
                <ArrowLeft className="h-4 w-4 hidden md:inline-block" />
                Back
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-xl bg-[hsl(var(--primary))] text-white font-medium hover:bg-[hsl(var(--primary)_/_0.9)] transition-colors"
                type="submit"
              >
                Sign In
              </motion.button>
            </motion.div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
