"use client"

// import Navbar from "./Navbar";
import LogoLoader from "../components/LogoLoader";
import NeuralTriad from "./NeuralTriad";

import { useEffect, useState } from "react";

export  default function page(){
    const [isLoading, setIsLoading] = useState(true);
  
 

    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 2000);
      document.documentElement.style.scrollBehavior = "smooth";
      return () => clearTimeout(timer);
    }, []);
return (
    <div >
<div
        className={`fixed  inset-0 z-[100] bg-[#050505] flex items-center justify-center transition-transform duration-[1500ms] cubic-bezier ${
          !isLoading ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <LogoLoader size={250} label="WebAiGen" />
      </div>

<NeuralTriad/>
        {/* <Navbar/> */}
    </div>
)
}