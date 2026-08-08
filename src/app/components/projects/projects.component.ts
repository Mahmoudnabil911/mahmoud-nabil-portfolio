import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      title: 'Cairah',
      subtitle: 'AI Healthcare Platform',
      description:
        'Comprehensive healthcare platform with AI-powered diagnostics, patient management, and telemedicine features. Built with Angular for seamless user experience.',
      image: '/cairah_logo.gif',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'Bootstrap', 'REST API'],
      demoUrl: 'https://cairah.ai/home',
      // githubUrl: '#',
      highlights: ['AI Integration', 'Real-time Updates', 'Responsive Design'],
    },
    {
      title: 'Babu POS / Dashboard',
      subtitle: 'Analytics & Inventory System',
      description:
        'Built a responsive analytics dashboard focused on complex data visualization. Maintained and engineered core frontend modules including invoice templates and dynamic product variation rows.',
      image: '/assets/unnamed-transparent.png',
      imageClass: 'babu-img',
      technologies: ['Angular', 'TypeScript', 'Tailwind', 'State Management'],
      demoUrl: 'https://pos.babupos.com/#/dashboard',
      // githubUrl: '#',
      highlights: ['Real-time Analytics', 'Inventory Management', 'POS Dashboard'],
      // inProgress: true,
    },
    {
      title: 'Parq',
      subtitle: 'Parking Services Platform',
      description:
        'Smart parking solution with real-time availability, booking system, payment integration, and location-based services.',
      image: '/about-parq.jpg',
      technologies: ['Angular', 'Google Maps API', 'RxJS', 'Payment Gateway'],
      demoUrl: 'https://tryparq.co/',
      // githubUrl: '#',
      highlights: [
        'Real-time Tracking',
        'Payment Integration',
        'Maps Integration',
      ],
    },
    {
      title: 'Antika World',
      subtitle: 'Luxury Urban Destination',
      description:
        'Developed the interactive frontend platform for a luxury urban destination in Sofia, showcasing dynamic business portfolios including co-working spaces, retail, and smart mobility solutions with a focus on immersive user experiences.',
      image: '/assets/white-logo.png',
      technologies: ['Angular', 'TypeScript', 'Bootstrap', 'State Management'],
      demoUrl: 'https://antika.world/',
      // githubUrl: '#',
      highlights: ['Cultural Experiences', 'Retail Directory', 'Event Calendar'],
      // inProgress: true,
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
      // githubUrl: '#',
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
      // githubUrl: '#',
      highlights: ['Admin Dashboard', 'Event Management', 'User Roles'],
      inProgress: true,
    },
  ];

  ngAfterViewInit(): void {
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

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          ease: 'power2.out',
          duration: 0.4
        });

        // Pop out the inner content
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
          duration: 1.2
        });

        const innerContent = card.querySelector('.project-content');
        const innerImage = card.querySelector('.project-image');
        if (innerContent) gsap.to(innerContent, { translateZ: 0, duration: 1.2, ease: 'elastic.out(1, 0.3)' });
        if (innerImage) gsap.to(innerImage, { translateZ: 0, duration: 1.2, ease: 'elastic.out(1, 0.3)' });
      });
    });
  }

  animateProjects(): void {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.projects-section',
        start: 'top 90%',
        once: true,
      },
    });

    tl.fromTo('.project-card',
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'back.out(1.2)' }
    )
      .to({}, { duration: 0.8 });
  }
}
