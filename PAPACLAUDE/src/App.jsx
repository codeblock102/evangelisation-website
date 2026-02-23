import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight, Activity, Cpu, Layers, MousePointer2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MagneticButton = ({ children, className = '', primary = false, ...props }) => {
  const btnRef = useRef(null);
  
  return (
    <button 
      ref={btnRef}
      className={`magnetic-btn group px-8 py-4 rounded-full border transition-all duration-500 overflow-hidden relative ${
        primary ? 'bg-accent border-accent text-primary' : 'bg-transparent border-ivory text-ivory/80 hover:text-white'
      } ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2 font-medium tracking-tight">
        {children}
      </span>
      <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></span>
    </button>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-4xl px-8 py-4 rounded-full transition-all duration-700 flex items-center justify-between ${
      scrolled ? 'bg-primary/60 backdrop-blur-2xl border border-white/10 py-3' : 'bg-transparent'
    }`}>
      <div className="font-serif italic font-bold text-xl tracking-tighter text-ivory">Oro Giallo</div>
      <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-mono text-ivory/60">
        <a href="#" className="hover:text-accent transition-colors">Origins</a>
        <a href="#" className="hover:text-accent transition-colors">Process</a>
        <a href="#" className="hover:text-accent transition-colors">Archive</a>
      </div>
      <button className="bg-accent text-primary text-[11px] font-bold uppercase tracking-widest px-6 py-2.5 rounded-full hover:scale-105 transition-transform">
        Reserve Batch
      </button>
    </nav>
  );
};

