import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, Instagram, Linkedin, ArrowUpRight, Play, Globe, Cpu, Layout, Video, Gamepad2, Layers, MousePointer2, Briefcase, Film, ExternalLink, CheckCircle2 } from 'lucide-react';

/**
 * ResponsiveBanner Component
 * Force-scales HTML5 iframes to fill 100% of the column width.
 */
const ResponsiveBanner = ({ src, width, height, title, loopInterval = 20000 }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const currentWidth = containerRef.current.offsetWidth;
        const newScale = currentWidth / width;
        setScale(newScale);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  useEffect(() => {
    if (loopInterval > 0) {
      const interval = setInterval(() => {
        setRefreshKey(prev => prev + 1);
      }, loopInterval);
      return () => clearInterval(interval);
    }
  }, [loopInterval]);

  return (
    <div className="relative group w-full flex justify-center overflow-hidden bg-black">
      <div 
        ref={containerRef}
        className="relative overflow-hidden w-full bg-transparent transition-all duration-300"
        style={{ 
          height: `${height * scale}px`,
        }}
      >
        <iframe
          key={refreshKey}
          src={src}
          title={title}
          frameBorder="0"
          scrolling="no"
          allowtransparency="true"
          className="absolute top-0 left-0 origin-top-left pointer-events-auto"
          style={{ 
            width: `${width}px`, 
            height: `${height}px`,
            transform: `scale(${scale})`,
            background: 'transparent'
          }}
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-2 text-center p-4">
            <MousePointer2 className="text-white" size={24} />
            <span className="text-[10px] uppercase tracking-widest font-bold text-white">Interactive Showcase</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * VideoShowcase Component
 * Cinematic Vimeo player wrapper.
 * Fixed for full-width scaling while supporting reduced-size square formats.
 */
const VideoShowcase = ({ url, title, description, client, square = false }) => (
  <div className="mb-20 md:mb-32 last:mb-0 w-full text-left">
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6 md:mb-8 px-0">
      {client && (
        <span className="text-[9px] md:text-[10px] tracking-[0.4em] text-white/40 font-bold uppercase block mb-2">
          Client: {client}
        </span>
      )}
      <h3 className="text-xl md:text-4xl font-black uppercase tracking-tighter mb-2 italic text-white">{title}</h3>
      {description && <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed max-w-4xl">{description}</p>}
    </motion.div>
    
    <div className={`relative overflow-hidden bg-black border border-white/5 group ${square ? 'aspect-square max-w-lg lg:max-w-xl' : 'w-full aspect-video'}`}>
      <iframe
        src={url}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100.5%] h-[100.5%] bg-black"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title={title}
      ></iframe>
    </div>
  </div>
);

/**
 * DirectVideoShowcase Component
 */
const DirectVideoShowcase = ({ url, title, description, autoPlay = true }) => (
  <div className="mb-20 md:mb-32 w-full text-left">
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6 md:mb-8">
      {title && <h3 className="text-xl md:text-4xl font-black uppercase tracking-tighter mb-2 italic text-white">{title}</h3>}
      {description && <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed max-w-4xl">{description}</p>}
    </motion.div>
    
    <div className="relative w-full aspect-video bg-black border border-white/5 overflow-hidden">
      <video 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100.5%] h-[100.5%] object-cover"
        controls
        autoPlay={autoPlay}
        muted={autoPlay}
        loop={autoPlay}
        preload="metadata"
      >
        <source src={url} type="video/mp4" />
      </video>
    </div>
  </div>
);

/**
 * ProjectCard Component
 */
const ProjectCard = ({ title, category, client, videoSrc, imageSrc, index, noLink = false, layout = "overlay", objectContain = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isBelow = layout === "below";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden bg-black border-[0.5px] border-white/5 flex flex-col ${!isBelow ? 'aspect-[14/9] md:aspect-[16/10]' : ''}`}
    >
      <div className={`relative overflow-hidden ${isBelow ? 'aspect-[14/9] md:aspect-[16/10]' : 'w-full h-full flex-grow'} ${objectContain ? 'bg-white' : ''}`}>
        {videoSrc ? (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
              isHovered ? 'scale-105 opacity-100' : 'scale-100 opacity-20'
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={imageSrc} 
            alt={title}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              objectContain ? 'object-contain p-2 md:p-4' : 'object-cover'
            } ${isHovered ? 'scale-105 opacity-100' : (objectContain ? 'opacity-100' : 'opacity-60')}`}
          />
        )}
        
        {!isBelow && (
          <div className="absolute inset-0 p-6 md:p-12 lg:p-16 flex flex-col justify-between bg-gradient-to-b from-black/20 via-transparent to-black/90">
            <div className="flex justify-between items-start">
              <span className="text-[8px] md:text-[10px] tracking-[0.4em] text-white/40 font-bold uppercase">
                Client: {client}
              </span>
              {!noLink && (
                <motion.div
                  animate={{ rotate: isHovered ? 45 : 0 }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-sm"
                >
                  <ArrowUpRight size={18} className="text-white" />
                </motion.div>
              )}
            </div>

            <div>
              <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-2 font-medium">
                {category}
              </p>
              <h3 className="text-2xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none italic">
                {title}
              </h3>
            </div>
          </div>
        )}
      </div>

      {isBelow && (
        <div className="p-6 md:p-10 bg-black flex flex-col gap-3 md:gap-4 border-t border-white/5 text-left flex-grow">
          <div className="flex justify-between items-center">
            <span className="text-[8px] md:text-[10px] tracking-[0.4em] text-white/30 font-bold uppercase">
              Client: {client}
            </span>
            {!noLink && <ArrowUpRight size={16} className="text-white/30" />}
          </div>
          <div>
            <p className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-zinc-600 mb-1 font-bold">
              {category}
            </p>
            <h3 className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase italic">
              {title}
            </h3>
          </div>
        </div>
      )}
    </motion.div>
  );
};

