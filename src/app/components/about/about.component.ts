import { Component, OnInit, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit, AfterViewInit {
  stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '7+', label: 'Projects Completed' },
    { value: '5+', label: 'Technologies' },
    { value: '100%', label: 'Client Satisfaction' },
  ];

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // Temporarily disabled animation for debugging
    // this.animateOnScroll();
  }

  animateOnScroll(): void {
    // gsap.from('.about-image', {
    //   scrollTrigger: {
    //     trigger: '.about-section',
    //     start: 'top 80%',
    //     end: 'bottom 20%',
    //     toggleActions: 'play none none reverse',
    //   },
    //   opacity: 0,
    //   x: -50,
    //   duration: 1,
    //   ease: 'power3.out',
    // });
    // gsap.from('.about-content', {
    //   scrollTrigger: {
    //     trigger: '.about-section',
    //     start: 'top 80%',
    //     end: 'bottom 20%',
    //     toggleActions: 'play none none reverse',
    //   },
    //   opacity: 0,
    //   x: 50,
    //   duration: 1,
    //   ease: 'power3.out',
    // });
    // gsap.from('.stat-card', {
    //   scrollTrigger: {
    //     trigger: '.stats-grid',
    //     start: 'top 90%',
    //     end: 'bottom 20%',
    //     toggleActions: 'play none none reverse',
    //   },
    //   opacity: 0,
    //   y: 30,
    //   duration: 0.6,
    //   stagger: 0.1,
    //   ease: 'power3.out',
    // });
  }
}
