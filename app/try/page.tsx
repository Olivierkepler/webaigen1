"use client";
import React from 'react';
// import Container from './container';
// import Button from './button';
import { Sparkles, ArrowRight, Layers, MousePointer2 } from 'lucide-react';
import { motion } from 'framer-motion';
// import Carossel from './carossel';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-24 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[300px] h-[300px] bg-pink-100 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-indigo-100 rounded-full blur-[120px] opacity-40"></div>
      </div>

      {/* <Container> */}
        <div className="flex flex-col items-center text-center">
       
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-semibold mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Now with Gemini Pro 2.5 Integration</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 max-w-4xl leading-[1.1]"
          >
            Design and build at the <span className="text-pink-600 italic">speed of light</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-xl text-zinc-500 max-w-2xl leading-relaxed"
          >
            WebAiGen provides a premium platform for developers and agencies to ship faster, 
            look better, and dominate the digital landscape.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            {/* <Button size="lg" className="gap-2 group w-full sm:w-auto">
              Start Building Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Book a Demo
            </Button> */}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale"
          >
            <span className="font-bold text-2xl tracking-tighter">FORBES</span>
            <span className="font-bold text-2xl tracking-tighter">TECHCRUNCH</span>
            <span className="font-bold text-2xl tracking-tighter">WIRED</span>
            <span className="font-bold text-2xl tracking-tighter">VERGE</span>
          </motion.div>
        </div>

        {/* Feature Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 relative"
        >
        {/* <Carossel /> */}
          {/* Accent decoration */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl -z-10 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>
        </motion.div>
      {/* </Container> */}
    </section>
  );
};

export default Hero;