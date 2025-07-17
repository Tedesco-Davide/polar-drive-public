// "use client";

// import { GetStaticProps } from "next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { useTranslation } from "next-i18next";
// import { useEffect, useState, useRef } from "react";
// import { useRouter } from "next/router";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import Head from "next/head";
// import Header from "./header";
// import Image from "next/image";
// import {
//   ArrowRight,
//   Brain,
//   Battery,
//   Radar,
//   Shield,
//   FileText,
//   Building2,
//   Truck,
//   Zap,
//   Lock,
//   CheckCircle,
//   Users,
//   Award,
//   TrendingUp,
//   Briefcase,
//   Landmark,
//   Compass,
//   Car,
//   Thermometer,
//   Volume2,
//   Wind,
//   Settings,
//   Activity,
//   Cpu,
//   Radio,
//   ChevronRight,
//   Beaker,
//   Target,
//   BarChart3,
//   Wrench,
//   Lightbulb,
//   Microscope,
// } from "lucide-react";

// // Register GSAP plugins
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// export default function PolarDrivePage() {
//   const { t, ready } = useTranslation("polardrive");
//   const router = useRouter();
//   const [mounted, setMounted] = useState(false);
//   const heroRef = useRef<HTMLElement>(null);
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const quoteRef = useRef<HTMLParagraphElement>(null);
//   const particlesRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setMounted(true);

//     // Create particle system
//     createParticleSystem();

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, [router.locale]);

//   useEffect(() => {
//     if (mounted && ready) {
//       // ✅ Pulisce tutti i trigger esistenti prima di crearne di nuovi
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

//       // ✅ Aspetta un frame per assicurarsi che il DOM sia pronto
//       requestAnimationFrame(() => {
//         // Animate elements on scroll
//         gsap.utils
//           .toArray<Element>(".animate-on-scroll")
//           .forEach((element: Element) => {
//             gsap.fromTo(
//               element,
//               { opacity: 0, y: 50 },
//               {
//                 opacity: 1,
//                 y: 0,
//                 duration: 0.8,
//                 ease: "power3.out",
//                 scrollTrigger: {
//                   trigger: element,
//                   start: "top 85%",
//                   end: "bottom 15%",
//                   toggleActions: "play none none reverse",
//                   refreshPriority: -1,
//                 },
//               }
//             );
//           });

//         // Staggered animations for cards
//         gsap.utils
//           .toArray<Element>(".card-stagger")
//           .forEach((element: Element, index: number) => {
//             gsap.fromTo(
//               element,
//               { opacity: 0, y: 30, scale: 0.95 },
//               {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 duration: 0.6,
//                 ease: "back.out(1.2)",
//                 delay: index * 0.1,
//                 scrollTrigger: {
//                   trigger: element,
//                   start: "top 85%",
//                   toggleActions: "play none none reverse",
//                   refreshPriority: -1,
//                 },
//               }
//             );
//           });

//         // ✅ Refresh ScrollTrigger dopo aver impostato tutti i trigger
//         ScrollTrigger.refresh();
//       });

//       // Hero animations
//       if (titleRef.current && quoteRef.current) {
//         const tl = gsap.timeline();

//         gsap.set([titleRef.current, quoteRef.current], {
//           opacity: 0,
//           y: 60,
//         });

//         tl.to(titleRef.current, {
//           opacity: 1,
//           y: 0,
//           duration: 0.8,
//           ease: "power3.out",
//         }).to(
//           quoteRef.current,
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.6,
//             ease: "power3.out",
//           },
//           "-=0.4"
//         );
//       }
//     }
//   }, [mounted, ready, router.locale]);

//   // ✅ Nuovo useEffect per gestire i cambi di rotta
//   useEffect(() => {
//     const handleRouteChange = () => {
//       setTimeout(() => {
//         ScrollTrigger.refresh();
//       }, 100);
//     };

//     router.events.on("routeChangeComplete", handleRouteChange);

//     return () => {
//       router.events.off("routeChangeComplete", handleRouteChange);
//     };
//   }, [router]);

//   // ✅ useEffect separato per monitorare i cambi di locale
//   useEffect(() => {
//     if (ready) {
//       setTimeout(() => {
//         ScrollTrigger.refresh();
//       }, 200);
//     }
//   }, [ready, router.locale]);

//   const createParticleSystem = () => {
//     if (!particlesRef.current) return;

//     const particleCount = 25;
//     const container = particlesRef.current;

//     container.innerHTML = "";

//     for (let i = 0; i < particleCount; i++) {
//       const particle = document.createElement("div");
//       particle.className = "particle";
//       particle.style.cssText = `
//         position: absolute;
//         width: 2px;
//         height: 2px;
//         background: rgba(167, 198, 237, 0.6);
//         border-radius: 50%;
//         left: ${Math.random() * 100}%;
//         animation: particle-float ${Math.random() * 15 + 10}s linear infinite;
//         animation-delay: ${Math.random() * 25}s;
//       `;
//       container.appendChild(particle);
//     }
//   };

//   const scrollToContacts = () => {
//     const anchorTarget = "#contacts";

//     if (router.pathname !== "/") {
//       window.location.href = `/${anchorTarget}`;
//     } else {
//       const element = document.querySelector(anchorTarget);
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   };

//   // ✅ LOADING STATE CORRETTO - Nessuna chiamata a t() qui
//   if (!mounted || !ready) {
//     return (
//       <>
//         <Head>
//           <title>PolarDrive™ - Automotive R&D Intelligence Platform</title>
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//           <link rel="icon" href="/favicon.ico" />
//         </Head>

