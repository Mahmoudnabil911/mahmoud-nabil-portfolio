import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionAnimationsService } from '../../services/section-animations.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-experience',
  standalone: false,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent implements AfterViewInit {
  experiences = [
    {
      company: 'Dopave',
      position: 'Angular Developer',
      type: 'Hybrid',
      period: 'Mar 2024 - Present',
      duration: '1 yr 9 mos',
      location: 'Cairo, Egypt',
      description: '',
      achievements: [
        'Architected multiple complex healthcare dashboards using Angular 16 and implemented responsive interfaces based on Figma designs within an Nx Monorepo.',
        'Integrated RESTful APIs using Angular HttpClient, managing asynchronous data flows with RxJS and optimizing API interactions across key dashboards.',
        'Built and validated complex forms using Angular Reactive Forms, implementing dynamic fields and client-side validation for business workflows.',
        'Developed secure authentication and application navigation flows using Angular routing, including custom logic to prevent backward navigation to login and registration screens after authentication.',
        'Built a library of 15+ reusable Angular components using Angular Material and PrimeNG, reducing code duplication and accelerating feature delivery across the team.',
        'Used Postman to test and validate REST API endpoints during frontend development and integration.',
      ],
      technologies: ['Angular 16', 'Nx Monorepo', 'RxJS', 'TypeScript', 'SCSS'],
    },
    {
      company: 'Cairah',
      position: 'Angular Developer',
      type: 'Part-time',
      period: 'Jun 2025 - Nov 2025',
      duration: '6 mos',
      location: 'Remote',
      description: '',
      achievements: [
        'Drove frontend development for AI-powered web interfaces using Angular, TypeScript, and SCSS.',
        'Implemented advanced UI/UX features with GSAP and SCSS, ensuring responsive design across all viewports.',
        'Developed complex layout components, including a custom Swiper display that maintains center-card expansion by default.',
        'Integrated RESTful APIs to dynamically retrieve and display backend-driven content, including personalized Q&A results based on user inputs.',
        'Implemented Reactive Forms with validation and API integration for Early Access Request and Feedback forms.',
        "Enhanced Angular routing and on-page SEO structure for the platform's public-facing pages.",
      ],
      technologies: ['Angular', 'TypeScript', 'SCSS', 'GSAP', 'SEO'],
    },
    {
      company: 'Sahm',
      position: 'Frontend Developer',
      type: 'On-site',
      period: 'Feb 2023 - Sep 2023',
      duration: '8 mos',
      location: 'Cairo, Egypt',
      description: '',
      achievements: [
        'Built and maintained reactive user interfaces using Angular, TypeScript, and semantic SCSS, delivering pixel-perfect responsive layouts based on Figma designs.',
        'Developed and optimized a complex POS (Point of Sale) system, implementing caching strategies and local state management for offline capability and seamless transactions.',
        'Engineered reusable Angular directives and components, accelerating frontend development velocity and improving page load times.',
        'Collaborated closely with UI/UX teams to implement strict design systems, ensuring visual consistency, cross-browser compatibility, and accessibility standards (WCAG).',
        'Managed complex dynamic forms using Angular Reactive Forms with custom async validators for real-time data validation and instant price/tax calculations within the POS.',
      ],
      technologies: ['Angular', 'TypeScript', 'Responsive Design'],
    },
    {
      company: 'Independent Contractor',
      position: 'Freelance Frontend Developer',
      type: 'Freelance',
      period: 'Jan 2023 - Feb 2024',
      duration: '1 yr 2 mos',
      location: 'Remote',
      description: '',
      achievements: [
        'Delivered 6+ SPA projects using Angular and React, building responsive interfaces, reusable components, and scalable frontend architectures.',
      ],
      technologies: ['Angular', 'React', 'Bootstrap', 'SPA'],
    },
    {
      company: 'Health Pay',
      position: 'Frontend Web Developer Intern',
      type: 'Internship',
      period: 'Feb 2022 - Oct 2022',
      duration: '9 mos',
      location: 'Cairo, Egypt',
      description: '',
      achievements: [
        'Contributed to frontend codebase updates using Angular, HTML, and CSS.',
        'Developed interactive features and executed complex responsive layout adjustments.',
      ],
      technologies: ['Angular', 'HTML5', 'CSS3'],
    },
  ];

  constructor(private sectionAnim: SectionAnimationsService) {}

  ngAfterViewInit(): void {
    // ── Section-level enter/exit ──────────────────────────────
    this.sectionAnim.initSectionAnimation({
      sectionSelector: '.experience-section',
      exitEnabled: true,
    });

    // ── Content animations ────────────────────────────────────
    this.animateTimeline();
  }

  animateTimeline(): void {
    // ── Initial states ──
    gsap.set('.timeline-marker', { scale: 0, opacity: 0 });
    gsap.set('.timeline-content', {
      y: 80,
      opacity: 0,
      rotationX: -20,
      transformOrigin: 'top center',
    });
    // Explicitly set initial state for tech tags to avoid gsap.from glitches
    gsap.set('.tech-tag', { opacity: 0, scale: 0.5 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.experience-section',
        start: 'top 85%',
        once: true,
        invalidateOnRefresh: true, // Recalculates if DOM shifts
        onEnter: () => {
          // Safety fallback: ensure they become visible eventually
          setTimeout(() => {
            gsap.to('.timeline-content, .tech-tag, .timeline-marker', {
              opacity: 1,
            });
          }, 3000);
        },
      },
    });

    tl.to('.timeline-marker', {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.18,
      ease: 'back.out(3)',
    })
      .to(
        '.timeline-content',
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: 'power3.out',
        },
        '<0.1',
      )
      .to(
        '.tech-tag',
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: 'back.out(2)',
        },
        '-=0.4', // overlap with the end of the content animation
      );
  }
}
