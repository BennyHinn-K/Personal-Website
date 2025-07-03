"use client";
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import AIAssistant from '@/components/AIAssistant';
import CyberCursor from '@/components/CyberCursor';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollEffects from '@/components/ScrollEffects';

export default function Home() {
  console.log("BENNYHINN Portfolio Loading - Beast Mode Activated! 🚀");
  
  return (
    <main className="relative min-h-screen bg-cyber-dark overflow-x-hidden">
      {/* Global Effects */}
      <CyberCursor />
      <ParticleBackground />
      <ScrollEffects />
      
      {/* Matrix Background */}
      <div className="matrix-bg" />
      
      {/* Navigation */}
      <Header />
      
      {/* Main Content Sections */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen">
          <HeroSection />
        </section>
        
        {/* Projects Section */}
        <section id="projects" className="min-h-screen">
          <ProjectsSection />
        </section>
        
        {/* Skills Section */}
        <section id="skills" className="min-h-screen">
          <SkillsSection />
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="min-h-screen">
          <ContactSection />
        </section>
      </div>
      
      {/* AI Assistant */}
      <AIAssistant />
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-cyber-cyan/20 bg-cyber-dark/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-cyber-silver/60 font-mono text-sm">
                © 2025 BENNYHINN. Crafted with{' '}
                <span className="text-cyber-cyan">React</span> &{' '}
                <span className="text-cyber-purple">Next.js</span>
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com/BennyHinn-K"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-silver/60 hover:text-cyber-cyan transition-colors font-mono text-sm"
              >
                GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/bennyhinn-kariuki-58444a303/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-silver/60 hover:text-cyber-cyan transition-colors font-mono text-sm"
              >
                LINKEDIN
              </a>
              <a
                href="https://wa.me/254111291633"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-silver/60 hover:text-cyber-cyan transition-colors font-mono text-sm"
              >
                WHATSAPP
              </a>
            </div>
          </div>
          
          {/* Status indicator */}
          <div className="mt-6 flex justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
              <span className="text-cyber-silver/60 font-mono text-xs">
                SYSTEM ONLINE • READY FOR NEW PROJECTS
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
