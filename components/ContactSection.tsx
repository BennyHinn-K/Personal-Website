"use client";
import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, MessageCircle, Mail, MapPin, Send, Github, Linkedin, Calendar } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    service: 'fullstack'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create WhatsApp message
    const whatsappMessage = `Hi BENNYHINN! 

My name is ${formData.name}
Email: ${formData.email}
Service needed: ${formData.service}

Message: ${formData.message}

Looking forward to working with you!`;

    const whatsappUrl = `https://wa.me/254111291633?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '', service: 'fullstack' });
  };

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

  const contactMethods = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'WhatsApp',
      description: 'Quick response guaranteed',
      value: '+254 111 291 633',
      action: () => window.open('https://wa.me/254111291633', '_blank'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: 'Call Direct',
      description: 'Available 9 AM - 6 PM EAT',
      value: '+254 111 291 633',
      action: () => window.open('tel:+254111291633', '_blank'),
      color: 'from-cyber-blue to-cyber-cyan'
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email',
      description: 'Professional inquiries',
      value: 'bennyhinn@dev.com',
      action: () => window.open('mailto:bennyhinn@dev.com', '_blank'),
      color: 'from-cyber-purple to-cyber-pink'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Location',
      description: 'Based in Nairobi, Kenya',
      value: 'Nairobi, Kenya',
      action: () => {},
      color: 'from-cyber-cyan to-cyber-blue'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-6 h-6" />,
      url: 'https://github.com/BennyHinn-K',
      color: 'hover:text-gray-400'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      url: 'https://www.linkedin.com/in/bennyhinn-kariuki-58444a303/',
      color: 'hover:text-blue-400'
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-6 h-6" />,
      url: 'https://wa.me/254111291633',
      color: 'hover:text-green-400'
    }
  ];

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark via-cyber-gray to-cyber-dark opacity-50" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-green to-transparent" />
      
      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Section header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="text-cyber-green font-mono text-lg tracking-wider mb-4 block">
            &lt; CONTACT /&gt;
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-gradient">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-cyber-silver/80 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your project and create 
            something <span className="text-cyber-green">extraordinary</span> together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-cyber-silver mb-8 font-mono">
              Get In Touch
            </h3>
            
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 rounded-xl cursor-pointer group hover:scale-105 transition-transform duration-300"
                  onClick={method.action}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${method.color} text-white`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-mono text-cyber-silver mb-1">
                        {method.title}
                      </h4>
                      <p className="text-cyber-silver/60 text-sm mb-1">
                        {method.description}
                      </p>
                      <p className="text-cyber-cyan font-mono text-sm">
                        {method.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-lg font-mono text-cyber-silver mb-4">
                Follow & Connect
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 glass-card rounded-lg text-cyber-silver ${social.color} transition-colors`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-cyber-silver mb-8 font-mono">
              Start Your Project
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-cyber-silver font-mono mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-cyber-gray/30 text-cyber-silver border border-cyber-gray/50 rounded-lg px-4 py-3 focus:outline-none focus:border-cyber-cyan transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-cyber-silver font-mono mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-cyber-gray/30 text-cyber-silver border border-cyber-gray/50 rounded-lg px-4 py-3 focus:outline-none focus:border-cyber-cyan transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-cyber-silver font-mono mb-2">
                  Service Needed
                </label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-cyber-gray/30 text-cyber-silver border border-cyber-gray/50 rounded-lg px-4 py-3 focus:outline-none focus:border-cyber-cyan transition-colors"
                >
                  <option value="fullstack">Full Stack Development</option>
                  <option value="android">Android Development</option>
                  <option value="web">Web Design</option>
                  <option value="design">Graphic Design</option>
                  <option value="ai">AI Integration</option>
                  <option value="consulting">Consulting</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-cyber-silver font-mono mb-2">
                  Project Details
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-cyber-gray/30 text-cyber-silver border border-cyber-gray/50 rounded-lg px-4 py-3 focus:outline-none focus:border-cyber-cyan transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full cyber-button rounded-lg py-4 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send via WhatsApp</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Additional CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.open('https://wa.me/254111291633?text=Hi! I need a quick consultation about my project.', '_blank')}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Quick Chat</span>
              </button>
              
              <button
                onClick={() => window.open('mailto:bennyhinn@dev.com?subject=Project Inquiry', '_blank')}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-cyber-purple hover:bg-cyber-pink text-white rounded-lg transition-colors"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule Meeting</span>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}