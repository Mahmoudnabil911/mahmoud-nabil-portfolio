import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionAnimationsService } from '../../services/section-animations.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements AfterViewInit {
  projects = [
    {
      title: 'Babu POS / Dashboard',
      subtitle: 'Restaurant POS & Management System',
      description:
        'Developed a comprehensive restaurant POS and management system supporting Arabic and English localization with dynamic RTL/LTR layout switching. Integrated RESTful APIs across 11+ business modules and built reusable components for POS operations and Dashboard Analytics.',
      image: '/assets/unnamed-transparent.png',
      imageClass: 'babu-img',
      technologies: ['Angular', 'TypeScript', 'RESTful APIs', 'ngx-translate', 'RTL'],
      demoUrl: 'https://pos.babupos.com/#/dashboard',
      highlights: ['RTL/LTR Switching', '11+ Business Modules', 'Kitchen Station'],
    },
    {
      title: 'Cairah',
      subtitle: 'AI Healthcare Landing Page',
      description:
        'Engineered the official AI healthcare landing page using Angular, GSAP, and ScrollTrigger. Integrated backend APIs to dynamically retrieve personalized Q&A results based on user inputs and implemented Reactive Forms for Early Access.',
      image: '/cairah_logo.gif',
      imageClass: 'contain-img',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Reactive Forms', 'GSAP', 'ScrollTrigger'],
      demoUrl: 'https://cairah.ai/home',
      highlights: ['GSAP Animations', 'Dynamic Data', 'Reactive Forms'],
    },

    {
      title: 'Celebrity Dashboard',
      subtitle: 'Celebrity Management Dashboard',
      description:
        'A centralized dashboard for managing celebrities, their profiles, and beauty product collaborations, including campaigns, product promotions, and brand partnerships.',
      image: '/assets/logo-dark.svg',
      imageClass: 'contain-img',
      technologies: ['Angular', 'TypeScript', 'REST API', 'State Management'],
      demoUrl: 'https://celebrity-dashboard.eboutiques.com/celebrities/details',
      highlights: ['Profile Management', 'Campaign Tracking', 'Brand Partnerships'],
    },
    {
      title: 'Parq',
      subtitle: 'Parking Services Platform',
      description:
        'Smart parking solution with real-time availability, booking system, payment integration, and location-based services.',
      image: '/about-parq.jpg',
      technologies: ['Angular', 'Google Maps API', 'RxJS', 'Payment Gateway'],
      demoUrl: 'https://tryparq.co/',
      highlights: ['Real-time Tracking', 'Payment Integration', 'Maps Integration'],
    },
    {
      title: 'Antika World',
      subtitle: 'Luxury Urban Destination',
      description:
        'Developed the interactive frontend platform for a luxury urban destination in Sofia, showcasing dynamic business portfolios including co-working spaces, retail, and smart mobility solutions with a focus on immersive user experiences.',
      image: '/assets/white-logo.png',
      imageClass: 'contain-img',
      technologies: ['Angular', 'TypeScript', 'Bootstrap', 'State Management'],
      demoUrl: 'https://antika.world/',
      highlights: ['Cultural Experiences', 'Retail Directory', 'Event Calendar'],
    },
    {
      title: 'Deelz CRM',
      subtitle: 'Comprehensive Dashboard',
      description:
        'Built and refactored a comprehensive dashboard project using standalone Angular architecture and Tailwind CSS, resolving complex nested routing structures.',
      image: 'deelz',
      technologies: ['Angular', 'Tailwind CSS', 'TypeScript', 'Standalone Components'],
      demoUrl: 'https://deelzweb.dopave.com/',
      highlights: ['Nested Routing', 'Standalone Architecture', 'Dashboard UI'],
    },
    {
      title: 'LMS Platform',
      subtitle: 'Learning Management System',
      description:
        'Architected a dynamic learning system with progress tracking and modular content delivery.',
      image: 'lms',
      technologies: ['Angular', 'SCSS', 'RxJS', 'GSAP', 'REST API'],
      demoUrl: '#',
      highlights: ['Video Streaming', 'Progress Tracking', 'Interactive UI'],
      inProgress: true,
    },
    {
      title: 'Khardah',
      subtitle: 'Platform for Associations',
      description:
        'Community platform for managing associations, events, memberships, and communications with advanced admin dashboard.',
      image: 'khardah',
      technologies: ['Angular', 'TypeScript', 'Bootstrap', 'State Management'],
      demoUrl: '#',
      highlights: ['Admin Dashboard', 'Event Management', 'User Roles'],
      inProgress: true,
    },
  ];

  constructor(private sectionAnim: SectionAnimationsService) { }

  ngAfterViewInit(): void {
    // ── Section-level enter/exit ──────────────────────────────
    this.sectionAnim.initSectionAnimation({
      sectionSelector: '.projects-section',
      exitEnabled: true,
    });

    // ── Content animations ────────────────────────────────────
    this.animateProjects();
    this.init3DTilt();
  }

  init3DTilt(): void {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card: any) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
          rotateX,
          rotateY,
          transformPerspective: 1000,
          ease: 'power2.out',
          duration: 0.4,
        });

        const innerContent = card.querySelector('.project-content');
        const innerImage = card.querySelector('.project-image');
        if (innerContent) gsap.to(innerContent, { translateZ: 50, duration: 0.4 });
        if (innerImage) gsap.to(innerImage, { translateZ: 30, duration: 0.4 });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          ease: 'elastic.out(1, 0.3)',
          duration: 1.2,
        });
        const innerContent = card.querySelector('.project-content');
        const innerImage = card.querySelector('.project-image');
        if (innerContent) gsap.to(innerContent, { translateZ: 0, duration: 1.2, ease: 'elastic.out(1, 0.3)' });
        if (innerImage) gsap.to(innerImage, { translateZ: 0, duration: 1.2, ease: 'elastic.out(1, 0.3)' });
      });
    });
  }

  animateProjects(): void {
    // Set initial state
    gsap.set('.project-card', { scale: 0.75, opacity: 0, y: 60, rotationY: -15 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.projects-section',
        start: 'top 82%',
        once: true,
      },
    });

    // Cards unfold like a fan, then settle
    tl.to('.project-card', {
      scale: 1,
      opacity: 1,
      y: 0,
      rotationY: 0,
      duration: 0.9,
      stagger: {
        amount: 0.8,
        from: 'start',
      },
      ease: 'back.out(1.3)',
    });

    // Highlight badges pop in after cards
    ScrollTrigger.create({
      trigger: '.projects-grid',
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.from('.highlight-badge', {
          scale: 0,
          opacity: 0,
          duration: 0.35,
          stagger: 0.04,
          delay: 0.6,
          ease: 'back.out(2)',
        });
      },
    });
  }
}