//         {/* AGGIUNGI QUESTO GRADIENTE ANCHE QUI! */}
//         <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-900 z-0" />

//         {/* SVG Background */}
//         <svg
//           className="fixed inset-0 w-screen h-screen z-10"
//           viewBox="0 0 1920 1080"
//           preserveAspectRatio="xMidYMid slice"
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             zIndex: 10,
//           }}
//         >
//           <defs>
//             <pattern
//               id="hexGridMission"
//               width="100"
//               height="87"
//               patternUnits="userSpaceOnUse"
//             >
//               <polygon
//                 points="50,0 93.3,25 93.3,62 50,87 6.7,62 6.7,25"
//                 fill="transparent"
//                 stroke="#3b82f6"
//                 strokeWidth="1"
//                 opacity="0.15"
//               />
//               <circle cx="50" cy="43.5" r="2" fill="#06b6d4" opacity="0.4" />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#hexGridMission)" />
//         </svg>

//         {/* Particle System Background */}
//         <div
//           ref={particlesRef}
//           className="fixed inset-0 pointer-events-none z-20"
//         />
//       </>
//     );
//   }

//   // ✅ CONTENUTO PRINCIPALE - Solo qui usiamo t()
//   const benefits = [
//     {
//       icon: Brain,
//       title: t("benefits.automated_analysis.title"),
//       description: t("benefits.automated_analysis.description"),
//     },
//     {
//       icon: Battery,
//       title: t("benefits.ev_vs_ice_analysis.title"),
//       description: t("benefits.ev_vs_ice_analysis.description"),
//     },
//     {
//       icon: Radar,
//       title: t("benefits.premium_vehicle_testing.title"),
//       description: t("benefits.premium_vehicle_testing.description"),
//     },
//     {
//       icon: Shield,
//       title: t("benefits.tire_technology_research.title"),
//       description: t("benefits.tire_technology_research.description"),
//     },
//     {
//       icon: FileText,
//       title: t("benefits.automotive_ai_development.title"),
//       description: t("benefits.automotive_ai_development.description"),
//     },
//     {
//       icon: TrendingUp,
//       title: t("benefits.sustainability_engineering.title"),
//       description: t("benefits.sustainability_engineering.description"),
//     },
//   ];

//   const targetAudience = [
//     {
//       icon: Building2,
//       title: t("target_audience.oem_manufacturers.title"),
//       description: t("target_audience.oem_manufacturers.description"),
//     },
//     {
//       icon: Zap,
//       title: t("target_audience.automotive_suppliers.title"),
//       description: t("target_audience.automotive_suppliers.description"),
//     },
//     {
//       icon: Truck,
//       title: t("target_audience.research_institutes.title"),
//       description: t("target_audience.research_institutes.description"),
//     },
//     {
//       icon: Landmark,
//       title: t("target_audience.luxury_brands.title"),
//       description: t("target_audience.luxury_brands.description"),
//     },
//     {
//       icon: Briefcase,
//       title: t("target_audience.ev_companies.title"),
//       description: t("target_audience.ev_companies.description"),
//     },
//     {
//       icon: Users,
//       title: t("target_audience.tech_automotive.title"),
//       description: t("target_audience.tech_automotive.description"),
//     },
//   ];

//   const researchAreas = [
//     {
//       icon: Thermometer,
//       title: t("research_areas.thermal_management.title"),
//       description: t("research_areas.thermal_management.description"),
//     },
//     {
//       icon: Volume2,
//       title: t("research_areas.nvh_engineering.title"),
//       description: t("research_areas.nvh_engineering.description"),
//     },
//     {
//       icon: Wind,
//       title: t("research_areas.aerodynamics.title"),
//       description: t("research_areas.aerodynamics.description"),
//     },
//     {
//       icon: Settings,
//       title: t("research_areas.vehicle_dynamics.title"),
//       description: t("research_areas.vehicle_dynamics.description"),
//     },
//     {
//       icon: Activity,
//       title: t("research_areas.powertrain_integration.title"),
//       description: t("research_areas.powertrain_integration.description"),
//     },
//     {
//       icon: Cpu,
//       title: t("research_areas.safety_systems.title"),
//       description: t("research_areas.safety_systems.description"),
//     },
//     {
//       icon: Battery,
//       title: t("research_areas.battery_technology.title"),
//       description: t("research_areas.battery_technology.description"),
//     },
//     {
//       icon: Radio,
//       title: t("research_areas.vehicle_connectivity.title"),
//       description: t("research_areas.vehicle_connectivity.description"),
//     },
//   ];

//   const testVehicles = [
//     {
//       category: t("test_vehicles.supercar.category"),
//       models: t("test_vehicles.supercar.models"),
//       budget: t("test_vehicles.supercar.budget"),
//       focus: t("test_vehicles.supercar.focus"),
//     },
//     {
//       category: t("test_vehicles.electric_luxury.category"),
//       models: t("test_vehicles.electric_luxury.models"),
//       budget: t("test_vehicles.electric_luxury.budget"),
//       focus: t("test_vehicles.electric_luxury.focus"),
//     },
//     {
//       category: t("test_vehicles.luxury_suv.category"),
//       models: t("test_vehicles.luxury_suv.models"),
//       budget: t("test_vehicles.luxury_suv.budget"),
//       focus: t("test_vehicles.luxury_suv.focus"),
//     },
//     {
//       category: t("test_vehicles.hybrid_performance.category"),
//       models: t("test_vehicles.hybrid_performance.models"),
//       budget: t("test_vehicles.hybrid_performance.budget"),
//       focus: t("test_vehicles.hybrid_performance.focus"),
//     },
//   ];

