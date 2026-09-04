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
      title: 'Frontend Technologies',
      icon: 'frontend',
      skills: [
        { name: 'React 19' },
        { name: 'React Router' },
        { name: 'Angular (12-21)' },
        { name: 'TypeScript' },
        { name: 'JavaScript' },
        { name: 'HTML5' },
        { name: 'CSS3' },
        { name: 'SCSS' },
        { name: 'Tailwind CSS' },
        { name: 'Bootstrap' },
        { name: 'Angular Material' },
        { name: 'PrimeNG' },
      ],
    },
    {
      title: 'State, Data & Architecture',
      icon: 'data',
      skills: [
        { name: 'RxJS' },
        { name: 'NgRx' },
        { name: 'Reactive Forms' },
        { name: 'Zustand' },
        { name: 'TanStack Query' },
        { name: 'TanStack Router' },
        { name: 'RESTful APIs' },
        { name: 'i18n' },
        { name: 'RTL/LTR' },
        { name: 'Standalone Components' },
        { name: 'Nx Monorepo' },
      ],
    },
    {
      title: 'Performance & Quality',
      icon: 'animations',
      skills: [
        { name: 'GSAP' },
        { name: 'ScrollTrigger' },
        { name: 'Code Splitting' },
        { name: 'Lighthouse Optimization' },
        { name: 'Unit Testing' },
        { name: 'Responsive Web Design' },
        { name: 'Figma' },
      ],
    },
    {
      title: 'Tools & Workflow',
      icon: 'tools',
      skills: [
        { name: 'Git' },
        { name: 'GitHub' },
        { name: 'Nx Monorepo' },
        { name: 'Postman' },
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
    gsap.set('.skill-category', {
      y: 80,
      opacity: 0,
      scale: 0.88,
      rotateY: -12,
    });
    gsap.set('.category-icon', { rotation: -180, scale: 0, opacity: 0 });
    gsap.set('.skill-item', { scale: 0, opacity: 0 });

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
        '<0.2',
      )
      // Skill tags pop in
      .to(
        '.skill-item',
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: 'back.out(2)',
        },
        '-=0.3',
      );

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
