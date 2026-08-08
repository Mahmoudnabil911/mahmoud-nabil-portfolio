import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        'Architected 4+ complex healthcare dashboards leveraging Angular 16 within an Nx Monorepo.',
        'Optimized application state and RxJS data streams, boosting performance by 35% and cutting API load times by 30%.',
        'Engineered secure authentication flows, implementing custom routing logic that strictly prevents backward browser navigation to login/registration screens post-authentication.',
        'Developed intuitive UI navigation systems, including a dynamic primary application sidebar configured to collapse automatically upon sub-menu route selection.',
        'Engineered a library of 15+ scalable Angular components, reducing code duplication by 40% across the team.',
      ],
      technologies: [
        'Angular 16',
        'Nx Monorepo',
        'RxJS',
        'TypeScript',
        'SCSS',
      ],
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
        'Implemented advanced UI/UX features with GSAP and SCSS, ensuring Responsive Design across all viewports.',
        'Developed complex layout components, including a custom Swiper display that maintains center-card expansion by default.',
        'Enhanced Angular routing and SEO metrics, elevating platform user engagement by 30%.',
      ],
      technologies: [
        'Angular',
        'TypeScript',
        'SCSS',
        'GSAP',
        'SEO',
      ],
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
        'Built and maintained reactive user interfaces utilizing Angular, TypeScript, and responsive layouts.',
        'Engineered reusable Angular components, accelerating development workflows and improving page load times.',
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
        'Delivered 6+ SPA projects across healthcare, education, and logistics utilizing Angular and Bootstrap.',
        'Implemented SEO-optimized architectures, driving a 25% organic traffic increase.',
      ],
      technologies: ['Angular', 'Bootstrap', 'SEO', 'SPA'],
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
        'Contributed to frontend codebase updates utilizing Angular, HTML, and CSS.',
        'Developed interactive features and executed complex responsive layout adjustments.',
      ],
      technologies: ['Angular', 'HTML5', 'CSS3'],
    },
  ];

  ngAfterViewInit(): void {
    this.animateTimeline();
  }

  animateTimeline(): void {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.experience-section',
        start: 'top 90%',
        once: true,
      },
    });

    tl.fromTo('.timeline-marker',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(2)' }
    )
      .fromTo('.timeline-content',
        { y: 100, opacity: 0, rotationX: -30, transformOrigin: 'top center' },
        { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.2, ease: 'power3.out' },
        '<0.2'
      )
      .to({}, { duration: 0.5 });
  }
}
