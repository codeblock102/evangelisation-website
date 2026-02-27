import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ChevronDown, Facebook, Twitter, Instagram, Mail, Phone, MapPin, 
  Play, ChevronLeft, ChevronRight, Calendar, Clock, MapPin as LocationIcon,
  Heart, Users, Target, Award, Share2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Helper function for smooth scrolling
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Navbar Component with Dropdown
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-4' : 'bg-white/95 backdrop-blur-sm py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="font-serif text-2xl font-bold text-primary">Hope for Congo</div>
        <div className="hidden md:flex items-center gap-8 text-sm text-text">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="hover:text-primary transition-colors">Home</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="hover:text-primary transition-colors">About Us</a>
          <div className="relative group">
            <button 
              onClick={() => setPagesOpen(!pagesOpen)}
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              Pages
              <ChevronDown className={`w-4 h-4 transition-transform ${pagesOpen ? 'rotate-180' : ''}`} />
            </button>
            {pagesOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[180px]">
                <a href="#causes" onClick={(e) => { e.preventDefault(); scrollToSection('causes'); setPagesOpen(false); }} className="block px-4 py-2 hover:bg-secondary transition-colors">Causes</a>
                <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); setPagesOpen(false); }} className="block px-4 py-2 hover:bg-secondary transition-colors">Projects</a>
                <a href="#volunteers" onClick={(e) => { e.preventDefault(); scrollToSection('volunteers'); setPagesOpen(false); }} className="block px-4 py-2 hover:bg-secondary transition-colors">Team</a>
                <a href="#volunteer-form" onClick={(e) => { e.preventDefault(); scrollToSection('volunteer-form'); setPagesOpen(false); }} className="block px-4 py-2 hover:bg-secondary transition-colors">Volunteer</a>
                <a href="#blog" onClick={(e) => { e.preventDefault(); scrollToSection('blog'); setPagesOpen(false); }} className="block px-4 py-2 hover:bg-secondary transition-colors">Blog</a>
              </div>
            )}
          </div>
          <a href="#events" onClick={(e) => { e.preventDefault(); scrollToSection('events'); }} className="hover:text-primary transition-colors">Events</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="hover:text-primary transition-colors">Contact</a>
        </div>
        <button 
          onClick={(e) => { e.preventDefault(); scrollToSection('donate'); }}
          className="bg-primary text-white px-6 py-2.5 rounded-full hover:bg-primary-dark transition-colors text-sm font-medium"
        >
          Donate
        </button>
      </div>
    </nav>
  );
};

