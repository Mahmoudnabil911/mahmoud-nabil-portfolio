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
    this.animateOnScroll();
  }

  animateOnScroll(): void {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 90%',
        once: true,
      },
    });

    tl.fromTo('.about-image', 
        { x: '-100vw', opacity: 0, rotation: -15 },
        { x: 0, opacity: 1, rotation: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo('.about-content', 
        { x: '100vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
        '<'
      )
      .fromTo('.stat-card', 
        { y: 100, scale: 0.8, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.5)' }, 
        '-=0.5'
      )
      .to({}, { duration: 0.5 });
  }
}
