"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  Github,
  Chrome,
} from "lucide-react";
import Logo from "../../components/logo1";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // kept for your UI (not used unless you build credentials auth)
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // --- OAuth handlers (CONNECTED to /api/auth/* via NextAuth/Auth.js) ---
  const handleGoogle = async () => {
    try {
      setIsLoading("google");
      // This calls your NextAuth API: /api/auth/signin/google -> /api/auth/callback/google
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
      // signIn usually redirects; no need to unset loading
    } catch (e) {
      console.error(e);
      setIsLoading(null);
      alert("Google sign-in failed. Please try again.");
    }
  };

  const handleGithub = async () => {
    try {
      setIsLoading("github");
      await signIn("github", { callbackUrl: "/dashboard" });
    } catch (e) {
      console.error(e);
      setIsLoading(null);
      alert("GitHub sign-in failed. Please try again.");
    }
  };

  // Keeps your email/password UI intact.
  // If you want this to actually authenticate, you'll add a Credentials provider.
  const handleEmail = async () => {
    setIsLoading("email");
    // Placeholder: you can wire this later to Credentials provider or magic link.
    // For now, we keep the UI exactly as-is.
    setTimeout(() => setIsLoading(null), 1200);
    alert("Email/password auth isn’t wired yet. Use Google or GitHub.");
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030303] text-white flex overflow-hidden font-sans selection:bg-[#d4af37] selection:text-black">
      {/* Go Back Button */}
      <button
        type="button"
        onClick={() => router.push("/")}
        className="
          absolute top-6 left-6 z-50 cursor-pointer
          group flex items-center gap-2
          px-4 py-2
          bg-black/40 backdrop-blur-md
          border border-white/10 hover:border-[#d4af37]/40
          rounded-sm
          text-[10px] font-mono uppercase tracking-widest
          text-white/40 hover:text-[#d4af37]
          transition-all duration-300
        "
        aria-label="Go back home"
      >
        <ArrowLeft className="w-3 h-3 transition-transform duration-300 group-hover:-translate-x-1" />
        Home
      </button>

      {/* ==================================================================
          LEFT PANEL: CINEMATIC BRAND EXPERIENCE
      ================================================================== */}
      <div className="hidden lg:flex w-[55%] relative flex-col justify-between p-16 pt-26 overflow-hidden bg-[#050505]">
        {/* Generative Background Layers */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_60%)] blur-[100px] pointer-events-none" />
        </div>

        {/* Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 flex items-center gap-3"
        >
          <Logo className="w-10 h-10" />
          <span className="text-sm font-bold tracking-widest uppercase text-white/90">
            WebAiGen_ID
          </span>
        </motion.div>

        {/* MAIN HEADLINE */}
        <div className="relative z-20 space-y-6 max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-cormorant text-5xl md:text-7xl font-light italic leading-tight text-white"
          >
            Architect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fff] to-[#d4af37] bg-[length:200%_auto] animate-gradient-x not-italic font-normal">
              Tomorrow.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm md:text-base text-white/40 leading-relaxed font-sans max-w-md border-l border-[#d4af37]/30 pl-6"
          >
            Join the exclusive network of architects building the next generation
            of autonomous web infrastructure.
          </motion.p>
        </div>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative z-20 flex gap-12 text-[10px] font-mono text-white/30 uppercase tracking-widest"
        >
          <div>
            <span className="block text-[#d4af37] text-base font-sans font-bold mb-1">
              99.9%
            </span>
            Uptime
          </div>
          <div>
            <span className="block text-white text-base font-sans font-bold mb-1">
              1.2ms
            </span>
            Latency
          </div>
          <div>
            <span className="block text-white text-base font-sans font-bold mb-1">
              SOC2
            </span>
            Certified
          </div>
        </motion.div>
      </div>

      {/* ==================================================================
          RIGHT PANEL: ACCESS PORTAL
      ================================================================== */}
      <div className="w-full lg:w-[45%] flex items-center justify-center relative bg-[#080808] border-l border-white/5">
        {/* Mobile Background */}
        <div className="absolute inset-0 lg:hidden bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.05),transparent_50%)]" />

        <div className="w-full max-w-[400px] px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">
                Welcome back
              </h2>
              <p className="text-white/40 text-sm">
                Enter your credentials to access the terminal.
              </p>
            </div>

            {/* --- SOCIAL STACK --- */}
            <div className="space-y-3 mb-8">
              <button
                onClick={handleGoogle}
                disabled={!!isLoading}
                className="group relative w-full flex items-center justify-center gap-3 bg-white hover:bg-white/90 text-black h-11 rounded-lg font-medium text-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-70"
              >
                {isLoading === "google" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Chrome className="w-4 h-4" />
                    <span>Continue with Google</span>
                  </>
                )}
              </button>

              <button
                onClick={handleGithub}
                disabled={!!isLoading}
                className="group relative w-full flex items-center justify-center gap-3 bg-[#151515] hover:bg-[#222] border border-white/10 text-white h-11 rounded-lg font-medium text-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-70"
              >
                {isLoading === "github" ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                ) : (
                  <>
                    <Github className="w-4 h-4" />
                    <span>Continue with GitHub</span>
                  </>
                )}
              </button>
            </div>

            {/* --- DIVIDER --- */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] bg-white/10 flex-1" />
              <span className="text-[10px] uppercase tracking-widest text-white/20 font-mono">
                Or Manual Entry
              </span>
              <div className="h-[1px] bg-white/10 flex-1" />
            </div>

            {/* --- EMAIL FORM --- */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEmail();
              }}
              className="space-y-4"
            >
              <div className="space-y-4">
                <div
                  className={`
                    relative group bg-[#0f0f0f] border rounded-lg transition-all duration-300
                    ${
                      focusedField === "email"
                        ? "border-[#d4af37]/50 ring-1 ring-[#d4af37]/10"
                        : "border-white/10 hover:border-white/20"
                    }
                  `}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent p-3 text-sm text-white placeholder:text-white/20 outline-none rounded-lg font-sans"
                    placeholder="Email address"
                    autoComplete="email"
                  />
                </div>

                <div
                  className={`
                    relative group bg-[#0f0f0f] border rounded-lg transition-all duration-300
                    ${
                      focusedField === "password"
                        ? "border-[#d4af37]/50 ring-1 ring-[#d4af37]/10"
                        : "border-white/10 hover:border-white/20"
                    }
                  `}
                >
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent p-3 text-sm text-white placeholder:text-white/20 outline-none rounded-lg font-sans"
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <a
                  href="#"
                  className="text-xs text-white/30 hover:text-white transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <button
                disabled={!!isLoading}
                className="w-full h-11 bg-gradient-to-b from-[#222] to-black border border-white/10 hover:border-[#d4af37]/40 rounded-lg flex items-center justify-center gap-2 group transition-all duration-300 disabled:opacity-70"
              >
                {isLoading === "email" ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                ) : (
                  <>
                    <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                      Sign in with Email
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#d4af37] transition-all group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-[10px] text-white/20 leading-relaxed">
              By initializing access, you agree to the <br />
              <span className="underline hover:text-white/40 cursor-pointer">
                Protocol Terms
              </span>{" "}
              and{" "}
              <span className="underline hover:text-white/40 cursor-pointer">
                Data Directive
              </span>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
