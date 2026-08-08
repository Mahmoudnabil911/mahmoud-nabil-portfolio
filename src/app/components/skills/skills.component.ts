import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionAnimationsService } from '../../services/section-animations.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements AfterViewInit {
  skillCategories = [
    {
      title: 'Frontend & Frameworks',
      icon: 'frontend',
      skills: [
        { name: 'Angular', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'HTML5/CSS3', level: 95 },
        { name: 'SCSS/SASS', level: 90 },
        { name: 'Bootstrap', level: 85 },
      ],
    },
    {
      title: 'State & Data',
      icon: 'data',
      skills: [
        { name: 'RxJS', level: 85 },
        { name: 'RESTful APIs', level: 90 },
        { name: 'State Management', level: 80 },
        { name: 'Services', level: 90 },
        { name: 'HTTP Client', level: 85 },
      ],
    },
    {
      title: 'Performance & Animations',
      icon: 'animations',
      skills: [
        { name: 'GSAP', level: 85 },
        { name: 'ScrollTrigger', level: 80 },
        { name: 'CSS Animations', level: 90 },
        { name: 'Performance Optimization', level: 85 },
        { name: 'Lazy Loading', level: 80 },
      ],
    },
    {
      title: 'Tools & Others',
      icon: 'tools',
      skills: [
        { name: 'Nx Workspace', level: 75 },
        { name: 'Git & GitHub', level: 85 },
        { name: 'Agile/Scrum', level: 80 },
        { name: 'Responsive Design', level: 95 },
        { name: 'UI/UX Design', level: 85 },
      ],
    },
  ];

  constructor(private sectionAnim: SectionAnimationsService) {}

  ngAfterViewInit(): void {
    this.sectionAnim.initSectionAnimation({
      sectionSelector: '.skills-section',
      exitEnabled: true,
    });
    this.animateSkills();
  }

  animateSkills(): void {
    // Set initial hidden state
    gsap.set('.skill-category', { y: 80, opacity: 0, scale: 0.88, rotateY: -12 });
    gsap.set('.skill-progress-fill', { width: 0 });
    gsap.set('.category-icon', { rotation: -180, scale: 0, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top 78%',
        once: true,
      },
    });

    // Cards cascade in with 3D flip
    tl.to('.skill-category', {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'back.out(1.5)',
      })
      // Icons spin in
      .to(
        '.category-icon',
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(2.5)',
        },
        '<0.2'
      )
      // Progress bars fill with wave
      .to(
        '.skill-progress-fill',
        {
          width: (i: number, target: HTMLElement) =>
            target.getAttribute('data-level') + '%',
          duration: 1.4,
          stagger: 0.04,
          ease: 'power3.out',
        },
        '-=0.3'
      );

    // Percentage colour flash after fill
    ScrollTrigger.create({
      trigger: '.skills-grid',
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to('.skill-percentage', {
          color: '#667eea',
          duration: 0.25,
          stagger: 0.04,
          delay: 0.8,
          yoyo: true,
          repeat: 1,
        });
      },
    });

    // Hover: card glow lift
    document.querySelectorAll('.skill-category').forEach((card: any) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -8,
          boxShadow: '0 25px 60px rgba(102,126,234,0.25)',
          duration: 0.35,
          ease: 'power2.out',
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: 'none',
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
        });
      });
    });
  }
}