// Hero Section - Matching Humanity Style
const Hero = () => {
  const scope = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-subtitle", { y: 40, opacity: 0, duration: 1, ease: "power3.out" })
        .from(".hero-headline", { y: 60, opacity: 0, duration: 1.4, ease: "power4.out" }, "-=0.8")
        .from(".hero-buttons", { y: 20, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.8")
        .from(".hero-video", { scale: 0.8, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.5");
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?random=1" 
          alt="Congo Village" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/60"></div>
      </div>
      
      <div className="relative z-10 px-6 md:px-12 w-full max-w-7xl mx-auto">
        <div className="max-w-4xl space-y-6">
          <p className="hero-subtitle text-white/90 text-lg md:text-xl uppercase tracking-wider">Rural Communities in Need</p>
          <h1 className="hero-headline text-white font-serif text-6xl md:text-8xl lg:text-9xl font-bold leading-tight">
            Being Hope Bringer<br />For Congo Villages
          </h1>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={(e) => { e.preventDefault(); scrollToSection('donate'); }}
              className="px-8 py-4 rounded-full bg-accent text-text hover:bg-accent-light transition-all duration-300 font-medium"
            >
              Donate
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className="px-8 py-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 font-medium"
            >
              Discover
            </button>
          </div>
        </div>
      </div>
      
      <div className="hero-video absolute bottom-12 right-12 z-10">
        <button className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all group">
          <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </section>
  );
};

// About Us Section with Service Items
const AboutUs = () => {
  const scope = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".about-content", {
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  const services = [
    { icon: "🍽️", title: "Food Distribution", description: "Providing nutritious meals to families in need" },
    { icon: "💰", title: "Financial Support", description: "Helping communities with economic development" },
    { icon: "👕", title: "Clothing & Supplies", description: "Distributing essential items to those in need" },
    { icon: "💧", title: "Clean Water Wells", description: "Building sustainable water access points" },
    { icon: "📚", title: "School Resources", description: "Supporting education with books and supplies" },
    { icon: "🎈", title: "Children's Programs", description: "Creating safe spaces for children to learn and play" }
  ];

  return (
    <section ref={scope} id="about" className="py-20 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-16">
          <div className="about-content">
            <img 
              src="https://picsum.photos/600/700?random=2" 
              alt="Our Mission" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="about-content space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">
              Help People,<br />Our Main Goals
            </h2>
            <p className="text-lg text-text/80 leading-relaxed">
              We want to do more and you can help. By committing a small fraction of your income to protect 
              children in need, you can help save a child and contribute to humanity. See how you can partner 
              with Hope for Congo to meet both the physical and spiritual needs of the poor one person, one 
              family at a time. Be the change that you want to see in this world!
            </p>
            <button 
              onClick={(e) => { e.preventDefault(); scrollToSection('donate'); }}
              className="px-8 py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors font-medium"
            >
              More About
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service, index) => (
            <div key={index} className="about-content bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="font-semibold text-primary mb-2">{service.title}</h3>
              <p className="text-sm text-text/70">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Total Donation Counter Section
const DonationCounter = () => {
  const scope = useRef(null);
  const [collection, setCollection] = useState(0);
  const goal = 5000000;
  const target = 2500000;

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".donation-content", {
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      // Animate counter
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCollection(target);
          clearInterval(timer);
        } else {
          setCollection(Math.floor(current));
        }
      }, duration / steps);
    }, scope);
    return () => ctx.revert();
  }, []);

  const percentage = (collection / goal) * 100;

  return (
    <section ref={scope} className="py-20 md:py-32 px-6 md:px-12 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="donation-content text-center space-y-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">Total Donation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-8">
              <p className="text-text/70 mb-2">Collection</p>
              <p className="text-4xl font-bold text-primary">${(collection / 1000000).toFixed(1)}M</p>
            </div>
            <div className="bg-white rounded-lg p-8">
              <p className="text-text/70 mb-2">Goal</p>
              <p className="text-4xl font-bold text-primary">${(goal / 1000000).toFixed(0)}M</p>
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/50 rounded-full h-4 mb-4 overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <button 
              onClick={(e) => { e.preventDefault(); scrollToSection('donate'); }}
              className="px-8 py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors font-medium"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Our Causes Slider Section
const Causes = () => {
  const scope = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const causes = [
    {
      image: "https://picsum.photos/600/400?random=10",
      title: "Build school for poor children",
      amount: 10000,
      raised: 7500,
      description: "Education is the foundation of hope. Help us build schools in rural Congo villages."
    },
    {
      image: "https://picsum.photos/600/400?random=11",
      title: "Clean water well project",
      amount: 18000,
      raised: 12000,
      description: "Providing access to safe, clean water for communities across the Congo."
    },
    {
      image: "https://picsum.photos/600/400?random=12",
      title: "Medical clinic establishment",
      amount: 25000,
      raised: 15000,
      description: "Building healthcare facilities to serve remote villages in need."
    },
    {
      image: "https://picsum.photos/600/400?random=13",
      title: "Food security program",
      amount: 15000,
      raised: 9000,
      description: "Ensuring families have access to nutritious food year-round."
    },
    {
      image: "https://picsum.photos/600/400?random=14",
      title: "Children's education fund",
      amount: 8000,
      raised: 5000,
      description: "Supporting children's education with books, supplies, and scholarships."
    },
    {
      image: "https://picsum.photos/600/400?random=15",
      title: "Community center development",
      amount: 20000,
      raised: 11000,
      description: "Creating spaces for community gatherings, worship, and learning."
    }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".causes-content", {
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  const nextCause = () => {
    setCurrentIndex((prev) => (prev + 1) % causes.length);
  };

  const prevCause = () => {
    setCurrentIndex((prev) => (prev - 1 + causes.length) % causes.length);
  };

  const currentCause = causes[currentIndex];
  const progress = (currentCause.raised / currentCause.amount) * 100;

  return (
    <section ref={scope} id="causes" className="py-20 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="causes-content text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
            You can help lots of people by donate something.
          </h2>
          <button className="text-primary hover:underline font-medium">More Causes</button>
        </div>

        <div className="relative">
          <div className="bg-background rounded-lg overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <img 
                  src={currentCause.image} 
                  alt={currentCause.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
                    ${currentCause.amount.toLocaleString()}
                  </h3>
                  <h4 className="text-xl md:text-2xl font-semibold text-text mb-3">
                    {currentCause.title}
                  </h4>
                  <p className="text-text/70 mb-6">{currentCause.description}</p>
                </div>
                <div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-text/70 mb-2">
                      <span>Raised: ${currentCause.raised.toLocaleString()}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="bg-white/50 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-primary h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.preventDefault(); scrollToSection('donate'); }}
                    className="w-full px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors font-medium"
                  >
                    Donate
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={prevCause}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          <button 
            onClick={nextCause}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {causes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-primary/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Join With Us Banner Section
const JoinBanner = () => {
  const scope = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".join-content", {
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="py-20 md:py-32 px-6 md:px-12 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/600?random=20" 
          alt="Join Us" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto text-center join-content">
        <h2 className="font-serif text-4xl md:text-6xl font-bold text-primary mb-6">
          Join With Hope for Congo To Give Education For Poor Children
        </h2>
        <p className="text-lg text-text/80 max-w-3xl mx-auto mb-8">
          Join us in the fight against poverty! By becoming a Champion for the poor, you can create 
          your own webpage and raise funds for the poorest of the poor in the Democratic Republic of Congo.
        </p>
        <button 
          onClick={(e) => { e.preventDefault(); scrollToSection('donate'); }}
          className="px-10 py-4 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors font-medium text-lg"
        >
          Donate Now
        </button>
      </div>
    </section>
  );
};

// Become A Volunteer Form Section
const VolunteerForm = () => {
  const scope = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".volunteer-content", {
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section ref={scope} id="volunteer-form" className="py-20 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="volunteer-content text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
            Become A Volunteer
          </h2>
          <p className="text-lg text-text/80">
            Thank you for your interest in volunteering with Hope for Congo. Fill out the form below to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="volunteer-content bg-white rounded-lg p-8 md:p-12 shadow-lg space-y-6">
          <div>
            <label className="block text-text font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-text/20 rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-text font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-text/20 rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-text font-medium mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 border border-text/20 rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-8 py-4 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors font-medium"
          >
            {submitted ? 'Thank you! Your submission has been received!' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  );
};

// What We Do Section
const WhatWeDo = () => {
  const scope = useRef(null);

  const services = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Medical Mission Support",
      description: "Doing the most good is hard. We recommend some of the best charities in the world to you."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Clean Water Access",
      description: "The funds from events enable volunteers like you help us make these events more successful."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Community Care Programs",
      description: "We distribute usable garments to the poorest of the poor children, women and the men of all ages."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Food Security",
      description: "Fundraising for local causes World Help received through the humanity and give hope to people."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Evangelism Outreach",
      description: "Children's Hospital Foundation is proud to support a variety of community events and campaigns."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Educational Programs",
      description: "A Fund is designed to support on-going giving which requires fund management services."
    }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="py-20 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary text-center mb-16">
          We do it for People in Need
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-card bg-background rounded-lg p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-primary mb-4">{service.icon}</div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-3">{service.title}</h3>
              <p className="text-text/70 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured Projects Section (Enhanced)
const Projects = () => {
  const scope = useRef(null);

  const projects = [
    {
      image: "https://picsum.photos/400/300?random=30",
      category: "Education",
      subcategory: "Health",
      title: "Make People Believe in Cause",
      description: "Building schools and educational facilities in remote villages."
    },
    {
      image: "https://picsum.photos/400/300?random=31",
      category: "Water",
      subcategory: "People",
      title: "Building a well is the easy part",
      description: "Providing sustainable water access to communities."
    },
    {
      image: "https://picsum.photos/400/300?random=32",
      category: "Children",
      subcategory: "Needs",
      title: "Carolina and Tabia's Walk",
      description: "Supporting children's education and development programs."
    },
    {
      image: "https://picsum.photos/400/300?random=33",
      category: "Water",
      subcategory: "Drinking",
      title: "Help to Get Drinking Water",
      description: "Installing clean water systems in rural areas."
    },
    {
      image: "https://picsum.photos/400/300?random=34",
      category: "Women",
      subcategory: "Freedom",
      title: "Provides Full Freedom to women",
      description: "Empowering women through education and economic opportunities."
    },
    {
      image: "https://picsum.photos/400/300?random=35",
      category: "Education",
      subcategory: "Health",
      title: "Your Passion of Marvelous Performance",
      description: "Creating educational opportunities for all."
    }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} id="projects" className="py-20 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">
            Featured Projects
          </h2>
          <button className="text-primary hover:underline font-medium">More Project</button>
        </div>
        <p className="text-lg text-text/80 mb-12 max-w-3xl">
          Join us in the fight against poverty! By becoming a Champion for the poor, you can create 
          your own webpage and raise funds for the poorest of the poor in the Democratic Republic of Congo.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="project-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                    {project.subcategory}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-2">{project.title}</h3>
                <p className="text-text/70">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Slider Section
const Testimonials = () => {
  const scope = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Hope for Congo is a wonderful, easy to use site. We were able to have a successful mission and we couldn't have done it without their support.",
      name: "Pastor Jean",
      role: "Community Leader",
      avatar: "https://picsum.photos/100/100?random=40"
    },
    {
      quote: "I Thank you very much Hope for Congo team. It will definitely help our students to enrich their reading skills and knowledge forever.",
      name: "Marie Kabila",
      role: "School Principal",
      avatar: "https://picsum.photos/100/100?random=41"
    },
    {
      quote: "This is great service, I really admire. Hope for Congo really dedicate the welfare of humanity general particularly in this country.",
      name: "Elder Samuel",
      role: "Village Elder",
      avatar: "https://picsum.photos/100/100?random=42"
    },
    {
      quote: "Thank you very much Hope for Congo team. It will definitely help our students to enrich their reading skills and knowledge forever.",
      name: "Sara Taylor",
      role: "Donator",
      avatar: "https://picsum.photos/100/100?random=43"
    }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".testimonial-content", {
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section ref={scope} className="py-20 md:py-32 px-6 md:px-12 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary text-center mb-16">
          What People Say About Us
        </h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="testimonial-content bg-white rounded-lg p-8 md:p-12 shadow-lg text-center">
            <div className="text-6xl text-primary/20 font-serif mb-6">"</div>
            <p className="text-xl text-text/80 mb-8 leading-relaxed">{current.quote}</p>
            <div className="flex items-center justify-center gap-4">
              <img 
                src={current.avatar} 
                alt={current.name} 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="font-semibold text-primary text-lg">{current.name}</div>
                <div className="text-text/60">{current.role}</div>
              </div>
            </div>
          </div>

          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-primary/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Stats Section
const Stats = () => {
  const scope = useRef(null);

  const stats = [
    { number: "50K", label: "Received Donations From Our People", icon: <Heart className="w-8 h-8" /> },
    { number: "120+", label: "Projects Done With The Help Of Donators", icon: <Target className="w-8 h-8" /> },
    { number: "5,000+", label: "People We Helped till this year", icon: <Users className="w-8 h-8" /> },
    { number: "80+", label: "Number of Solved Causes till now", icon: <Award className="w-8 h-8" /> }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="py-20 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-card bg-background rounded-lg p-8 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-primary mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3">{stat.number}</div>
              <div className="text-text/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Clients/Partners Section
const Partners = () => {
  const scope = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".partner-logo", {
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="py-20 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {[...Array(5)].map((_, index) => (
            <div 
              key={index}
              className="partner-logo bg-white rounded-lg p-6 flex items-center justify-center h-24 hover:shadow-md transition-shadow"
            >
              <div className="text-2xl font-bold text-primary/40">Partner {index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Meet Our Volunteers Section
const Volunteers = () => {
  const scope = useRef(null);

  const volunteers = [
    {
      name: "Martin Luther",
      role: "Field Director",
      image: "https://picsum.photos/300/300?random=50"
    },
    {
      name: "Keira Knightley",
      role: "Education Coordinator",
      image: "https://picsum.photos/300/300?random=51"
    },
    {
      name: "Jack Sparrow",
      role: "Community Outreach",
      image: "https://picsum.photos/300/300?random=52"
    }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".volunteer-card", {
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} id="volunteers" className="py-20 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary text-center mb-16">
          Meet Our Volunteers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {volunteers.map((volunteer, index) => (
            <div 
              key={index}
              className="volunteer-card bg-background rounded-lg overflow-hidden text-center hover:shadow-lg transition-shadow"
            >
              <img 
                src={volunteer.image} 
                alt={volunteer.name} 
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold text-primary mb-2">{volunteer.name}</h3>
                <p className="text-text/70 mb-4">{volunteer.role}</p>
                <div className="flex justify-center gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <Facebook className="w-5 h-5 text-primary" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <Twitter className="w-5 h-5 text-primary" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <Instagram className="w-5 h-5 text-primary" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-secondary rounded-lg p-6">
            <Heart className="w-8 h-8 text-primary" />
            <div className="text-left">
              <h3 className="font-serif text-2xl font-bold text-primary mb-1">Become a Volunteer</h3>
              <p className="text-text/70">Centuries but also the leap electronic typesetting, remaining</p>
            </div>
            <button 
              onClick={(e) => { e.preventDefault(); scrollToSection('volunteer-form'); }}
              className="ml-4 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors font-medium"
            >
              Join Us Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Events Section
const Events = () => {
  const scope = useRef(null);

  const events = [
    {
      date: 30,
      month: "July",
      organizer: "Nattasha",
      title: "Education for Poor Children",
      description: "Podcasting operational change management inside of workflows to establish a framework indicators.",
      time: "10:00 AM - 18:00 PM, Everyday",
      location: "Kinshasa, Democratic Republic of Congo"
    },
    {
      date: 15,
      month: "August",
      organizer: "David James",
      title: "Community Health Outreach",
      description: "Providing medical services and health education to remote villages.",
      time: "9:00 AM - 5:00 PM",
      location: "Eastern Province, DRC"
    },
    {
      date: 22,
      month: "August",
      organizer: "Jake Gibson",
      title: "Water Well Dedication",
      description: "Celebrating the completion of new clean water access points.",
      time: "2:00 PM - 4:00 PM",
      location: "Kasai Region, DRC"
    }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".event-card", {
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} id="events" className="py-20 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">
            Join Upcoming Events and Webinars
          </h2>
          <button className="text-primary hover:underline font-medium">More Events</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, index) => (
            <div 
              key={index}
              className="event-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <div className="relative">
                <img 
                  src={`https://picsum.photos/400/250?random=${60 + index}`} 
                  alt={event.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary text-white rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">{event.date}</div>
                  <div className="text-xs uppercase">{event.month}</div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-text/60 mb-2">Organized By: {event.organizer}</p>
                <h3 className="font-serif text-xl font-bold text-primary mb-3">{event.title}</h3>
                <p className="text-text/70 text-sm mb-4">{event.description}</p>
                <div className="space-y-2 text-sm text-text/60">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LocationIcon className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Newsletter Section
const Newsletter = () => {
  const scope = useRef(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".newsletter-content", {
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section ref={scope} className="py-20 md:py-32 px-6 md:px-12 bg-secondary">
      <div className="max-w-4xl mx-auto text-center newsletter-content">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">Newsletter</h2>
        <p className="text-lg text-text/80 mb-8">
          Sign up our monthly newsletter to get the latest news, events, volunteer opportunities.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 rounded-full border border-text/20 focus:outline-none focus:border-primary"
            required
          />
          <button
            type="submit"
            className="px-8 py-4 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors font-medium"
          >
            Subscribe
          </button>
        </form>
        {submitted && (
          <p className="mt-4 text-primary font-medium">Thank you! Your submission has been received!</p>
        )}
      </div>
    </section>
  );
};

// Recent Blog Section
const Blog = () => {
  const scope = useRef(null);

  const posts = [
    {
      image: "https://picsum.photos/400/250?random=70",
      title: "Building Hope: Our Latest School Project",
      excerpt: "Learn about our recent efforts to build educational facilities in remote Congo villages.",
      date: "July 15, 2025"
    },
    {
      image: "https://picsum.photos/400/250?random=71",
      title: "Water Well Success Stories",
      excerpt: "Discover how clean water access is transforming communities across the DRC.",
      date: "July 10, 2025"
    },
    {
      image: "https://picsum.photos/400/250?random=72",
      title: "Volunteer Spotlight: Making a Difference",
      excerpt: "Meet the dedicated volunteers who are bringing hope to Congo villages.",
      date: "July 5, 2025"
    }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} id="blog" className="py-20 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">
            Take Look At Recent Blog Posts
          </h2>
          <button className="text-primary hover:underline font-medium">See Our Blogs</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div 
              key={index}
              className="blog-card bg-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-text/60 mb-2">{post.date}</p>
                <h3 className="font-serif text-2xl font-bold text-primary mb-3">{post.title}</h3>
                <p className="text-text/70">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Footer
const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <h3 className="font-serif text-3xl font-bold">Hope for Congo</h3>
            <p className="text-white/80 leading-relaxed">
              No one knows what an equitable world looks like. We are working together with only hope 
              for raising a better tomorrow.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-semibold text-lg">Get Involved</h4>
            <ul className="space-y-3 text-white/80">
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#volunteer-form" onClick={(e) => { e.preventDefault(); scrollToSection('volunteer-form'); }} className="hover:text-white transition-colors">Volunteer</a></li>
              <li><a href="#causes" onClick={(e) => { e.preventDefault(); scrollToSection('causes'); }} className="hover:text-white transition-colors">Causes</a></li>
              <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#volunteers" onClick={(e) => { e.preventDefault(); scrollToSection('volunteers'); }} className="hover:text-white transition-colors">Team</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-semibold text-lg">Utility Page</h4>
            <ul className="space-y-3 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Style Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Password</a></li>
              <li><a href="#" className="hover:text-white transition-colors">404 Page</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-semibold text-lg">Contact</h4>
            <div className="space-y-4 text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>Kinshasa, Democratic Republic of Congo</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>help@hopeforcongo.org</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span>+243 900 000 000</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-white/60">
            Copyright © Hope for Congo | Designed by Hope for Congo - Powered by React
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function App() {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <AboutUs />
      <DonationCounter />
      <Causes />
      <JoinBanner />
      <VolunteerForm />
      <WhatWeDo />
      <Projects />
      <Testimonials />
      <Stats />
      <Partners />
      <Volunteers />
      <Events />
      <Newsletter />
      <Blog />
      <Footer />
    </main>
  );
}