//   const complianceFeatures = [
//     t("compliance.gdpr_conformity"),
//     t("compliance.data_protection_design"),
//     t("compliance.aggregated_treatment"),
//     t("compliance.consent_collection"),
//   ];

//   const securityFeatures = [
//     t("security.encrypted_interactions"),
//     t("security.lightweight_engine"),
//     t("security.cyber_hygiene"),
//     t("security.protection_violations"),
//   ];

//   return (
//     <>
//       <Head>
//         <title>PolarDrive™ - Automotive R&D Intelligence Platform</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta
//           name="description"
//           content="Piattaforma di ricerca e sviluppo automotive che trasforma veicoli premium in laboratori di innovazione tecnologica per l'industria automotive del futuro"
//         />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-900 z-0" />

//       {/* SVG Background */}
//       <svg
//         className="fixed inset-0 w-screen h-screen z-0"
//         viewBox="0 0 1920 1080"
//         preserveAspectRatio="xMidYMid slice"
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100vw",
//           height: "100vh",
//           zIndex: 0,
//         }}
//       >
//         <defs>
//           <pattern
//             id="hexGridMission"
//             width="100"
//             height="87"
//             patternUnits="userSpaceOnUse"
//           >
//             <polygon
//               points="50,0 93.3,25 93.3,62 50,87 6.7,62 6.7,25"
//               fill="transparent"
//               stroke="#3b82f6"
//               strokeWidth="1"
//               opacity="0.15"
//             />
//             <circle cx="50" cy="43.5" r="2" fill="#06b6d4" opacity="0.4" />
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#hexGridMission)" />
//       </svg>

//       {/* Particle System Background */}
//       <div
//         ref={particlesRef}
//         className="fixed inset-0 pointer-events-none z-20"
//       />

//       {/* Main Content */}
//       <div className="relative z-30">
//         <Header />

//         {/* Hero Section */}
//         <section
//           ref={heroRef}
//           className="relative w-full overflow-hidden min-h-screen flex items-center pt-16"
//         >
//           <div className="relative z-20 container mx-auto pt-5 pb-20 lg:p-20">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
//               {/* Text Content */}
//               <div className="space-y-8">
//                 <div>
//                   <div className="mb-4">
//                     <span className="inline-flex items-center gap-2 px-4 py-2 bg-coldIndigo/10 border border-coldIndigo/20 rounded-full text-sm font-semibold text-coldIndigo dark:text-glacierBlue">
//                       <Car className="w-4 h-4" />
//                       {t("hero.badge")}
//                     </span>
//                   </div>

//                   <h1
//                     ref={titleRef}
//                     className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
//                   >
//                     <span className="bg-gradient-to-r from-coldIndigo via-glacierBlue to-coldIndigo bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x">
//                       PolarDrive™
//                     </span>
//                   </h1>

//                   <h2 className="text-2xl md:text-3xl font-bold mb-8 text-polarNight dark:text-articWhite">
//                     {t("hero.subtitle")}
//                   </h2>

//                   {/* Quote */}
//                   <div className="relative">
//                     <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-coldIndigo to-glacierBlue rounded-full" />
//                     <blockquote className="text-xl md:text-2xl font-semibold text-polarNight dark:text-articWhite mb-8 italic pl-8 relative">
//                       <span className="text-6xl text-coldIndigo/30 absolute -top-4 -left-2">
//                         &quot;
//                       </span>
//                       {t("hero.quote")}
//                       <span className="text-6xl text-coldIndigo/30 absolute -bottom-8 right-0">
//                         &quot;
//                       </span>
//                     </blockquote>
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   {/* Description */}
//                   <div className="relative p-6 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-gray-300 dark:border-white/10">
//                     <p className="text-lg md:text-xl leading-relaxed text-polarNight/90 dark:text-articWhite/90">
//                       {t("hero.description")}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Product Image */}
//               <div className="relative mt-8 lg:mt-0">
//                 <div className="relative h-full">
//                   <div className="absolute inset-0 bg-gradient-to-br from-coldIndigo/30 to-glacierBlue/30 rounded-3xl blur-2xl animate-pulse" />
//                   <div className="relative w-full h-64 md:h-80 lg:h-full bg-gradient-to-br from-coldIndigo/20 to-glacierBlue/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-gray-300 dark:border-white/10 overflow-hidden lg:mb-0">
//                     <div className="absolute inset-0 bg-[length:40px_40px] bg-[linear-gradient(to_right,rgba(59,130,246,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.15)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(167,198,237,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(167,198,237,0.08)_1px,transparent_1px)] animate-[gridPulse_4s_ease-in-out_infinite]" />

//                     <div className="relative w-full h-full p-6 md:p-8">
//                       <Image
//                         src="/logo/PolarDrive_Logo.svg"
//                         alt="PolarDrive Logo"
//                         fill
//                         className="object-contain drop-shadow-2xl"
//                         priority
//                       />
//                     </div>

