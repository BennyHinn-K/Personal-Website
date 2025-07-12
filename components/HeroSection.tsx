"use client";
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Typewriter from 'typewriter-effect';
import Image from 'next/image';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 30,
        y: (e.clientY - window.innerHeight / 2) / 30,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Faded Profile Background */}
      <div 
        className="absolute inset-0 opacity-[0.08] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://assets.macaly-user-data.dev/y3113hevkgfaf0tk0vb0h9ky/sfdmpbcvf7db05kwfgg7cnyf/YqZywFLXct2KH6quI3YYk/chat-gpt-image-jul-2-2025-02-49-18-pm.png')",
          filter: 'blur(2px) brightness(0.4) contrast(1.2)',
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px) scale(1.15)`,
        }}
      />
      
      {/* Enhanced gradient overlays that blend with the background */}
      <div className="absolute inset-0 bg-gradient-radial from-cyber-cyan/8 via-cyber-dark/92 to-cyber-dark/98" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/12 via-transparent to-cyber-cyan/12" />
      <div className="absolute inset-0 bg-gradient-to-tl from-cyber-pink/6 via-transparent to-cyber-green/6" />
      
      {/* Animated grid pattern that blends with background */}
      <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-15 animate-pulse mix-blend-overlay" />
      
      {/* Enhanced floating geometric shapes */}
      <div className="absolute top-1/3 left-1/5 w-32 h-32 bg-cyber-cyan/12 rotate-45 rounded-lg blur-sm animate-float shadow-2xl shadow-cyber-cyan/20" />
      <div className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-cyber-purple/12 rotate-12 rounded-full blur-sm animate-float shadow-2xl shadow-cyber-purple/20" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/12 w-16 h-16 bg-cyber-pink/12 rotate-45 blur-sm animate-float shadow-2xl shadow-cyber-pink/20" style={{ animationDelay: '4s' }} />
      
      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-screen">
          {/* Left side - Enhanced Profile Image in Circle */}
          <motion.div className="lg:col-span-4 flex justify-center lg:justify-start order-2 lg:order-1" variants={itemVariants}>
            <div className="relative">
              {/* Main circular profile - Made bigger and more prominent */}
              <motion.div
                className="relative w-80 h-80 lg:w-96 lg:h-96 xl:w-[420px] xl:h-[420px] flex items-center justify-center"
                style={{
                  transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* Clean circular profile image with subtle border and shadow */}
                <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-cyber-cyan/80 shadow-xl bg-cyber-dark flex items-center justify-center">
                  <Image
                    src="/profile.jpg"
                    alt="BENNYHINN Profile"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    className="rounded-full border-2 border-cyber-purple/40 shadow-lg transition-transform duration-300 hover:scale-105"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Text content */}
          <motion.div className="lg:col-span-8 text-center lg:text-left order-1 lg:order-2" variants={itemVariants}>
            <motion.div className="mb-6" variants={itemVariants}>
              <span className="text-cyber-cyan font-mono text-lg tracking-wider">
                <Typewriter
                  options={{
                    strings: ['&gt; System.Initialize()', '&gt; Profile.Load()', '&gt; Ready.Execute()'],
                    autoStart: true,
                    loop: false,
                    delay: 60,
                  }}
                />
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-8xl xl:text-9xl font-black mb-8 text-gradient leading-none"
              variants={itemVariants}
            >
              Hi. I&apos;m <br />
              <span className="text-cyber-cyan font-mono">BENNYHINN</span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl lg:text-4xl xl:text-5xl mb-10 text-cyber-silver font-light leading-tight"
              variants={itemVariants}
            >
              I engineer{' '}
              <span className="text-cyber-purple font-bold bg-gradient-to-r from-cyber-purple to-cyber-pink bg-clip-text text-transparent">
                futuristic software
              </span>
            </motion.p>
            
            <motion.div 
              className="text-xl lg:text-2xl mb-12 text-cyber-silver/90 font-mono h-16"
              variants={itemVariants}
            >
              <Typewriter
                options={{
                  strings: [
                    'Full Stack Development',
                    'Android Engineering', 
                    'Web Design',
                    'Graphic Design',
                    'AI Integration'
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 80,
                  deleteSpeed: 40,
                }}
              />
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-8"
              variants={itemVariants}
            >
              <motion.button 
                className="cyber-button rounded-xl text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://wa.me/254111291633', '_blank')}
              >
                <span className="relative z-10">HIRE ME NOW</span>
              </motion.button>
              <motion.button 
                className="cyber-button rounded-xl text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10">VIEW PROJECTS</span>
              </motion.button>
              <motion.button 
                className="cyber-button rounded-xl text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://github.com/BennyHinn-K', '_blank')}
              >
                <span className="relative z-10">GITHUB</span>
              </motion.button>
            </motion.div>

            {/* Status indicators */}
            <motion.div 
              className="flex justify-center lg:justify-start space-x-8 text-sm font-mono"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyber-green rounded-full animate-pulse shadow-lg shadow-cyber-green/50" />
                <span className="text-cyber-silver/80">ONLINE</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyber-cyan rounded-full animate-pulse shadow-lg shadow-cyber-cyan/50" />
                <span className="text-cyber-silver/80">AVAILABLE FOR HIRE</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyber-purple rounded-full animate-pulse shadow-lg shadow-cyber-purple/50" />
                <span className="text-cyber-silver/80">NAIROBI, KENYA</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          variants={itemVariants}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="flex flex-col items-center space-y-3">
            <span className="text-cyber-silver/60 font-mono text-sm tracking-wider">SCROLL TO EXPLORE</span>
            <div className="w-6 h-12 border-2 border-cyber-cyan/60 rounded-full p-1 relative overflow-hidden">
              <div className="w-1 h-4 bg-gradient-to-b from-cyber-cyan to-cyber-purple rounded-full animate-bounce mx-auto" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}