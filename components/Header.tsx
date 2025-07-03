"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Code, MessageCircle } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navigationItems = [
    { id: 'home', label: 'HOME', icon: <Home className="w-4 h-4" /> },
    { id: 'projects', label: 'PROJECTS', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'skills', label: 'SKILLS', icon: <Code className="w-4 h-4" /> },
    { id: 'contact', label: 'CONTACT', icon: <MessageCircle className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / documentHeight) * 100;
      
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 50);

      // Update active section based on scroll position
      const sections = ['home', 'projects', 'skills', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />

      {/* Main Header */}
      <motion.header
        className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'backdrop-blur-md bg-cyber-dark/80 border-b border-cyber-cyan/20' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-lg flex items-center justify-center">
                <span className="text-black font-mono font-bold text-lg">BH</span>
              </div>
              <div>
                <h1 className="text-cyber-silver font-mono font-bold text-lg">BENNYHINN</h1>
                <p className="text-cyber-cyan text-xs font-mono">FULL STACK DEV</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30'
                      : 'text-cyber-silver/70 hover:text-cyber-cyan hover:bg-cyber-cyan/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <motion.button
                onClick={() => window.open('https://wa.me/254111291633', '_blank')}
                className="cyber-button rounded-lg px-6 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">HIRE ME</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-cyber-silver hover:text-cyber-cyan transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-cyber-dark/95 backdrop-blur-md z-30 border-l border-cyber-cyan/20"
          >
            <div className="p-6 pt-20">
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center space-x-3 p-4 rounded-lg font-mono transition-all duration-300 ${
                      activeSection === item.id
                        ? 'text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30'
                        : 'text-cyber-silver/70 hover:text-cyber-cyan hover:bg-cyber-cyan/5'
                    }`}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </nav>

              <div className="mt-8 space-y-4">
                <motion.button
                  onClick={() => {
                    window.open('https://wa.me/254111291633', '_blank');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full cyber-button rounded-lg py-3"
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">HIRE ME</span>
                </motion.button>

                <motion.button
                  onClick={() => {
                    window.open('https://github.com/BennyHinn-K', '_blank');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-6 py-3 border border-cyber-cyan/30 text-cyber-cyan rounded-lg font-mono hover:bg-cyber-cyan/10 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  VIEW GITHUB
                </motion.button>
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t border-cyber-gray/30">
                <h4 className="text-cyber-silver font-mono mb-4">QUICK CONTACT</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-cyber-silver/70">
                    <span className="text-cyber-cyan">WhatsApp:</span> +254 111 291 633
                  </p>
                  <p className="text-cyber-silver/70">
                    <span className="text-cyber-cyan">Location:</span> Nairobi, Kenya
                  </p>
                  <p className="text-cyber-silver/70">
                    <span className="text-cyber-cyan">Status:</span> Available for hire
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}