//                     {/* Floating elements */}
//                     <div
//                       className="absolute top-6 left-6 w-6 h-6 border-2 border-coldIndigo/40 rounded-full animate-spin"
//                       style={{ animationDuration: "8s" }}
//                     />
//                     <div
//                       className="absolute top-12 right-8 w-4 h-4 bg-glacierBlue/40 rounded-full animate-bounce"
//                       style={{ animationDelay: "1s", animationDuration: "2s" }}
//                     />
//                     <div
//                       className="absolute bottom-8 left-12 w-8 h-8 border border-coldIndigo/30 rotate-45 animate-pulse"
//                       style={{ animationDelay: "2s" }}
//                     />
//                     <div
//                       className="absolute bottom-6 right-6 w-5 h-5 bg-gradient-to-r from-coldIndigo/40 to-glacierBlue/40 rounded-full animate-ping"
//                       style={{ animationDelay: "0.5s" }}
//                     />
//                   </div>

//                   <div
//                     className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-coldIndigo/30 p-4"
//                     style={{ animationDuration: "3s", animationDelay: "2s" }}
//                   >
//                     <div className="text-coldIndigo dark:text-glacierBlue font-bold text-lg">
//                       R&D
//                     </div>
//                     <div className="text-xs text-polarNight/60 dark:text-articWhite/60">
//                       {t("hero.rd_powered")}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* What is PolarDrive */}
//             <div className="relative mt-16">
//               <div className="absolute inset-0 bg-gradient-to-r from-coldIndigo/5 to-glacierBlue/5 rounded-3xl blur-xl" />
//               <div className="relative border border-coldIndigo/20 bg-white/5 backdrop-blur-sm rounded-3xl p-8">
//                 <div className="flex items-center gap-4 mb-6">
//                   <Microscope className="w-8 h-8 text-coldIndigo dark:text-glacierBlue" />
//                   <h2 className="text-2xl md:text-3xl font-bold text-coldIndigo dark:text-glacierBlue">
//                     {t("what_is.title")}
//                   </h2>
//                 </div>

//                 <div className="space-y-4 text-base md:text-lg leading-relaxed text-polarNight/80 dark:text-articWhite/80">
//                   <p className="flex items-start gap-3">
//                     <span className="w-2 h-2 bg-coldIndigo rounded-full mt-3 flex-shrink-0" />
//                     {t("what_is.point1")}
//                   </p>
//                   <p className="flex items-start gap-3">
//                     <span className="w-2 h-2 bg-glacierBlue rounded-full mt-3 flex-shrink-0" />
//                     {t("what_is.point2")}
//                   </p>
//                   <p className="flex items-start gap-3">
//                     <span className="w-2 h-2 bg-coldIndigo rounded-full mt-3 flex-shrink-0" />
//                     {t("what_is.point3")}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Research Justification */}
//             <div className="mt-16 animate-on-scroll">
//               <div className="p-8 bg-gradient-to-r from-coldIndigo/5 to-glacierBlue/5 backdrop-blur-sm rounded-3xl border border-coldIndigo/20">
//                 <div className="flex items-center gap-4 mb-6">
//                   <Beaker className="w-8 h-8 text-coldIndigo dark:text-glacierBlue" />
//                   <h3 className="text-2xl font-bold text-coldIndigo dark:text-glacierBlue">
//                     {t("test_vehicles.justification.title")}
//                   </h3>
//                 </div>
//                 <p className="text-lg text-polarNight/80 dark:text-articWhite/80 leading-relaxed">
//                   {t("test_vehicles.justification.description")}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Research Areas Section */}
//         <section className="relative w-full overflow-hidden pt-10 pb-8 md:pt-24 md:pb-24 px-6">
//           <div className="relative z-20 max-w-7xl mx-auto">
//             <div className="text-center mb-16 animate-on-scroll">
//               <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-coldIndigo to-glacierBlue bg-clip-text text-transparent">
//                 {t("research_areas.title")}
//               </h2>
//               <p className="text-xl text-polarNight/80 dark:text-articWhite/80 max-w-4xl mx-auto">
//                 {t("research_areas.subtitle")}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {researchAreas.map((area, index) => {
//                 const Icon = area.icon;
//                 return (
//                   <div
//                     key={index}
//                     className="card-stagger p-6 bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-300 dark:border-white/10 hover:border-coldIndigo/30 transition-all duration-300 group text-center"
//                   >
//                     <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-coldIndigo/20 to-glacierBlue/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                       <Icon className="w-8 h-8 text-coldIndigo dark:text-glacierBlue" />
//                     </div>
//                     <h3 className="text-lg font-bold mb-3 text-coldIndigo dark:text-glacierBlue">
//                       {area.title}
//                     </h3>
//                     <p className="text-sm text-polarNight/70 dark:text-articWhite/70 leading-relaxed">
//                       {area.description}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         {/* Test Vehicles Section */}
//         <section className="relative w-full overflow-hidden pt-5 pb-8 md:pt-24 md:pb-24 px-6">
//           <div className="relative z-20 max-w-7xl mx-auto">
//             <div className="text-center mb-16 animate-on-scroll">
//               <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-coldIndigo to-glacierBlue bg-clip-text text-transparent">
//                 {t("test_vehicles.title")}
//               </h2>
//               <p className="text-xl text-polarNight/80 dark:text-articWhite/80 max-w-4xl mx-auto">
//                 {t("test_vehicles.subtitle")}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {testVehicles.map((vehicle, index) => (
//                 <div
//                   key={index}
//                   className="card-stagger p-8 bg-gradient-to-br from-coldIndigo/10 to-glacierBlue/10 backdrop-blur-sm rounded-3xl border border-coldIndigo/20 group hover:border-coldIndigo/40 transition-all duration-300"
//                 >
//                   <div className="flex items-center gap-4 mb-6">
//                     <div className="w-12 h-12 bg-coldIndigo/20 rounded-xl flex items-center justify-center">
//                       <Car className="w-6 h-6 text-coldIndigo dark:text-glacierBlue" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-coldIndigo dark:text-glacierBlue">
//                       {vehicle.category}
//                     </h3>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-semibold text-polarNight dark:text-articWhite mb-2">
//                         {t("test_vehicles.models_label")}
//                       </h4>
//                       <p className="text-polarNight/80 dark:text-articWhite/80 font-mono text-lg">
//                         {vehicle.budget}
//                       </p>
//                     </div>

