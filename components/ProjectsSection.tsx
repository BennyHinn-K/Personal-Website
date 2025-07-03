"use client";
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Smartphone, Globe, Palette } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: 'fullstack' | 'android' | 'design';
  image: string;
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export default function ProjectsSection() {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: 'PROJECT ANTIQUES',
      description: 'Advanced Android application built with Java/Kotlin featuring modern UI components and seamless user experience. Implements advanced architectural patterns.',
      tech: ['Java', 'Kotlin', 'Android SDK', 'Firebase', 'Material Design'],
      category: 'android',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      githubUrl: 'https://github.com/BennyHinn-K/PROJECT-ANTIQUES',
      featured: true,
    },
    {
      id: '2',
      title: 'GENESIL AUTOBRAKE',
      description: 'Full-stack web application for automotive parts and accessories. Features responsive design, e-commerce functionality, and admin dashboard.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'MongoDB', 'Express'],
      category: 'fullstack',
      image: 'https://assets.macaly-user-data.dev/y3113hevkgfaf0tk0vb0h9ky/new-chat/IOM9tfFI7eZlcvEC3Dd1T/smooth-ride-with-monroe-shock-absorbers.png',
      githubUrl: 'https://github.com/BennyHinn-K/genesil-autobrake-website',
      liveUrl: 'https://genesil-autobrake.demo',
      featured: true,
    },
    {
      id: '3',
      title: 'AUTOMOTIVE DESIGNS',
      description: 'Creative graphic design collection for automotive industry. Includes branding, marketing materials, and digital assets.',
      tech: ['Photoshop', 'Illustrator', 'Figma', 'After Effects', 'Branding'],
      category: 'design',
      image: 'https://assets.macaly-user-data.dev/y3113hevkgfaf0tk0vb0h9ky/new-chat/AT8nx3OfvuH2HMoCl8DMM/chat-gpt-image-jun-7-2025-12-08-36-pm.png',
      githubUrl: 'https://github.com/BennyHinn-K/Portfolio',
      featured: true,
    },
  ]);

  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'android': return <Smartphone className="w-6 h-6" />;
      case 'fullstack': return <Globe className="w-6 h-6" />;
      case 'design': return <Palette className="w-6 h-6" />;
      default: return <Github className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'android': return 'text-cyber-green';
      case 'fullstack': return 'text-cyber-blue';
      case 'design': return 'text-cyber-pink';
      default: return 'text-cyber-cyan';
    }
  };

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-neural-net opacity-10" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />
      
      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Section header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="text-cyber-cyan font-mono text-lg tracking-wider mb-4 block">
            &lt; PROJECTS /&gt;
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-gradient">
            Featured Work
          </h2>
          <p className="text-xl text-cyber-silver/80 max-w-2xl mx-auto">
            Cutting-edge projects showcasing expertise in full-stack development, 
            mobile engineering, and creative design solutions.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Project card */}
              <div className="glass-card rounded-2xl overflow-hidden h-full transform transition-all duration-300 hover:scale-105">
                {/* Project image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <div className={`${getCategoryColor(project.category)} p-2 rounded-full bg-black/50 backdrop-blur-sm`}>
                      {getCategoryIcon(project.category)}
                    </div>
                    <span className="text-xs font-mono bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-cyber-silver">
                      {project.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="text-xs font-mono bg-cyber-cyan/20 backdrop-blur-sm px-3 py-1 rounded-full text-cyber-cyan border border-cyber-cyan/30">
                        FEATURED
                      </span>
                    </div>
                  )}
                </div>

                {/* Project content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-cyber-silver font-mono">
                    {project.title}
                  </h3>
                  
                  <p className="text-cyber-silver/70 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs font-mono bg-cyber-gray/50 text-cyber-cyan px-2 py-1 rounded-md border border-cyber-cyan/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-cyber-silver hover:text-cyber-cyan transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      <span className="text-sm font-mono">CODE</span>
                    </a>
                    
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-cyber-silver hover:text-cyber-green transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span className="text-sm font-mono">LIVE</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/10 via-transparent to-cyber-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute inset-0 border-2 border-cyber-cyan/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* 3D shadow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10 transform translate-y-4" />
            </motion.div>
          ))}
        </div>

        {/* View all projects button */}
        <motion.div 
          className="text-center mt-16"
          variants={itemVariants}
        >
          <button className="cyber-button rounded-lg px-8 py-4 text-lg">
            <span className="relative z-10">VIEW ALL PROJECTS</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}