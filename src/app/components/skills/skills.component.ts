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
    this.animateSkills();
  }

  animateSkills(): void {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top 90%',
        once: true,
      },
    });

    tl.fromTo('.skill-category',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    )
      .fromTo('.skill-progress-fill',
        { width: 0 },
        { width: (i, target) => target.getAttribute('data-level') + '%', duration: 1, stagger: 0.05, ease: 'power2.out' },
        '-=0.5'
      )
      .to({}, { duration: 0.5 });
  }
}
