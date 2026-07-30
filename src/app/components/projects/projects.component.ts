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
      subtitle: 'Curating the past, Designing the future',
      description:
        'Antika World is transforming Sofia\'s iconic TSUM into a vibrant destination of retail, dining, culture, and immersive experiences. Heritage and innovation redefine the city, creating opportunities for communities, businesses, and international connections.',
      image: '/assets/white-logo.png',
      technologies: ['Angular', 'TypeScript', 'Bootstrap', 'State Management'],
      demoUrl: 'https://antika.world/',
      // githubUrl: '#',
      highlights: ['Cultural Experiences', 'Retail Directory', 'Event Calendar'],
      // inProgress: true,
    },
    {
      title: 'BABU',
      subtitle: 'Point of Sale (POS) System Dashboard',
      description:
        'A comprehensive Point of Sale (POS) and inventory management dashboard designed to streamline business operations. It features an intuitive interface for processing transactions, managing product stock, and monitoring real-time sales analytics to enhance operational.',
      image: '/assets/unnamed-transparent.png',
      imageClass: 'babu-img',
      technologies: ['Angular', 'TypeScript', 'Tailwind', 'State Management'],
      demoUrl: 'https://pos.babupos.com/#/dashboard',
      // githubUrl: '#',
      highlights: ['Real-time Analytics', 'Inventory Management', 'POS Dashboard'],
      // inProgress: true,
    },
    {
      title: 'LMS',
      subtitle: 'Learning Management System',
      description:
        'Feature-rich learning platform with course management, interactive quizzes, progress tracking, and video streaming capabilities.',
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
    // Temporarily disabled animation for debugging
    // this.animateProjects();
  }

  animateProjects(): void {
    // gsap.from('.project-card', {
    //   scrollTrigger: {
    //     trigger: '.projects-section',
    //     start: 'top 80%',
    //     end: 'bottom 20%',
    //     toggleActions: 'play none none none',
    //   },
    //   opacity: 0,
    //   y: 50,
    //   duration: 0.6,
    //   stagger: 0.2,
    //   ease: 'power3.out',
    // });
  }
}
