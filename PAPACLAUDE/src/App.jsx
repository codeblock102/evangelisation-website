import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ChevronDown, Facebook, Twitter, Instagram, Mail, Phone, MapPin, 
  Play, ChevronLeft, ChevronRight, Calendar, Clock, MapPin as LocationIcon,
  Heart, Users, Target, Award, Share2, Globe
} from 'lucide-react';
import { useLanguage } from './LanguageContext';

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
  const { t, language, toggleLanguage } = useLanguage();

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
        <div className="font-serif text-2xl font-bold text-primary">{t('navbar.brand')}</div>
        <div className="hidden md:flex items-center gap-8 text-sm text-text">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="hover:text-primary transition-colors">{t('navbar.home')}</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="hover:text-primary transition-colors">{t('navbar.about')}</a>
          <div className="relative group">
            <button 
              onClick={() => setPagesOpen(!pagesOpen)}
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              {t('navbar.pages')}
              <ChevronDown className={`w-4 h-4 transition-transform ${pagesOpen ? 'rotate-180' : ''}`} />
            </button>
            {pagesOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[180px]">
                <a href="#causes" onClick={(e) => { e.preventDefault(); scrollToSection('causes'); setPagesOpen(false); }} className="block px-4 py-2 hover:bg-secondary transition-colors">{t('navbar.causes')}</a>
                <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); setPagesOpen(false); }} className="block px-4 py-2 hover:bg-secondary transition-colors">{t('navbar.projects')}</a>
                <a href="#volunteers" onClick={(e) => { e.preventDefault(); scrollToSection('volunteers'); setPagesOpen(false); }} className="block px-4 py-2 hover:bg-secondary transition-colors">{t('navbar.team')}</a>
                <a href="#volunteer-form" onClick={(e) => { e.preventDefault(); scrollToSection('volunteer-form'); setPagesOpen(false); }} className="block px-4 py-2 hover:bg-secondary transition-colors">{t('navbar.volunteer')}</a>
                <a href="#blog" onClick={(e) => { e.preventDefault(); scrollToSection('blog'); setPagesOpen(false); }} className="block px-4 py-2 hover:bg-secondary transition-colors">{t('navbar.blog')}</a>
              </div>
            )}
          </div>
          <a href="#events" onClick={(e) => { e.preventDefault(); scrollToSection('events'); }} className="hover:text-primary transition-colors">{t('navbar.events')}</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="hover:text-primary transition-colors">{t('navbar.contact')}</a>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all text-sm font-medium text-primary"
            title={language === 'en' ? 'Switch to French' : 'Passer en anglais'}
            aria-label={language === 'en' ? 'Switch to French' : 'Switch to English'}
          >
            <Globe className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-semibold">{language.toUpperCase()}</span>
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); scrollToSection('donate'); }}
            className="bg-primary text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full hover:bg-primary-dark transition-colors text-sm font-medium"
          >
            {t('navbar.donate')}
          </button>
        </div>
      </div>
    </nav>
  );
};

