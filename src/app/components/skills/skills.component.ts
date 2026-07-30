import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  ngAfterViewInit(): void {
    // Temporarily disabled animation for debugging
    // this.animateSkills();
  }

  animateSkills(): void {
    // gsap.from('.skill-category', {
    //   scrollTrigger: {
    //     trigger: '.skills-section',
    //     start: 'top 80%',
    //     end: 'bottom 20%',
    //     toggleActions: 'play none none reverse',
    //   },
    //   opacity: 0,
    //   y: 50,
    //   duration: 0.6,
    //   stagger: 0.2,
    //   ease: 'power3.out',
    // });
    // // Animate progress bars
    // gsap.from('.skill-progress-fill', {
    //   scrollTrigger: {
    //     trigger: '.skills-grid',
    //     start: 'top 70%',
    //     end: 'bottom 20%',
    //     toggleActions: 'play none none reverse',
    //   },
    //   width: 0,
    //   duration: 1.5,
    //   stagger: 0.05,
    //   ease: 'power2.out',
    // });
  }
}
