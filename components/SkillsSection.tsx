"use client";
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Smartphone, Palette, Brain, Database, Globe } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'mobile' | 'design' | 'ai';
  icon: React.ReactNode;
  color: string;
}

export default function SkillsSection() {
  const [skills] = useState<Skill[]>([
    // Frontend Skills
    { name: 'React/Next.js', level: 95, category: 'frontend', icon: <Globe className="w-6 h-6" />, color: 'cyber-blue' },
    { name: 'TypeScript', level: 90, category: 'frontend', icon: <Code className="w-6 h-6" />, color: 'cyber-blue' },
    { name: 'Tailwind CSS', level: 95, category: 'frontend', icon: <Palette className="w-6 h-6" />, color: 'cyber-blue' },
    
    // Backend Skills  
    { name: 'Node.js', level: 90, category: 'backend', icon: <Database className="w-6 h-6" />, color: 'cyber-green' },
    { name: 'Python', level: 85, category: 'backend', icon: <Code className="w-6 h-6" />, color: 'cyber-green' },
    { name: 'MongoDB', level: 88, category: 'backend', icon: <Database className="w-6 h-6" />, color: 'cyber-green' },
    
    // Mobile Skills
    { name: 'Android/Kotlin', level: 92, category: 'mobile', icon: <Smartphone className="w-6 h-6" />, color: 'cyber-cyan' },
    { name: 'Java', level: 88, category: 'mobile', icon: <Code className="w-6 h-6" />, color: 'cyber-cyan' },
    { name: 'React Native', level: 85, category: 'mobile', icon: <Smartphone className="w-6 h-6" />, color: 'cyber-cyan' },
    
    // Design Skills
    { name: 'UI/UX Design', level: 90, category: 'design', icon: <Palette className="w-6 h-6" />, color: 'cyber-pink' },
    { name: 'Figma', level: 95, category: 'design', icon: <Palette className="w-6 h-6" />, color: 'cyber-pink' },
    { name: 'Adobe Creative Suite', level: 88, category: 'design', icon: <Palette className="w-6 h-6" />, color: 'cyber-pink' },
    { name: 'Graphic Design', level: 92, category: 'design', icon: <Palette className="w-6 h-6" />, color: 'cyber-pink' },
    
    // AI Skills (refined)
    { name: 'AI Integration', level: 88, category: 'ai', icon: <Brain className="w-6 h-6" />, color: 'cyber-purple' },
    { name: 'OpenAI APIs', level: 90, category: 'ai', icon: <Brain className="w-6 h-6" />, color: 'cyber-purple' },
  ]);

  const [activeCategory, setActiveCategory] = useState<string>('all');
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5,
      },
    }),
  };

  const categories = [
    { id: 'all', name: 'ALL SKILLS', icon: <Code className="w-5 h-5" />, color: 'cyber-cyan' },
    { id: 'frontend', name: 'FRONTEND', icon: <Globe className="w-5 h-5" />, color: 'cyber-blue' },
    { id: 'backend', name: 'BACKEND', icon: <Database className="w-5 h-5" />, color: 'cyber-green' },
    { id: 'mobile', name: 'MOBILE', icon: <Smartphone className="w-5 h-5" />, color: 'cyber-cyan' },
    { id: 'design', name: 'DESIGN', icon: <Palette className="w-5 h-5" />, color: 'cyber-pink' },
    { id: 'ai', name: 'AI/ML', icon: <Brain className="w-5 h-5" />, color: 'cyber-purple' },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const getSkillColor = (color: string) => {
    switch (color) {
      case 'cyber-blue': return 'from-cyber-blue to-cyber-cyan';
      case 'cyber-green': return 'from-cyber-green to-cyber-cyan';
      case 'cyber-cyan': return 'from-cyber-cyan to-cyber-blue';
      case 'cyber-pink': return 'from-cyber-pink to-cyber-purple';
      case 'cyber-purple': return 'from-cyber-purple to-cyber-pink';
      default: return 'from-cyber-cyan to-cyber-purple';
    }
  };

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-10" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-purple to-transparent" />
      
      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Section header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="text-cyber-purple font-mono text-lg tracking-wider mb-4 block">
            &lt; SKILLS /&gt;
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-gradient">
            Technical Arsenal
          </h2>
          <p className="text-xl text-cyber-silver/80 max-w-2xl mx-auto">
            Mastering cutting-edge technologies across multiple domains with 
            <span className="text-cyber-cyan"> unmatched expertise</span>.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 text-cyber-cyan border-2 border-cyber-cyan/50'
                  : 'bg-cyber-gray/30 text-cyber-silver/70 border-2 border-cyber-gray/50 hover:border-cyber-cyan/30 hover:text-cyber-cyan'
              }`}
            >
              <span className={`${activeCategory === category.id ? 'text-cyber-cyan' : 'text-cyber-silver/70'}`}>
                {category.icon}
              </span>
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={`${skill.name}-${activeCategory}`}
              className="glass-card p-6 rounded-xl"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getSkillColor(skill.color)} text-black`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-mono text-cyber-silver">{skill.name}</h3>
                </div>
                <span className="text-cyber-cyan font-mono text-sm">{skill.level}%</span>
              </div>
              
              {/* Skill bar */}
              <div className="relative">
                <div className="w-full bg-cyber-gray/30 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full bg-gradient-to-r ${getSkillColor(skill.color)} relative overflow-hidden`}
                    variants={skillBarVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    custom={skill.level}
                  >
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-slide-in" />
                  </motion.div>
                </div>
                
                {/* Progress indicator */}
                <div className="absolute top-0 left-0 w-full h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 w-8 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    animate={{
                      x: [-32, 800],
                    }}
                    transition={{
                      duration: 2,
                      ease: "linear",
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          variants={itemVariants}
        >
          {[
            { label: 'Years Experience', value: '5+', color: 'cyber-cyan' },
            { label: 'Projects Completed', value: '50+', color: 'cyber-green' },
            { label: 'Technologies', value: '20+', color: 'cyber-purple' },
            { label: 'Client Satisfaction', value: '100%', color: 'cyber-pink' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl lg:text-4xl font-bold font-mono text-${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-cyber-silver/70 font-mono text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}