// Hero Section - Matching Humanity Style
const Hero = () => {
  const scope = useRef(null);
  const { t } = useLanguage();

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
          src="/images/Support for the population of villages in the East/PHOTO-2026-02-23-20-53-15_3.jpg" 
          alt="Ministry in Action" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/60"></div>
      </div>
      
      <div className="relative z-10 px-6 md:px-12 w-full max-w-7xl mx-auto">
        <div className="max-w-4xl space-y-6">
          <p className="hero-subtitle text-white/90 text-lg md:text-xl uppercase tracking-wider">{t('hero.subtitle')}</p>
          <h1 className="hero-headline text-white font-serif text-6xl md:text-8xl lg:text-9xl font-bold leading-tight">
            {t('hero.title').split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < t('hero.title').split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={(e) => { e.preventDefault(); scrollToSection('donate'); }}
              className="px-8 py-4 rounded-full bg-accent text-text hover:bg-accent-light transition-all duration-300 font-medium"
            >
              {t('hero.donateButton')}
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className="px-8 py-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 font-medium"
            >
              {t('hero.discoverButton')}
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
  const { t } = useLanguage();

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
    { icon: "🍽️", key: "foodDistribution" },
    { icon: "💰", key: "financialSupport" },
    { icon: "👕", key: "clothingSupplies" },
    { icon: "💧", key: "cleanWater" },
    { icon: "📚", key: "schoolResources" },
    { icon: "🎈", key: "childrenPrograms" }
  ];

  return (
    <section ref={scope} id="about" className="py-20 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-16">
          <div className="about-content">
            <img 
              src="/images/Yaounde headquarters building nearing completion/PHOTO-2026-02-23-21-00-20_1.jpg" 
              alt="Our Mission" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="about-content space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">
              {t('about.title').split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < t('about.title').split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>
            <p className="text-lg text-text/80 leading-relaxed">
              {t('about.description')}
            </p>
            <button 
              onClick={(e) => { e.preventDefault(); scrollToSection('donate'); }}
              className="px-8 py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors font-medium"
            >
              {t('about.moreButton')}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service, index) => (
            <div key={index} className="about-content bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="font-semibold text-primary mb-2">{t(`about.services.${service.key}.title`)}</h3>
              <p className="text-sm text-text/70">{t(`about.services.${service.key}.description`)}</p>
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
  const { t } = useLanguage();
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
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary">{t('donation.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-8">
              <p className="text-text/70 mb-2">{t('donation.collection')}</p>
              <p className="text-4xl font-bold text-primary">${(collection / 1000000).toFixed(1)}M</p>
            </div>
            <div className="bg-white rounded-lg p-8">
              <p className="text-text/70 mb-2">{t('donation.goal')}</p>
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
              {t('donation.donateNow')}
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
  const { t } = useLanguage();

  const causeKeys = ['school', 'water', 'medical', 'food', 'education', 'community'];
  const causeImages = [
    '/images/Distribution of school supplies to Pygmy students from the eastern part of the country in the village/PHOTO-2026-02-08-16-51-07.jpg',
    '/images/Support for the population of villages in the East/PHOTO-2026-02-23-20-53-16.jpg',
    '/images/Support for the population of villages in the East/PHOTO-2026-02-23-20-53-15_1.jpg',
    '/images/Support for the population of villages in the East/PHOTO-2026-02-23-20-49-01.jpg',
    '/images/Distribution of school supplies to students in Yaoundé/PHOTO-2026-03-02-17-17-05.jpg',
    '/images/Support for the population of villages in the East/PHOTO-2026-02-23-20-48-13.jpg'
  ];
  
  const causes = causeKeys.map((key, index) => ({
    image: causeImages[index],
    key: key,
    amount: [10000, 18000, 25000, 15000, 8000, 20000][index],
    raised: [7500, 12000, 15000, 9000, 5000, 11000][index]
  }));

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
            {t('causes.title')}
          </h2>
          <button className="text-primary hover:underline font-medium">{t('causes.moreCauses')}</button>
        </div>

        <div className="relative">
          <div className="bg-background rounded-lg overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <img 
                  src={currentCause.image} 
                  alt={t(`causes.items.${currentCause.key}.title`)} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
                    ${currentCause.amount.toLocaleString()}
                  </h3>
                  <h4 className="text-xl md:text-2xl font-semibold text-text mb-3">
                    {t(`causes.items.${currentCause.key}.title`)}
                  </h4>
                  <p className="text-text/70 mb-6">{t(`causes.items.${currentCause.key}.description`)}</p>
                </div>
                <div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-text/70 mb-2">
                      <span>{t('causes.raised')}: ${currentCause.raised.toLocaleString()}</span>
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
                    {t('causes.donate')}
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
  const { t } = useLanguage();

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
          src="/images/Support for the population of villages in the East/PHOTO-2026-02-23-20-53-15_3.jpg" 
          alt="Join Us" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto text-center join-content">
        <h2 className="font-serif text-4xl md:text-6xl font-bold text-primary mb-6">
          {t('joinBanner.title')}
        </h2>
        <p className="text-lg text-text/80 max-w-3xl mx-auto mb-8">
          {t('joinBanner.description')}
        </p>
        <button 
          onClick={(e) => { e.preventDefault(); scrollToSection('donate'); }}
          className="px-10 py-4 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors font-medium text-lg"
        >
          {t('joinBanner.donateNow')}
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
  const { t } = useLanguage();

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
            {t('volunteerForm.title')}
          </h2>
          <p className="text-lg text-text/80">
            {t('volunteerForm.description')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="volunteer-content bg-white rounded-lg p-8 md:p-12 shadow-lg space-y-6">
          <div>
            <label className="block text-text font-medium mb-2">{t('volunteerForm.name')}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-text/20 rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-text font-medium mb-2">{t('volunteerForm.email')}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-text/20 rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-text font-medium mb-2">{t('volunteerForm.message')}</label>
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
            {submitted ? t('volunteerForm.thankYou') : t('volunteerForm.submit')}
          </button>
        </form>
      </div>
    </section>
  );
};

// What We Do Section
const WhatWeDo = () => {
  const scope = useRef(null);
  const { t } = useLanguage();

  const serviceKeys = ['medical', 'water', 'community', 'food', 'evangelism', 'education'];
  const icons = [
    <Heart className="w-8 h-8" />,
    <Users className="w-8 h-8" />,
    <Heart className="w-8 h-8" />,
    <Heart className="w-8 h-8" />,
    <Target className="w-8 h-8" />,
    <Award className="w-8 h-8" />
  ];

  const services = serviceKeys.map((key, index) => ({
    icon: icons[index],
    key: key
  }));

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
          {t('whatWeDo.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-card bg-background rounded-lg p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-primary mb-4">{service.icon}</div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-3">{t(`whatWeDo.services.${service.key}.title`)}</h3>
              <p className="text-text/70 leading-relaxed">{t(`whatWeDo.services.${service.key}.description`)}</p>
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
  const { t } = useLanguage();

  const projectKeys = ['believe', 'well', 'walk', 'drinking', 'freedom', 'passion'];
  const projectImages = [
    '/images/Mission and Objectif of minister 2023-2025/PHOTO-2026-01-23-20-01-47.jpg',
    '/images/Yaounde headquarters building nearing completion/PHOTO-2026-02-23-21-00-20.jpg',
    '/images/Distribution of school supplies to Pygmy students from the eastern part of the country in the village/PHOTO-2026-02-08-16-51-06_3.jpg',
    '/images/Support for the population of villages in the East/PHOTO-2026-02-23-20-53-14.jpg',
    '/images/International Minister Ghana/PHOTO-2025-06-02-15-09-06.jpg',
    '/images/Mission at international Edmonton Canada/PHOTO-2026-01-27-02-25-08.jpg'
  ];
  
  const projects = projectKeys.map((key, index) => ({
    image: projectImages[index],
    key: key
  }));

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
            {t('projects.title')}
          </h2>
          <button className="text-primary hover:underline font-medium">{t('projects.moreProject')}</button>
        </div>
        <p className="text-lg text-text/80 mb-12 max-w-3xl">
          {t('projects.description')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="project-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <img 
                src={project.image} 
                alt={t(`projects.items.${project.key}.title`)} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {t(`projects.items.${project.key}.category`)}
                  </span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                    {t(`projects.items.${project.key}.subcategory`)}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-2">{t(`projects.items.${project.key}.title`)}</h3>
                <p className="text-text/70">{t(`projects.items.${project.key}.description`)}</p>
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
  const { t } = useLanguage();

  const testimonialKeys = ['pastor', 'marie', 'elder', 'sara'];
  const testimonialAvatars = [
    '/images/International Minister Ghana/PHOTO-2025-06-02-15-06-38.jpg',
    '/images/Distribution of school supplies to students in Yaoundé/PHOTO-2026-03-02-17-17-05.jpg',
    '/images/International Minister South Sudan/PHOTO-2025-09-01-12-03-33.jpg',
    '/images/Mission at international Edmonton Canada/PHOTO-2026-01-25-21-42-09.jpg'
  ];
  
  const testimonials = testimonialKeys.map((key, index) => ({
    key: key,
    avatar: testimonialAvatars[index]
  }));

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
          {t('testimonials.title')}
        </h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="testimonial-content bg-white rounded-lg p-8 md:p-12 shadow-lg text-center">
            <div className="text-6xl text-primary/20 font-serif mb-6">"</div>
            <p className="text-xl text-text/80 mb-8 leading-relaxed">{t(`testimonials.items.${current.key}.quote`)}</p>
            <div className="flex items-center justify-center gap-4">
              <img 
                src={current.avatar} 
                alt={t(`testimonials.items.${current.key}.name`)} 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="font-semibold text-primary text-lg">{t(`testimonials.items.${current.key}.name`)}</div>
                <div className="text-text/60">{t(`testimonials.items.${current.key}.role`)}</div>
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
  const { t } = useLanguage();

  const statKeys = ['donations', 'projects', 'people', 'causes'];
  const icons = [
    <Heart className="w-8 h-8" />,
    <Target className="w-8 h-8" />,
    <Users className="w-8 h-8" />,
    <Award className="w-8 h-8" />
  ];

  const stats = statKeys.map((key, index) => ({
    number: t(`stats.${key}.number`),
    label: t(`stats.${key}.label`),
    icon: icons[index]
  }));

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
  const { t } = useLanguage();

  const roleKeys = ['fieldDirector', 'educationCoordinator', 'communityOutreach'];
  const names = ["Martin Luther", "Keira Knightley", "Jack Sparrow"];
  const volunteerImages = [
    '/images/International Minister Ghana/PHOTO-2025-06-02-15-06-37 (1).jpg',
    '/images/Distribution of school supplies to Pygmy students from the eastern part of the country in the village/PHOTO-2026-02-08-16-51-06_4.jpg',
    '/images/Mission at international Edmonton Canada/PHOTO-2026-01-25-21-42-08_1.jpg'
  ];

  const volunteers = roleKeys.map((roleKey, index) => ({
    name: names[index],
    role: t(`volunteers.roles.${roleKey}`),
    image: volunteerImages[index]
  }));

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
          {t('volunteers.title')}
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
              <h3 className="font-serif text-2xl font-bold text-primary mb-1">{t('volunteers.becomeVolunteer')}</h3>
              <p className="text-text/70">{t('volunteers.becomeDescription')}</p>
            </div>
            <button 
              onClick={(e) => { e.preventDefault(); scrollToSection('volunteer-form'); }}
              className="ml-4 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors font-medium"
            >
              {t('volunteers.joinUs')}
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
  const { t } = useLanguage();

  const eventKeys = ['education', 'health', 'water'];
  const dates = [30, 15, 22];
  const monthKeys = ['july', 'august', 'august'];
  const organizers = ["Nattasha", "David James", "Jake Gibson"];
  const eventImages = [
    '/images/Distribution of school supplies to students in Yaoundé/PHOTO-2026-03-02-17-17-06.jpg',
    '/images/Support for the population of villages in the East/PHOTO-2026-02-23-20-53-15_2.jpg',
    '/images/Support for the population of villages in the East/PHOTO-2026-02-23-20-53-16_1.jpg'
  ];

  const events = eventKeys.map((key, index) => ({
    date: dates[index],
    month: t(`events.months.${monthKeys[index]}`),
    organizer: organizers[index],
    key: key,
    image: eventImages[index]
  }));

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
            {t('events.title')}
          </h2>
          <button className="text-primary hover:underline font-medium">{t('events.moreEvents')}</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, index) => (
            <div 
              key={index}
              className="event-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <div className="relative">
                <img 
                  src={event.image} 
                  alt={t(`events.items.${event.key}.title`)} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary text-white rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">{event.date}</div>
                  <div className="text-xs uppercase">{event.month}</div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-text/60 mb-2">{t('events.organizedBy')}: {event.organizer}</p>
                <h3 className="font-serif text-xl font-bold text-primary mb-3">{t(`events.items.${event.key}.title`)}</h3>
                <p className="text-text/70 text-sm mb-4">{t(`events.items.${event.key}.description`)}</p>
                <div className="space-y-2 text-sm text-text/60">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{t(`events.items.${event.key}.time`)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LocationIcon className="w-4 h-4" />
                    <span>{t(`events.items.${event.key}.location`)}</span>
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
  const { t } = useLanguage();

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
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">{t('newsletter.title')}</h2>
        <p className="text-lg text-text/80 mb-8">
          {t('newsletter.description')}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('newsletter.placeholder')}
            className="flex-1 px-6 py-4 rounded-full border border-text/20 focus:outline-none focus:border-primary"
            required
          />
          <button
            type="submit"
            className="px-8 py-4 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors font-medium"
          >
            {t('newsletter.subscribe')}
          </button>
        </form>
        {submitted && (
          <p className="mt-4 text-primary font-medium">{t('newsletter.thankYou')}</p>
        )}
      </div>
    </section>
  );
};

// Recent Blog Section
const Blog = () => {
  const scope = useRef(null);
  const { t } = useLanguage();

  const postKeys = ['hope', 'water', 'volunteer'];
  const dates = ["July 15, 2025", "July 10, 2025", "July 5, 2025"];
  const blogImages = [
    '/images/Mission and Objectif of minister 2023-2025/PHOTO-2026-01-23-20-02-18.jpg',
    '/images/Support for the population of villages in the East/PHOTO-2026-02-23-20-53-18.jpg',
    '/images/International Minister Ghana/PHOTO-2025-06-02-15-06-37.jpg'
  ];

  const posts = postKeys.map((key, index) => ({
    image: blogImages[index],
    key: key,
    date: dates[index]
  }));

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
            {t('blog.title')}
          </h2>
          <button className="text-primary hover:underline font-medium">{t('blog.seeBlogs')}</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div 
              key={index}
              className="blog-card bg-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <img 
                src={post.image} 
                alt={t(`blog.items.${post.key}.title`)} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-text/60 mb-2">{post.date}</p>
                <h3 className="font-serif text-2xl font-bold text-primary mb-3">{t(`blog.items.${post.key}.title`)}</h3>
                <p className="text-text/70">{t(`blog.items.${post.key}.excerpt`)}</p>
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
  const { t } = useLanguage();
  
  return (
    <footer id="contact" className="bg-primary text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <h3 className="font-serif text-3xl font-bold">{t('navbar.brand')}</h3>
            <p className="text-white/80 leading-relaxed">
              {t('footer.description')}
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
            <h4 className="font-semibold text-lg">{t('footer.getInvolved')}</h4>
            <ul className="space-y-3 text-white/80">
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="hover:text-white transition-colors">{t('navbar.about')}</a></li>
              <li><a href="#volunteer-form" onClick={(e) => { e.preventDefault(); scrollToSection('volunteer-form'); }} className="hover:text-white transition-colors">{t('navbar.volunteer')}</a></li>
              <li><a href="#causes" onClick={(e) => { e.preventDefault(); scrollToSection('causes'); }} className="hover:text-white transition-colors">{t('navbar.causes')}</a></li>
              <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="hover:text-white transition-colors">{t('navbar.projects')}</a></li>
              <li><a href="#volunteers" onClick={(e) => { e.preventDefault(); scrollToSection('volunteers'); }} className="hover:text-white transition-colors">{t('navbar.team')}</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-semibold text-lg">{t('footer.utilityPage')}</h4>
            <ul className="space-y-3 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.styleGuide')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.licenses')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.password')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.page404')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.changelog')}</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-semibold text-lg">{t('footer.contact')}</h4>
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
            {t('footer.copyright')}
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
