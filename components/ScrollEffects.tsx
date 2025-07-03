"use client";
import { useEffect } from 'react';

export default function ScrollEffects() {
  useEffect(() => {
    // Smooth scroll implementation using Lenis-like behavior
    let isScrolling = false;
    let targetY = 0;
    let currentY = 0;

    const smoothScroll = () => {
      if (!isScrolling) return;
      
      currentY += (targetY - currentY) * 0.1;
      
      if (Math.abs(targetY - currentY) < 0.1) {
        currentY = targetY;
        isScrolling = false;
      }
      
      window.scrollTo(0, currentY);
      
      if (isScrolling) {
        requestAnimationFrame(smoothScroll);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const delta = e.deltaY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      targetY = Math.max(0, Math.min(scrollHeight, targetY + delta));
      
      if (!isScrolling) {
        isScrolling = true;
        smoothScroll();
      }
    };

    // Parallax effect for background elements
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      // Apply parallax to background elements
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach((element) => {
        (element as HTMLElement).style.transform = `translateY(${rate}px)`;
      });

      // Add mouse position influence
      const mouseX = (window.innerWidth / 2) / window.innerWidth;
      const mouseY = (window.innerHeight / 2) / window.innerHeight;
      
      // Apply subtle mouse parallax
      const mouseParallaxElements = document.querySelectorAll('.mouse-parallax');
      mouseParallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-speed') || '1';
        const x = (mouseX * 50) * parseFloat(speed);
        const y = (mouseY * 50) * parseFloat(speed);
        (element as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    // Mouse move effect for 3D transforms
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;

      // Apply 3D transforms to cards and interactive elements
      const tiltElements = document.querySelectorAll('.tilt-effect');
      tiltElements.forEach((element) => {
        const strength = element.getAttribute('data-strength') || '1';
        const rotateX = mouseY * 10 * parseFloat(strength);
        const rotateY = mouseX * 10 * parseFloat(strength);
        
        (element as HTMLElement).style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg)
          translateZ(0)
        `;
      });

      // Floating elements follow mouse
      const floatingElements = document.querySelectorAll('.mouse-follow');
      floatingElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.02);
        const x = mouseX * 20 * speed;
        const y = mouseY * 20 * speed;
        
        (element as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el) => observer.observe(el));

    // Magnetic effect for buttons and interactive elements
    const handleButtonMouseMove = (e: MouseEvent) => {
      const buttons = document.querySelectorAll('.magnetic-btn');
      buttons.forEach((button) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) * 0.3;
        const deltaY = (y - centerY) * 0.3;
        
        (button as HTMLElement).style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });
    };

    const handleButtonMouseLeave = () => {
      const buttons = document.querySelectorAll('.magnetic-btn');
      buttons.forEach((button) => {
        (button as HTMLElement).style.transform = 'translate(0px, 0px)';
      });
    };

    // Event listeners
    // Note: Temporarily disabling smooth scroll for better compatibility
    // window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousemove', handleButtonMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleButtonMouseLeave, { passive: true });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      
      .tilt-effect {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .mouse-parallax {
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .mouse-follow {
        transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .magnetic-btn {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      @media (prefers-reduced-motion: reduce) {
        .animate-on-scroll,
        .tilt-effect,
        .mouse-parallax,
        .mouse-follow,
        .magnetic-btn {
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      // window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleButtonMouseMove);
      document.removeEventListener('mouseleave', handleButtonMouseLeave);
      observer.disconnect();
      document.head.removeChild(style);
    };
  }, []);

  return null; // This component only handles effects, no render
}