/**
 * BannerSetStandard Component
 */
const BannerSetStandard = ({ projectTitle, description, urls, billboardWidth = 970 }) => (
  <div className="mb-24 md:mb-48 last:mb-0 w-full px-0">
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 md:mb-16 text-left">
      <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic text-white leading-none">{projectTitle}</h3>
      <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-4xl">{description}</p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-[#111] w-full border border-[#111]">
      <div className="flex flex-col items-center justify-start gap-[2px] w-full bg-[#050505]">
        <div className="flex flex-col items-center gap-4 w-full p-6 md:p-12">
          <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-700 font-bold italic">300x250</span>
          <ResponsiveBanner src={urls.mrec} width={300} height={250} title="MREC" />
        </div>
        <div className="flex flex-col items-center gap-4 w-full p-6 md:p-12 border-t border-[#111]">
          <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-700 font-bold italic">728x90</span>
          <ResponsiveBanner src={urls.leaderboard} width={728} height={90} title="Leaderboard" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 w-full bg-[#050505] p-6 md:p-12 border-t md:border-t-0 md:border-l border-[#111]">
        <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-700 font-bold italic">300x600</span>
        <ResponsiveBanner src={urls.skyscraper} width={300} height={600} title="Skyscraper" />
      </div>
      <div className="md:col-span-2 flex flex-col items-center gap-4 w-full bg-[#050505] py-10 md:py-24 border-t border-[#111]">
        <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-700 font-bold italic">{billboardWidth}x250 Billboard</span>
        <ResponsiveBanner src={urls.billboard} width={billboardWidth} height={250} title="Billboard" />
      </div>
    </div>
  </div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    { 
      title: "G'Day Moon", 
      client: "Australian Space Agency", 
      category: "Concept Creative / Digital", 
      imageSrc: "https://images.squarespace-cdn.com/content/v1/64913403581c941cba85047b/bcd13729-ebf7-46b8-a5a6-9bce4c362cd1/G%27Day+Moon.png?format=2500w",
      noLink: true,
      layout: "below"
    },
    { 
      title: "How Close is too Close?", 
      client: "SA Power Networks", 
      category: "Digital Outdoor", 
      imageSrc: "https://modulate.com.au/video/SAPN_jolt%20copy.jpg",
      layout: "below"
    },
    { 
      title: "Belong in Blue", 
      client: "South Australia Police", 
      category: "HTML5 Banners / Social Campaign", 
      imageSrc: "https://www.police.sa.gov.au/__data/assets/image/0020/1270235/SAPO5013_Mobile_Driver_1920x1080_v1.jpg",
      layout: "below"
    },
    { 
      title: "Top Gear", 
      client: "Imagination Games / BBC", 
      category: "Game Design / Illustration", 
      imageSrc: "https://m.media-amazon.com/images/I/915rBtFzALL._AC_SX679_.jpg",
      layout: "below",
      objectContain: true
    }
  ];

  const coreSkills = [
    "Adobe Creative Suite",
    "HTML5 Banner Creation",
    "Motion Design",
    "Typography and Layout Design",
    "Branding and Identity Development",
    "Web and Mobile Design",
    "Project Management",
    "Illustration and Digital Art Direction",
    "Communication and Collaboration",
    "Augmented Reality",
    "Vibe Coding",
    "AI Prompting"
  ];

  const motionAssets1 = {
    mrec: "https://modulate.com.au/HTML5_Costing_What2Ask/assets/VISC5001_300x250_2_oam/Assets/index.html",
    leaderboard: "https://modulate.com.au/HTML5_Costing_What2Ask/assets/VISC5001_728x90_2_oam/Assets/index.html",
    skyscraper: "https://modulate.com.au/HTML5_Costing_What2Ask/assets/VISC5001_300x600_2_oam/Assets/index.html",
    billboard: "https://modulate.com.au/HTML5_Costing_What2Ask/assets/VISC5001_970x250_2_oam/Assets/index.html"
  };

  const artDirectionImages = [
    "https://modulate.com.au/video/ACT%20Emergency%20Services%20Case%20Study%20Full.002.jpeg",
    "https://modulate.com.au/video/ACT%20Health%20Refill%20Canberra%20Case%20Study.002.jpeg",
    "https://modulate.com.au/video/Asbestos%20Safety%20Case%20Study%20Visual.002.jpeg",
    "https://modulate.com.au/video/419495000001194004_zc_v89_edm5-29952.jpg",
    "https://modulate.com.au/video/MDPP%20Launch%2016x9.jpg",
    "https://modulate.com.au/video/Austal%20Case%20Study%20Visual.002.jpeg"
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-white selection:text-black font-sans antialiased overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full p-4 md:p-10 flex justify-between items-center z-50 transition-all duration-700 ${scrolled ? 'bg-black/95 backdrop-blur-xl py-4 md:py-5 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-none flex items-center justify-center overflow-hidden">
            <span className="text-black font-black text-xs md:text-sm italic">CD</span>
          </div>
          <h1 className="text-[10px] md:text-sm font-bold tracking-[0.3em] uppercase cursor-pointer">Clinton Doyle</h1>
        </div>
        <div className="hidden lg:flex space-x-12 text-[10px] uppercase tracking-[0.4em] font-bold">
          <a href="#about" className="hover:opacity-50 transition-opacity">Expertise</a>
          <a href="#work" className="hover:opacity-50 transition-opacity">Portfolio</a>
          <a href="#motion" className="hover:opacity-50 transition-opacity">Motion</a>
          <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
          <a href="https://modulate.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-white transition-colors flex items-center gap-2">
            Modulate <ArrowUpRight size={12} />
          </a>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
           <span className="hidden sm:block text-[8px] md:text-[9px] tracking-widest text-zinc-500 uppercase font-bold">Concept Creative & AD</span>
           <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="relative z-10 w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 md:w-12 bg-zinc-800" />
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.6em] text-zinc-500 font-bold italic">25+ Years Innovation</span>
          </motion.div>
          <h2 className="text-[14vw] md:text-[15vw] leading-[0.85] font-black uppercase tracking-tighter">
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }}>Art</motion.div>
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.1 }} className="italic text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>Director</motion.div>
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.2 }}>Motion Designer</motion.div>
          </h2>
        </div>
      </section>

      {/* Expertise / Experiences Section - Restored full history */}
      <section id="about" className="py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-black border-b border-white/5">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-start">
            
            {/* Left Column: Professional Experiences */}
            <div className="space-y-20 md:space-y-32">
              <div className="text-left">
                <div className="mb-12 md:mb-16">
                  <h2 className="inline-block bg-white text-black text-[9px] md:text-[11px] uppercase tracking-[0.5em] font-black px-4 py-1.5 italic shadow-[4px_4px_0_rgba(255,255,255,0.1)]">Professional Experiences</h2>
                </div>
                
                <div className="space-y-8 md:space-y-10 group mb-16 md:mb-24">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="p-4 md:p-6 bg-zinc-900 border border-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500 shrink-0">
                      <Video size={24} className="md:w-8 md:h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-3xl font-bold uppercase italic text-white">Digital/Motion Designer</h4>
                      <p className="text-xs md:text-lg text-blue-500 font-black tracking-widest uppercase">Nation Creative | 2013 - 2024</p>
                    </div>
                  </div>
                  <div className="pl-4 border-l border-zinc-800 space-y-4 md:space-y-6">
                    <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
                      Led the digital design across all campaigns, ensuring effective and impactful messaging.
                    </p>
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold block mb-3 md:mb-4">Core Clients:</span>
                      <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-1 text-zinc-500 text-[11px] md:text-sm font-medium italic">
                        <span>Australian Space Agency</span>
                        <span>University of Adelaide</span>
                        <span>Beyond Bank</span>
                        <span>Cancer Council SA</span>
                        <span>SA Government</span>
                        <span>Sealink Travel Group</span>
                        <span>Skycity Adelaide</span>
                        <span>Skycity Hotels Group</span>
                        <span>Stratco</span>
                        <span>SA Power Networks</span>
                        <span>Nippys</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 md:space-y-10 group mb-16 md:mb-24">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="p-4 md:p-6 bg-zinc-900 border border-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500 shrink-0">
                      <Gamepad2 size={24} className="md:w-8 md:h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-3xl font-bold uppercase italic text-white">Graphic Designer</h4>
                      <p className="text-xs md:text-lg text-blue-500 font-black tracking-widest uppercase">Imagination Games</p>
                    </div>
                  </div>
                  <div className="pl-4 border-l border-zinc-800 space-y-4 md:space-y-6">
                    <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
                      Drove graphic design efforts within the product development division, contributing to interactive board games for global brands.
                    </p>
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold block mb-3 md:mb-4">Brand Partners:</span>
                      <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-1 text-zinc-500 text-[11px] md:text-sm font-medium italic uppercase tracking-tighter">
                        <span>ABC</span><span>BBC</span><span>Disney</span><span>Mr. Men</span><span>Nickelodeon</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 md:space-y-10 group text-left">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="p-4 md:p-6 bg-zinc-900 border border-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500 shrink-0">
                      <Layers size={24} className="md:w-8 md:h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-3xl font-bold uppercase italic text-white">Graphic Designer</h4>
                      <p className="text-xs md:text-lg text-blue-500 font-black tracking-widest uppercase text-wrap max-w-xs">Distillery, Via Media, Cinch Marketing</p>
                    </div>
                  </div>
                  <div className="pl-4 border-l border-zinc-800 space-y-4 md:space-y-6">
                    <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
                      Spearheaded design for diverse government organizations and marketing agencies.
                    </p>
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold block mb-3 md:mb-4">Venue Clients:</span>
                      <div className="grid grid-cols-2 gap-1 text-zinc-500 text-[11px] md:text-sm font-medium italic">
                        <span>Adelaide Metro</span>
                        <span>Arts Projects SA</span>
                        <span>SA Great</span>
                        <span>Adelaide Entertainment Centre</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Summary & Skills */}
            <div className="text-left mt-12 lg:mt-0">
              <div className="mb-12 md:mb-16">
                <h2 className="inline-block bg-white text-black text-[9px] md:text-[11px] uppercase tracking-[0.5em] font-black px-4 py-1.5 italic shadow-[4px_4px_0_rgba(255,255,255,0.1)]">Profile Summary</h2>
              </div>
              <div className="sticky top-24 md:top-32">
                <p className="text-2xl md:text-4xl lg:text-6xl font-light tracking-tight text-zinc-200 leading-tight md:leading-[1.1] mb-8 md:mb-12">
                  "Highly experienced Graphic Designer with over <span className="text-white italic font-bold">25 years of expertise</span> in delivering innovative design solutions."
                </p>
                <div className="space-y-6 md:space-y-8 text-base md:text-xl text-zinc-500 font-medium leading-relaxed max-w-2xl">
                  <p>
                    Proven track record of leading successful projects for government agencies, renowned brands, and marketing agencies.
                  </p>
                </div>
                
                {/* Skillset Grid */}
                <div className="mt-16 md:mt-20 pt-10 md:pt-16 border-t border-white/5">
                  <h5 className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-zinc-600 mb-8 md:mb-10 font-black italic">Core Skillset & Technical Proficiency</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-4 md:gap-y-6">
                    {coreSkills.map((skill, index) => (
                      <div key={index} className="flex items-start gap-3 group">
                        <CheckCircle2 size={14} className="text-blue-500 mt-0.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                        <span className="text-xs md:text-[13px] text-zinc-400 font-bold italic uppercase tracking-widest leading-snug group-hover:text-white transition-colors">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-white/5">
                    <h5 className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-zinc-600 mb-4 md:mb-6 font-black">Location</h5>
                    <p className="text-xs md:text-sm text-zinc-400 font-bold italic uppercase tracking-widest">
                      Adelaide, South Australia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section id="work" className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#111] border-b border-white/5 w-full items-start">
        {projects.map((project, idx) => (
          <ProjectCard 
            key={idx} 
            index={idx} 
            client={project.client} 
            title={project.title} 
            category={project.category} 
            imageSrc={project.imageSrc}
            noLink={project.noLink}
            layout={project.layout}
            objectContain={project.objectContain}
          />
        ))}
      </section>

      {/* Art Direction Section */}
      <section id="art-direction" className="py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-[#050505] border-b border-white/5">
        <div className="w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 md:mb-16 text-left">
            <div className="mb-8">
              <h2 className="inline-block bg-white text-black text-[9px] md:text-[11px] uppercase tracking-[0.5em] font-black px-4 py-1.5 italic shadow-[4px_4px_0_rgba(255,255,255,0.1)]">Art Direction</h2>
            </div>
          </motion.div>
          
          <div className="space-y-12 md:space-y-24">
            {artDirectionImages.map((src, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1], delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative w-full border border-white/5 overflow-hidden bg-black shadow-2xl"
              >
                <img src={src} alt={`Art Direction Showcase ${i + 1}`} className="w-full h-auto block" />
              </motion.div>
            ))}

            {/* 2-Column Grid under Austal - Cover Treatment with Retina Proportions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 pt-12 md:pt-24 border-t border-white/5">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl"
                style={{ aspectRatio: '1138 / 1428' }}
              >
                <img 
                  src="https://modulate.com.au/video/Screenshot%202026-03-27%20at%208.15.36%E2%80%AFpm.png" 
                  alt="Art Direction Detail 1" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl"
                style={{ aspectRatio: '1138 / 1428' }}
              >
                <img 
                  src="https://modulate.com.au/video/572767218_1248138054002226_8912372230681473482_n-1.jpg" 
                  alt="Art Direction Detail 2" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Motion Design Section */}
      <section id="motion" className="py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-[#080808] border-b border-white/5">
        <div className="w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 md:mb-32 text-left">
            <div className="mb-6 md:mb-8">
              <h2 className="inline-block bg-white text-black text-[9px] md:text-[11px] uppercase tracking-[0.5em] font-black px-4 py-1.5 italic shadow-[4px_4px_0_rgba(255,255,255,0.1)]">Visuals & Interactive Production</h2>
            </div>
            <h3 className="text-5xl md:text-9xl font-black uppercase tracking-tighter italic text-white leading-tight md:leading-none">Motion Design</h3>
          </motion.div>

          {/* Interactive Banners Section */}
          <BannerSetStandard 
            projectTitle="Floriade Reimagined"
            description="Precision HTML5 Banner ads served through Amazon/Sizmek."
            urls={motionAssets1}
            billboardWidth={970}
          />

          <div className="mt-24 md:mt-48 pt-12 md:pt-24 border-t border-white/5 px-0">
            {/* Broadcast & Video Campaigns */}
            <VideoShowcase 
              client="SAFECOM"
              title="Emergency Services Campaign"
              description="Broadcast motion design and cinematic digital visual effects for multi-platform delivery."
              url="https://player.vimeo.com/video/289820889?badge=0&autopause=0&player_id=0&app_id=58479"
            />

            <VideoShowcase 
              client="Australian Space Agency"
              title="IN HOUSE VIDEO"
              description="Projection mapping and graphics."
              url="https://player.vimeo.com/video/854602988?color=ffffff&title=0&byline=0&portrait=0"
            />

            <VideoShowcase 
              client="SA Power Networks"
              title="Campaign Visuals"
              description="Social media motion graphics and visual storytelling."
              url="https://player.vimeo.com/video/444435982?color=ffffff&title=0&byline=0&portrait=0"
              square={true}
            />

            <VideoShowcase 
              client="SA Government"
              title="LOOK NORTH"
              description="Animation/infographic"
              url="https://player.vimeo.com/video/193842225?badge=0&autopause=0&player_id=0&app_id=58479"
            />

            <VideoShowcase 
              client="ACT GOVERNMENT REFILL CANBERRA"
              title="Digital animation"
              url="https://player.vimeo.com/video/327202485?color=ffffff&title=0&byline=0&portrait=0"
            />

            <VideoShowcase 
              client="Netball Australia"
              title="Rolling Sub"
              description="Gameday animation courtside"
              url="https://player.vimeo.com/video/188639033?badge=0&autopause=0&player_id=0&app_id=58479&loop=1"
            />

            <VideoShowcase 
              client="Netball Australia"
              title="WOW"
              description="Gameday animation courtside"
              url="https://player.vimeo.com/video/188639036?badge=0&autopause=0&player_id=0&app_id=58479"
            />

            <VideoShowcase 
              client="Netball Australia"
              title="Fast5s"
              description="Gameday animation courtside"
              url="https://player.vimeo.com/video/188639035?badge=0&autopause=0&player_id=0&app_id=58479"
            />

            <VideoShowcase 
              client="Broadcast Creative"
              title="High Performance Motion"
              description="Visual storytelling featuring cinematic movement and high-energy graphics."
              url="https://player.vimeo.com/video/273833383?badge=0&autopause=0&player_id=0&app_id=58479"
            />

            <VideoShowcase 
              client="Nippy's"
              title="Flavoured Oat Milk Launch"
              description="Dynamic social and store engagement campaign featuring high-impact motion graphics."
              url="https://player.vimeo.com/video/557963400?badge=0&autopause=0&player_id=0&app_id=58479&loop=1"
            />
          </div>

          {/* GRID: Kinetic and Broadcast Motion */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-16 md:mt-24">
             <div className="flex flex-col items-start space-y-4 md:space-y-6 text-left group cursor-pointer">
                <div className="relative w-full aspect-square bg-black border border-white/5 overflow-hidden">
                   <img 
                     src="image_d6db81.png" 
                     alt="Kinetic Animation Frame" 
                     className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000" 
                   />
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all flex items-center justify-center">
                      <iframe
                        src="https://player.vimeo.com/video/659169777?h=6703020d91&color=ffffff&title=0&byline=0&portrait=0"
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100.5%] h-[100.5%]"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title="Kinetic Animation"
                      ></iframe>
                   </div>
                </div>
                <div>
                   <h4 className="text-lg md:text-xl font-bold uppercase italic text-white mb-1 md:mb-2">Kinetic Animation</h4>
                   <p className="text-xs md:text-sm text-zinc-500 leading-relaxed tracking-wider">Healthier choices Canberra ACT Government</p>
                </div>
             </div>
             
             <div className="flex flex-col items-start space-y-4 md:space-y-6 text-left group">
                <div className="relative w-full aspect-square bg-black border border-white/5 overflow-hidden">
                   <iframe
                     src="https://player.vimeo.com/video/576561312?h=677fc41e88&color=ffffff&title=0&byline=0&portrait=0"
                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100.5%] h-[100.5%]"
                     frameBorder="0"
                     allow="autoplay; fullscreen; picture-in-picture"
                     allowFullScreen
                     title="Broadcast Motion"
                   ></iframe>
                </div>
                <div>
                   <div className="mb-2">
                     <h4 className="inline-block bg-white text-black text-[10px] md:text-xs font-black uppercase italic px-3 py-1 tracking-widest">Broadcast Motion</h4>
                   </div>
                   <p className="text-xs md:text-sm text-zinc-500 leading-relaxed tracking-wider font-bold">STI's Educational, ACT Health</p>
                </div>
             </div>
          </div>

          <div className="mt-24 md:mt-48 pt-12 md:pt-24 border-t border-white/5">
             <div className="flex flex-col items-start gap-8 md:gap-12">
                <div className="max-w-2xl">
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic text-white">Showreel</h3>
                </div>
                <DirectVideoShowcase 
                  title=""
                  description=""
                  url="https://modulate.com.au/video/Showreel2017.mp4"
                  autoPlay={false}
                />
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 md:py-24 px-6 md:px-12 lg:px-24 border-t border-white/5 bg-[#050505] text-left">
        <div className="flex flex-col items-start py-8 md:py-20">
          <a 
            href="mailto:clinton@modulate.com.au" 
            className="text-xl md:text-5xl font-black uppercase tracking-tighter hover:italic transition-all duration-300 text-white break-all"
          >
            clinton@modulate.com.au
          </a>
          <div className="mt-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <p className="text-zinc-600 tracking-[0.5em] uppercase text-[9px] md:text-[10px] font-black">0417 822 283</p>
            <div className="flex flex-wrap gap-6 md:gap-12 text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-black text-blue-500">
               <a href="https://modulate.com.au" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Modulate</a>
               <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
               <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
