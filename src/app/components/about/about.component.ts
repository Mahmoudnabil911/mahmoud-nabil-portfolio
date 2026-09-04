import { Component, OnInit, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionAnimationsService } from '../../services/section-animations.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit, AfterViewInit {
  stats = [
    { value: '3+', label: 'Years Experience', numericEnd: 3, suffix: '+' },
    { value: '10+', label: 'Projects', numericEnd: 10, suffix: '+' },
    { value: '2', label: 'Frontend Frameworks', numericEnd: 2, suffix: '' },
    { value: '11+', label: 'Business Modules', numericEnd: 11, suffix: '+' },
  ];

  constructor(private sectionAnim: SectionAnimationsService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sectionAnim.initSectionAnimation({
      sectionSelector: '.about-section',
      exitEnabled: true,
    });
    this.animateOnScroll();
  }

  animateOnScroll(): void {
    // Set initial states
    gsap.set('.about-image', { x: '-15vw', opacity: 0, rotate: -8 });
    gsap.set('.about-content', { x: '15vw', opacity: 0 });
    gsap.set('.spec-item', { y: 40, opacity: 0, scale: 0.85 });
    gsap.set('.stat-card', { y: 60, scale: 0.7, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        once: true,
      },
    });

    tl.to('.about-image', {
      x: 0,
      opacity: 1,
      rotate: 0,
      duration: 1.2,
      ease: 'power4.out',
    })
      .to(
        '.about-content',
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
        },
        '<0.1',
      )
      .to(
        '.spec-item',
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(2)',
        },
        '-=0.6',
      )
      .to(
        '.stat-card',
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'back.out(2)',
        },
        '-=0.3',
      );

    // ── Counter animation — numbers count up ────────────────
    ScrollTrigger.create({
      trigger: '.stats-grid',
      start: 'top 82%',
      once: true,
      onEnter: () => {
        document.querySelectorAll('.stat-value').forEach((el, i) => {
          const stat = this.stats[i];
          if (!stat) return;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.numericEnd,
            duration: 1.8,
            delay: i * 0.15,
            ease: 'power2.out',
            roundProps: 'val',
            onUpdate: () => {
              el.textContent = obj.val + stat.suffix;
            },
          });
          // Glow pulse at end
          gsap.to(el, {
            textShadow: '0 0 40px rgba(102,126,234,1)',
            duration: 0.4,
            delay: i * 0.15 + 1.8,
            yoyo: true,
            repeat: 1,
          });
        });
      },
    });
  }
}
