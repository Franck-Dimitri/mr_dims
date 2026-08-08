import React, { useEffect } from "react";
import { Link } from "@inertiajs/react";
import { renderCanvas, ShineBorder, TypeWriter } from "@/Components/ui/hero-designali";
import { Plus, ArrowRight, MessageSquare, Code2, Sparkles } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useLanguage } from "@/Context/LanguageContext";

export default function CreativePlaygroundSection({ onOpenCv }) {
  const { lang } = useLanguage() || { lang: "fr" };

  const talkAboutFR = [
    "Architecture Full Stack",
    "Solutions Laravel & React",
    "APIs REST & GraphQL",
    "UI/UX Design Blueprint",
    "DevOps & VPS Linux",
    "Optimisation & Sécurité",
  ];

  const talkAboutEN = [
    "Full Stack Architecture",
    "Laravel & React Solutions",
    "REST & GraphQL APIs",
    "UI/UX Blueprint Design",
    "DevOps & Linux VPS",
    "Optimization & Security",
  ];

  const talkAbout = lang === "en" ? talkAboutEN : talkAboutFR;

  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <section className="relative overflow-hidden border-t border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 py-20 bg-white dark:bg-[#070A10]">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 max-md:hidden top-[100px] -z-10 h-[500px] w-full bg-transparent bg-[linear-gradient(to_right,#2563eb15_1px,transparent_1px),linear-gradient(to_bottom,#2563eb15_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#22d3ee20_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee20_1px,transparent_1px)]"></div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center relative z-10 font-sans">
        
        {/* Badge Intro */}
        <div className="mb-6 sm:justify-center">
          <div className="relative flex items-center rounded-full border border-blueprint-bluePrimary/30 dark:border-blueprint-cyan/30 bg-blueprint-bluePrimary/5 dark:bg-blueprint-cyan/10 px-4 py-1.5 text-xs text-blueprint-bluePrimary dark:text-blueprint-cyan font-mono tracking-wider">
            <Sparkles className="w-3.5 h-3.5 mr-2 animate-pulse" />
            {lang === "en" ? "Interactive Architecture V2.0" : "Architecture Interactive V2.0"}
          </div>
        </div>

        {/* Interactive Main Box */}
        <div className="mx-auto max-w-5xl w-full">
          <div className="relative mx-auto h-full bg-white/50 dark:bg-[#0B0F19]/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 py-12 p-6 sm:p-10 rounded-2xl shadow-2xl">
            
            {/* Blueprint Decorative Pluses */}
            <Plus strokeWidth={3} className="text-blueprint-bluePrimary dark:text-blueprint-cyan absolute -left-4 -top-4 h-8 w-8" />
            <Plus strokeWidth={3} className="text-blueprint-bluePrimary dark:text-blueprint-cyan absolute -bottom-4 -left-4 h-8 w-8" />
            <Plus strokeWidth={3} className="text-blueprint-bluePrimary dark:text-blueprint-cyan absolute -right-4 -top-4 h-8 w-8" />
            <Plus strokeWidth={3} className="text-blueprint-bluePrimary dark:text-blueprint-cyan absolute -bottom-4 -right-4 h-8 w-8" />

            <h2 className="flex flex-col text-center text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl text-blueprint-textDark dark:text-white">
              <span>
                {lang === "en" ? "Engineering Your Vision into " : "Propulsez vos projets avec "}
                <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">
                  {lang === "en" ? "Digital Reality." : "Excellence."}
                </span>
              </span>
            </h2>

            <div className="flex items-center mt-6 justify-center gap-2">
              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              <p className="text-xs font-mono font-bold text-green-500 tracking-wider">
                {lang === "en" ? "System Ready / Available for Freelance & Contracts" : "Disponible pour projets & missions freelance"}
              </p>
            </div>
          </div>

          {/* Subtitle & TypeWriter */}
          <div className="mt-8 text-xl sm:text-2xl font-medium text-blueprint-textDark dark:text-gray-200">
            {lang === "en" ? "Welcome to my engineering space! I'm " : "Bienvenue dans mon univers d'ingénierie ! Je suis "}
            <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan font-extrabold">
              Franck Dimitri (Mr Dim's)
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 py-4 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
            {lang === "en"
              ? "Expert in designing scalable systems, robust web applications, and precision interfaces specializing in "
              : "Expert dans la conception d'architectures scalables, d'applications web robustes et d'interfaces haute précision spécialisé en "}
            <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold inline-block min-w-[220px]">
              <TypeWriter strings={talkAbout} />
            </span>
            .
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <Link href="/projects">
              <ShineBorder
                borderWidth={2}
                className="border cursor-pointer h-auto w-auto p-1 bg-white/80 dark:bg-[#0B0F19]/90 backdrop-blur-md"
                color={["#2563EB", "#22D3EE", "#3B82F6"]}
              >
                <Button className="w-full rounded-xl gap-2 font-bold uppercase tracking-wider text-xs px-6 py-3">
                  <Code2 className="w-4 h-4" />
                  {lang === "en" ? "Explore Projects" : "Explorer les Projets"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </ShineBorder>
            </Link>

            <Link href="/contact">
              <Button variant="outline" className="rounded-xl gap-2 font-bold uppercase tracking-wider text-xs px-6 py-3.5 border-blueprint-bluePrimary/30 dark:border-blueprint-cyan/30 text-blueprint-bluePrimary dark:text-blueprint-cyan hover:bg-blueprint-bluePrimary/10">
                <MessageSquare className="w-4 h-4" />
                {lang === "en" ? "Start a Project" : "Lancer un Projet"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Wave Canvas */}
      <canvas
        className="pointer-events-none absolute inset-0 mx-auto w-full h-full z-0 opacity-40 dark:opacity-60"
        id="canvas"
      ></canvas>
    </section>
  );
}