//                     <div>
//                       <h4 className="font-semibold text-polarNight dark:text-articWhite mb-2">
//                         {t("test_vehicles.focus_label")}
//                       </h4>
//                       <p className="text-polarNight/70 dark:text-articWhite/70">
//                         {vehicle.focus}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="mt-6 pt-6 border-t border-coldIndigo/20">
//                     <div className="flex items-center gap-2 text-sm text-coldIndigo dark:text-glacierBlue font-semibold">
//                       <Target className="w-4 h-4" />
//                       {t("test_vehicles.research_justified")}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Vision Section */}
//         <section className="relative w-full overflow-hidden pt-10 pb-8 md:pt-24 md:pb-24 px-6">
//           <div className="relative z-20 max-w-5xl mx-auto text-center animate-on-scroll">
//             <h2 className="text-3xl md:leading-relaxed md:text-5xl font-bold mb-8 bg-gradient-to-r from-coldIndigo to-glacierBlue bg-clip-text text-transparent">
//               {t("vision.title")}
//             </h2>

//             <div className="p-8 bg-gradient-to-r from-coldIndigo/10 to-glacierBlue/10 backdrop-blur-sm rounded-3xl border border-coldIndigo/20">
//               <p className="text-xl md:text-2xl font-semibold text-polarNight dark:text-articWhite mb-6">
//                 {t("vision.subtitle")}
//               </p>
//               <p className="text-lg leading-relaxed text-polarNight/80 dark:text-articWhite/80">
//                 {t("vision.description")}
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Benefits Section */}
//         <section className="relative w-full overflow-hidden pt-5 pb-5 md:pt-24 md:pb-24 px-6">
//           <div className="relative z-20 max-w-7xl mx-auto">
//             <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-coldIndigo to-glacierBlue bg-clip-text text-transparent animate-on-scroll">
//               {t("benefits.title")}
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {benefits.map((benefit, index) => {
//                 const Icon = benefit.icon;
//                 return (
//                   <div
//                     key={index}
//                     className="card-stagger p-8 bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-300 dark:border-white/10 hover:border-coldIndigo/30 transition-all duration-300 group"
//                   >
//                     <div className="w-16 h-16 mb-6 bg-gradient-to-br from-coldIndigo/20 to-glacierBlue/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                       <Icon className="w-8 h-8 text-coldIndigo dark:text-glacierBlue" />
//                     </div>
//                     <h3 className="text-xl font-bold mb-4 text-coldIndigo dark:text-glacierBlue">
//                       {benefit.title}
//                     </h3>
//                     <p className="text-polarNight/70 dark:text-articWhite/70 leading-relaxed">
//                       {benefit.description}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         {/* Testing Methodologies Section */}
//         <section className="relative w-full overflow-hidden pt-5 pb-8 md:pt-24 md:pb-24 px-6">
//           <div className="relative z-20 max-w-7xl mx-auto">
//             <div className="text-center mb-16 animate-on-scroll">
//               <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-coldIndigo to-glacierBlue bg-clip-text text-transparent">
//                 {t("testing_methodologies.title")}
//               </h2>
//               <p className="text-xl text-polarNight/80 dark:text-articWhite/80 max-w-4xl mx-auto">
//                 {t("testing_methodologies.subtitle")}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {[
//                 {
//                   icon: Thermometer,
//                   title: t("testing_methodologies.thermal.title"),
//                   methods: t("testing_methodologies.thermal.methods", {
//                     returnObjects: true,
//                   }) as string[],
//                 },
//                 {
//                   icon: Wind,
//                   title: t("testing_methodologies.aerodynamic.title"),
//                   methods: t("testing_methodologies.aerodynamic.methods", {
//                     returnObjects: true,
//                   }) as string[],
//                 },
//                 {
//                   icon: Volume2,
//                   title: t("testing_methodologies.nvh.title"),
//                   methods: t("testing_methodologies.nvh.methods", {
//                     returnObjects: true,
//                   }) as string[],
//                 },
//                 {
//                   icon: Settings,
//                   title: t("testing_methodologies.dynamics.title"),
//                   methods: t("testing_methodologies.dynamics.methods", {
//                     returnObjects: true,
//                   }) as string[],
//                 },
//                 {
//                   icon: Activity,
//                   title: t("testing_methodologies.powertrain.title"),
//                   methods: t("testing_methodologies.powertrain.methods", {
//                     returnObjects: true,
//                   }) as string[],
//                 },
//                 {
//                   icon: Cpu,
//                   title: t("testing_methodologies.safety.title"),
//                   methods: t("testing_methodologies.safety.methods", {
//                     returnObjects: true,
//                   }) as string[],
//                 },
//               ].map((methodology, index) => {
//                 const Icon = methodology.icon;
//                 return (
//                   <div
//                     key={index}
//                     className="card-stagger p-6 bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-300 dark:border-white/10 hover:border-coldIndigo/30 transition-all duration-300 group"
//                   >
//                     <div className="flex items-center gap-4 mb-6">
//                       <div className="w-12 h-12 bg-gradient-to-br from-coldIndigo/20 to-glacierBlue/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                         <Icon className="w-6 h-6 text-coldIndigo dark:text-glacierBlue" />
//                       </div>
//                       <h3 className="text-lg font-bold text-coldIndigo dark:text-glacierBlue">
//                         {methodology.title}
//                       </h3>
//                     </div>

//                     <ul className="space-y-3">
//                       {methodology.methods.map((method, methodIndex) => (
//                         <li
//                           key={methodIndex}
//                           className="flex items-start gap-3"
//                         >
//                           <ChevronRight className="w-4 h-4 text-coldIndigo/60 mt-0.5 flex-shrink-0" />
//                           <span className="text-sm text-polarNight/70 dark:text-articWhite/70">
//                             {method}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         {/* Target Audience Section */}
//         <section className="relative w-full overflow-hidden pt-10 pb-8 md:pt-24 md:pb-24 px-6">
//           <div className="relative z-20 max-w-6xl mx-auto">
//             <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-coldIndigo to-glacierBlue bg-clip-text text-transparent animate-on-scroll">
//               {t("target_audience.title")}
//             </h2>

//             <p className="text-lg text-center mb-12 text-polarNight/80 dark:text-articWhite/80 max-w-4xl mx-auto animate-on-scroll">
//               {t("target_audience.description")}
//             </p>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {targetAudience.map((target, index) => {
//                 const Icon = target.icon;
//                 return (
//                   <div
//                     key={index}
//                     className="card-stagger p-6 bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-white/10 hover:border-coldIndigo/30 transition-all duration-300 group text-center"
//                   >
//                     <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-coldIndigo/20 to-glacierBlue/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                       <Icon className="w-6 h-6 text-coldIndigo dark:text-glacierBlue" />
//                     </div>
//                     <h4 className="text-lg font-semibold mb-2 text-coldIndigo dark:text-glacierBlue">
//                       {target.title}
//                     </h4>
//                     <p className="text-sm text-polarNight/70 dark:text-articWhite/70">
//                       {target.description}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         {/* SmartStart Compliance Section */}
//         <section className="relative w-full overflow-hidden pt-5 pb-8 md:pt-24 md:pb-24 px-6">
//           <div className="relative z-20 max-w-7xl mx-auto">
//             <div className="text-center mb-16 animate-on-scroll">
//               <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-coldIndigo to-glacierBlue bg-clip-text text-transparent">
//                 {t("smartstart_compliance.title")}
//               </h2>
//               <p className="text-xl text-polarNight/80 dark:text-articWhite/80 max-w-4xl mx-auto">
//                 {t("smartstart_compliance.subtitle")}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {/* Innovation Criteria */}
//               <div className="animate-on-scroll">
//                 <div className="p-8 bg-gradient-to-br from-coldIndigo/10 to-glacierBlue/10 backdrop-blur-sm rounded-3xl border border-coldIndigo/20">
//                   <div className="flex items-center gap-4 mb-6">
//                     <Lightbulb className="w-8 h-8 text-coldIndigo dark:text-glacierBlue" />
//                     <h3 className="text-2xl font-bold text-coldIndigo dark:text-glacierBlue">
//                       {t("smartstart_compliance.innovation.title")}
//                     </h3>
//                   </div>
//                   <ul className="space-y-4">
//                     {(
//                       t("smartstart_compliance.innovation.points", {
//                         returnObjects: true,
//                       }) as string[]
//                     ).map((point: string, index: number) => (
//                       <li key={index} className="flex items-start gap-3">
//                         <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                         <span className="text-sm text-polarNight/70 dark:text-articWhite/70">
//                           {point}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* Digital Economy */}
//               <div className="animate-on-scroll">
//                 <div className="p-8 bg-gradient-to-br from-coldIndigo/10 to-glacierBlue/10 backdrop-blur-sm rounded-3xl border border-coldIndigo/20">
//                   <div className="flex items-center gap-4 mb-6">
//                     <Cpu className="w-8 h-8 text-coldIndigo dark:text-glacierBlue" />
//                     <h3 className="text-2xl font-bold text-coldIndigo dark:text-glacierBlue">
//                       {t("smartstart_compliance.digital.title")}
//                     </h3>
//                   </div>
//                   <ul className="space-y-4">
//                     {(
//                       t("smartstart_compliance.digital.points", {
//                         returnObjects: true,
//                       }) as string[]
//                     ).map((point: string, index: number) => (
//                       <li key={index} className="flex items-start gap-3">
//                         <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                         <span className="text-sm text-polarNight/70 dark:text-articWhite/70">
//                           {point}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* Research Valorization */}
//               <div className="animate-on-scroll">
//                 <div className="p-8 bg-gradient-to-br from-coldIndigo/10 to-glacierBlue/10 backdrop-blur-sm rounded-3xl border border-coldIndigo/20">
//                   <div className="flex items-center gap-4 mb-6">
//                     <BarChart3 className="w-8 h-8 text-coldIndigo dark:text-glacierBlue" />
//                     <h3 className="text-2xl font-bold text-coldIndigo dark:text-glacierBlue">
//                       {t("smartstart_compliance.research.title")}
//                     </h3>
//                   </div>
//                   <ul className="space-y-4">
//                     {(
//                       t("smartstart_compliance.research.points", {
//                         returnObjects: true,
//                       }) as string[]
//                     ).map((point: string, index: number) => (
//                       <li key={index} className="flex items-start gap-3">
//                         <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                         <span className="text-sm text-polarNight/70 dark:text-articWhite/70">
//                           {point}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* Automotive R&D Focus */}
//               <div className="animate-on-scroll">
//                 <div className="p-8 bg-gradient-to-br from-coldIndigo/10 to-glacierBlue/10 backdrop-blur-sm rounded-3xl border border-coldIndigo/20">
//                   <div className="flex items-center gap-4 mb-6">
//                     <Car className="w-8 h-8 text-coldIndigo dark:text-glacierBlue" />
//                     <h3 className="text-2xl font-bold text-coldIndigo dark:text-glacierBlue">
//                       {t("smartstart_compliance.automotive.title")}
//                     </h3>
//                   </div>
//                   <ul className="space-y-4">
//                     {(
//                       t("smartstart_compliance.automotive.points", {
//                         returnObjects: true,
//                       }) as string[]
//                     ).map((point: string, index: number) => (
//                       <li key={index} className="flex items-start gap-3">
//                         <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                         <span className="text-sm text-polarNight/70 dark:text-articWhite/70">
//                           {point}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Compliance Section */}
//         <section className="relative w-full overflow-hidden pt-5 pb-20 md:pt-24 md:pb-24 px-6">
//           <div className="relative z-20 max-w-6xl mx-auto">
//             <h2 className="text-3xl md:leading-relaxed md:text-5xl font-bold text-center mb-12 md:mb-12 bg-gradient-to-r from-coldIndigo to-glacierBlue bg-clip-text text-transparent animate-on-scroll leading-6">
//               {t("compliance.card_title")}
//             </h2>
//             <p className="text-lg text-center mb-12 text-polarNight/80 dark:text-articWhite/80 max-w-4xl mx-auto animate-on-scroll">
//               {t("compliance.card_desciption")}
//             </p>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//               {/* Legal Compliance */}
//               <div className="animate-on-scroll">
//                 <div className="p-8 bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-300 dark:border-white/10">
//                   <div className="flex items-center mb-6">
//                     <div className="w-12 h-12 mr-4 bg-gradient-to-br from-coldIndigo/20 to-glacierBlue/20 rounded-xl flex items-center justify-center">
//                       <Award className="w-6 h-6 text-coldIndigo dark:text-glacierBlue" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-coldIndigo dark:text-glacierBlue">
//                       {t("compliance.title")}
//                     </h3>
//                   </div>
//                   <p className="text-polarNight/80 dark:text-articWhite/80 mb-6">
//                     {t("compliance.description")}
//                   </p>
//                   <ul className="space-y-3">
//                     {complianceFeatures.map((feature, index) => (
//                       <li key={index} className="flex items-start space-x-3">
//                         <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                         <span className="text-sm text-polarNight/70 dark:text-articWhite/70">
//                           {feature}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               {/* Security */}
//               <div className="animate-on-scroll">
//                 <div className="h-full p-8 bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-300 dark:border-white/10">
//                   <div className="flex items-center mb-6">
//                     <div className="w-12 h-12 mr-4 bg-gradient-to-br from-coldIndigo/20 to-glacierBlue/20 rounded-xl flex items-center justify-center">
//                       <Lock className="w-6 h-6 text-coldIndigo dark:text-glacierBlue" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-coldIndigo dark:text-glacierBlue">
//                       {t("security.title")}
//                     </h3>
//                   </div>
//                   <p className="text-polarNight/80 dark:text-articWhite/80 mb-6">
//                     {t("security.description")}
//                   </p>
//                   <ul className="space-y-3">
//                     {securityFeatures.map((feature, index) => (
//                       <li key={index} className="flex items-start space-x-3">
//                         <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                         <span className="text-sm text-polarNight/70 dark:text-articWhite/70">
//                           {feature}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Final CTA Section */}
//         <section className="relative w-full overflow-hidden py-24 px-6">
//           <div className="absolute inset-0 z-0">
//             <div className="absolute inset-0" />
//           </div>

//           <div className="relative z-20 max-w-4xl mx-auto text-center animate-on-scroll">
//             <div className="p-12 bg-gradient-to-r from-coldIndigo/20 to-glacierBlue/20 backdrop-blur-sm rounded-3xl border border-coldIndigo/30">
//               <div className="flex items-center justify-center gap-4 mb-6">
//                 <Compass className="w-16 h-16 text-coldIndigo dark:text-glacierBlue" />
//                 <Wrench className="w-12 h-12 text-coldIndigo/60 dark:text-glacierBlue/60" />
//               </div>
//               <h3 className="text-3xl md:text-4xl font-bold mb-6 text-coldIndigo dark:text-glacierBlue">
//                 {t("cta.title")}
//               </h3>
//               <p className="text-lg text-polarNight/80 dark:text-articWhite/80 mb-8 max-w-2xl mx-auto">
//                 {t("cta.description")}
//               </p>
//               <button
//                 onClick={scrollToContacts}
//                 className="inline-flex items-center gap-3 px-10 py-5 bg-coldIndigo text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-coldIndigo/30 group"
//               >
//                 <span>{t("cta.button")}</span>
//                 <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
//               </button>
//             </div>
//           </div>
//         </section>
//       </div>

//       {/* CSS Animations */}
//       <style jsx global>{`
//         @keyframes particle-float {
//           0% {
//             transform: translateY(100vh) rotate(0deg);
//             opacity: 0;
//           }
//           10% {
//             opacity: 0.6;
//           }
//           90% {
//             opacity: 0.6;
//           }
//           100% {
//             transform: translateY(-100vh) rotate(360deg);
//             opacity: 0;
//           }
//         }

//         .particle {
//           pointer-events: none;
//         }

//         * {
//           -webkit-font-smoothing: antialiased;
//           -moz-osx-font-smoothing: grayscale;
//         }

//         button:focus-visible,
//         a:focus-visible {
//           outline: 2px solid #5c4de1;
//           outline-offset: 2px;
//         }

//         .bg-gradient-radial {
//           background: radial-gradient(circle, var(--tw-gradient-stops));
//         }

//         @media (max-width: 768px) {
//           .particle {
//             display: none;
//           }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .particle,
//           .animate-pulse {
//             animation: none !important;
//           }
//         }

//         @keyframes gradient-x {
//           0%,
//           100% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//         }

//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-gradient-x {
//           animation: gradient-x 6s ease infinite;
//         }

//         .animate-fade-in {
//           animation: fade-in 1s ease-out;
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .animate-gradient-x,
//           .animate-fade-in,
//           .animate-pulse,
//           .animate-bounce,
//           .animate-spin,
//           .animate-ping {
//             animation: none !important;
//           }
//         }

//         @media (max-width: 768px) {
//           .floating-stats {
//             display: none;
//           }
//         }

//         @keyframes gridPulse {
//           0%,
//           100% {
//             opacity: 0.3;
//             transform: scale(1);
//           }
//           50% {
//             opacity: 0.6;
//             transform: scale(1.005);
//           }
//         }

//         @keyframes gridFloat {
//           0%,
//           100% {
//             opacity: 0.2;
//             background-position: 0 0, 0 0;
//           }
//           50% {
//             opacity: 0.5;
//             background-position: 20px 20px, 20px 20px;
//           }
//         }

//         @keyframes gridGlow {
//           0%,
//           100% {
//             opacity: 0.25;
//             filter: brightness(1);
//           }
//           50% {
//             opacity: 0.45;
//             filter: brightness(1.2);
//           }
//         }

//         /* Enhanced automotive-specific animations */
//         @keyframes vehiclePulse {
//           0%,
//           100% {
//             transform: scale(1);
//             opacity: 0.8;
//           }
//           50% {
//             transform: scale(1.05);
//             opacity: 1;
//           }
//         }

//         @keyframes researchGlow {
//           0%,
//           100% {
//             box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
//           }
//           50% {
//             box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
//           }
//         }

//         @keyframes dataFlow {
//           0% {
//             transform: translateX(-100%);
//             opacity: 0;
//           }
//           50% {
//             opacity: 1;
//           }
//           100% {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//         }

//         /* Responsive adjustments for automotive content */
//         @media (max-width: 1024px) {
//           .test-vehicles-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }
//         }

//         @media (max-width: 768px) {
//           .test-vehicles-grid,
//           .research-areas-grid,
//           .methodologies-grid {
//             grid-template-columns: 1fr;
//           }

//           .vehicle-card {
//             padding: 1rem;
//           }

//           .research-badge {
//             font-size: 0.75rem;
//             padding: 0.25rem 0.5rem;
//           }
//         }

//         /* Accessibility improvements */
//         @media (prefers-reduced-motion: reduce) {
//           .vehiclePulse,
//           .researchGlow,
//           .dataFlow {
//             animation: none !important;
//           }

//           .card-stagger {
//             transition: none !important;
//           }
//         }

//         /* High contrast mode support */
//         @media (prefers-contrast: high) {
//           .research-card,
//           .vehicle-card,
//           .methodology-card {
//             border-width: 2px;
//             border-color: currentColor;
//           }

//           .automotive-gradient {
//             background: linear-gradient(45deg, #000 0%, #333 100%);
//           }
//         }

//         /* Focus indicators for automotive components */
//         .automotive-button:focus-visible,
//         .research-card:focus-visible,
//         .vehicle-card:focus-visible {
//           outline: 3px solid #3b82f6;
//           outline-offset: 2px;
//           border-radius: 8px;
//         }

//         /* Custom scrollbar for automotive theme */
//         .automotive-content::-webkit-scrollbar {
//           width: 8px;
//         }

//         .automotive-content::-webkit-scrollbar-track {
//           background: rgba(59, 130, 246, 0.1);
//           border-radius: 4px;
//         }

//         .automotive-content::-webkit-scrollbar-thumb {
//           background: rgba(59, 130, 246, 0.3);
//           border-radius: 4px;
//         }

//         .automotive-content::-webkit-scrollbar-thumb:hover {
//           background: rgba(59, 130, 246, 0.5);
//         }

//         /* Print styles for research documentation */
//         @media print {
//           .particle,
//           .animate-pulse,
//           .floating-elements {
//             display: none !important;
//           }

//           .research-card,
//           .vehicle-card {
//             break-inside: avoid;
//             page-break-inside: avoid;
//           }

//           .automotive-gradient {
//             color: #000 !important;
//             background: #fff !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// }

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale ?? "it", [
//         "common",
//         "header",
//         "polardrive",
//       ])),
//     },
//   };
// };