const Hero = () => {
  const scope = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-line-1", { y: 60, opacity: 0, duration: 1.4, ease: "power4.out" })
        .from(".hero-line-2", { y: 40, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=1")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.8");
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="relative h-[100dvh] w-full flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=2670&auto=format&fit=crop" 
          alt="Luxury Pasta Texture" 
          className="w-full h-full object-cover scale-110 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"></div>
      </div>
      
      <div className="relative z-10 p-12 md:p-24 w-full max-w-7xl mx-auto">
        <div className="max-w-3xl space-y-8">
          <h1 className="flex flex-col">
            <span className="hero-line-1 text-white opacity-80 font-sans font-bold text-4xl md:text-6xl tracking-tighter">Oro Giallo meets</span>
            <span className="hero-line-2 text-accent font-serif italic text-7xl md:text-[10vw] leading-[0.85] mt-2">Precision.</span>
          </h1>
          <div className="hero-cta">
            <MagneticButton primary>
              Join the waitlist <ChevronRight size={18} />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCards = () => {
  const [activeGrain, setActiveGrain] = useState(0);
  const [telemetry, setTelemetry] = useState("");
  const grains = ["Senatore Cappelli", "Khorasan Ancient", "Monococcum Bio"];
  const telemetryFeed = "INIT_DRYING_CYCLE... TEMP: 32°C... HUMIDITY: 45%... BRONZE_EXTRUSION_LOAD: 88%... BATCH_412_STABLE";

  useEffect(() => {
    const int = setInterval(() => setActiveGrain(p => (p + 1) % 3), 3000);
    return () => clearInterval(int);
  }, []);

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTelemetry(telemetryFeed.substring(0, i));
      i = (i + 1) % (telemetryFeed.length + 5);
    }, 50);
    return () => clearInterval(typing);
  }, []);

  return (
    <section className="py-32 px-12 bg-ivory">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: Diagnostic Shuffler */}
        <div className="bg-white border border-primary/5 rounded-[2.5rem] p-10 h-[450px] shadow-2xl flex flex-col justify-between overflow-hidden relative group">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-accent font-mono text-[10px] tracking-widest uppercase">
              <Layers size={14} /> Diagnostic Shuffler
            </div>
            <h3 className="font-sans font-bold text-3xl text-primary leading-tight">Grain<br/>Selected Archive</h3>
          </div>
          
          <div className="relative h-40 flex items-center justify-center">
            {grains.map((name, i) => (
              <div 
                key={name}
                className={`absolute w-full px-6 py-8 rounded-3xl bg-primary text-white transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  i === activeGrain ? 'translate-y-0 opacity-100 scale-100 z-10' : '-translate-y-12 opacity-0 scale-90 z-0'
                }`}
              >
                <div className="text-[10px] font-mono text-accent mb-2">ORIGIN_{i + 1}</div>
                <div className="font-serif italic text-2xl">{name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Telemetry Typewriter */}
        <div className="bg-primary rounded-[2.5rem] p-10 h-[450px] shadow-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-accent font-mono text-[10px] tracking-widest uppercase">
              <Activity size={14} /> Live Telemetry
            </div>
            <h3 className="font-sans font-bold text-3xl text-ivory leading-tight">72-Hour<br/>Cold-Curing</h3>
          </div>
          
          <div className="font-mono text-accent-light text-[11px] leading-relaxed opacity-80 h-32 overflow-hidden">
            <span className="text-white/20 mr-2">$ root:</span> {telemetry}
            <span className="w-2 h-4 bg-accent animate-pulse inline-block ml-1 align-middle"></span>
          </div>
        </div>

        {/* Card 3: Cursor Protocol Scheduler */}
        <div className="bg-white border border-primary/5 rounded-[2.5rem] p-10 h-[450px] shadow-2xl flex flex-col justify-between group overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-accent font-mono text-[10px] tracking-widest uppercase">
              <MousePointer2 size={14} /> Protocol 
            </div>
            <h3 className="font-sans font-bold text-3xl text-primary leading-tight">Harvest<br/>Batch Selection</h3>
          </div>

          <div className="relative mt-8">
            <div className="grid grid-cols-7 gap-2 mb-4 opacity-20">
              {[...Array(14)].map((_, i) => <div key={i} className="aspect-square bg-primary/10 rounded-full"></div>)}
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary animate-bounce">
                <Cpu size={24} />
              </div>
            </div>
            <div className="text-[10px] font-mono text-center mt-4 text-primary/40 uppercase tracking-widest">Awaiting Confirmation...</div>
          </div>
        </div>

      </div>
    </section>
  );
};

const Manifesto = () => {
  const scope = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".man-line", {
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power4.out"
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="py-48 px-12 bg-primary relative overflow-hidden text-center">
      <img 
        src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2664&auto=format&fit=crop" 
        alt="Wheat Detail" 
        className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay scale-110"
      />
      <div className="relative z-10 space-y-12">
        <p className="man-line font-mono text-[11px] uppercase tracking-[0.4em] text-white/40">The Temporal Threshold</p>
        <div className="space-y-4">
          <p className="man-line text-ivory/60 text-lg md:text-2xl font-light">Most pasta focuses on: speed.</p>
          <p className="man-line font-serif italic text-6xl md:text-[8vw] text-ivory leading-none">
            We focus on: <span className="text-accent underline decoration-white/10 decoration-1 underline-offset-8">time.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

const ProtocolStacking = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".protocol-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: false,
          scrub: true,
          onUpdate: (self) => {
            gsap.to(card, {
              scale: 1 - self.progress * 0.1,
              filter: `blur(${self.progress * 20}px)`,
              opacity: 1 - self.progress * 0.5,
              overwrite: 'auto'
            });
          }
        });
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const steps = [
    { title: "Cultivation", num: "01", desc: "Select heirloom grains from the Tavoliere delle Puglie plateau, harvested only at peak protein density.", icon: <div className="w-32 h-32 border-2 border-accent/20 rounded-full animate-spin-slow flex items-center justify-center"><div className="w-24 h-24 border border-accent/40 rounded-full animate-pulse"></div></div> },
    { title: "Extrusion", num: "02", desc: "Forged through 1920s circular bronze dies creating a microscopic texture designed to grip emulsified oils.", icon: <div className="w-full h-[1px] bg-accent/30 relative overflow-hidden"><div className="absolute top-0 left-0 h-full w-20 bg-accent animate-[scan_2s_linear_infinite]"></div></div>},
    { title: "Curating", num: "03", desc: "A slow-descending 72-hour thermal cycle preserving the organic integrity of the semolia's structural matrix.", icon: <svg className="w-64 h-24 text-accent/40" viewBox="0 0 200 40"><path d="M0,20 Q25,0 50,20 T100,20 T150,20 T200,20" fill="none" stroke="currentColor" strokeWidth="1" className="animate-[pulse_4s_easeInOut_infinite]"/></svg>}
  ];

  return (
    <section ref={container} className="bg-primary flex flex-col">
      {steps.map((step, i) => (
        <div key={i} className="protocol-card h-[100dvh] w-full bg-primary border-t border-white/5 flex items-center justify-center px-12">
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <div className="font-mono text-accent text-sm tracking-[0.3em] font-bold">{step.num} / PROTOCOL</div>
              <h2 className="text-ivory font-serif italic text-6xl md:text-8xl">{step.title}</h2>
              <p className="text-white/40 text-lg max-w-md leading-relaxed">{step.desc}</p>
            </div>
            <div className="flex items-center justify-center opacity-40">
              {step.icon}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

const Footer = () => (
  <footer className="bg-primary pt-32 pb-16 px-12 border-t border-white/5 rounded-t-[4rem] relative z-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 pb-24">
      <div className="md:col-span-6 space-y-8">
        <h3 className="font-serif italic text-4xl text-ivory">Oro Giallo</h3>
        <p className="text-white/40 max-w-xs text-sm leading-relaxed">
          The intersection of agricultural heritage and industrial precision. Designed in Puglia. Distributed globally.
        </p>
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="font-mono text-[9px] text-ivory tracking-widest uppercase">System Operational // Batch 412</span>
        </div>
      </div>
      <div className="md:col-span-3 space-y-6">
        <div className="text-[10px] font-mono text-accent uppercase tracking-widest">Index</div>
        <ul className="space-y-4 text-sm text-ivory/60">
          <li className="hover:text-white transition-colors"><a href="#">Terms of Reserve</a></li>
          <li className="hover:text-white transition-colors"><a href="#">Privacy Protocol</a></li>
          <li className="hover:text-white transition-colors"><a href="#">Archive Access</a></li>
        </ul>
      </div>
      <div className="md:col-span-3 space-y-6">
        <div className="text-[10px] font-mono text-accent uppercase tracking-widest">Communication</div>
        <p className="text-sm text-ivory/60">Enquiries: studio@orogiallo.italy</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex justify-between items-center font-mono text-[9px] text-white/20 tracking-widest uppercase">
      <div>© 2026 Oro Giallo Inc.</div>
      <div>Designed by BLANQ Digital</div>
    </div>
  </footer>
);

export default function App() {
  return (
    <main className="bg-primary selection:bg-accent selection:text-primary">
      <svg className="noise-overlay w-full h-full fixed inset-0 opacity-[0.05] pointer-events-none z-[9999]">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      
      <Navbar />
      <Hero />
      <FeatureCards />
      <Manifesto />
      <ProtocolStacking />
      <Footer />

      <style>{`
        @keyframes scan {
          from { transform: translateX(-100%); }
          to { transform: translateX(500%); }
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
