import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {
  typedText = '';
  fullText =
    'Building high-performance Angular apps with modern UI/UX and advanced animations.';
  typingInterval: any;

  ngOnInit(): void {
    this.animateHero();
    this.startTypingAnimation();
  }

  ngAfterViewInit(): void {
    this.initParallax();
  }

  ngOnDestroy(): void {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
  }

  initParallax(): void {
    const floatEls = document.querySelectorAll('.float-el');
    floatEls.forEach((el: any, index) => {
      gsap.to(el, {
        y: (Math.random() > 0.5 ? -1 : 1) * (100 + Math.random() * 100),
        rotation: Math.random() * 90 - 45,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    const blobs = document.querySelectorAll('.blob');
    blobs.forEach((blob: any, index) => {
      gsap.to(blob, {
        y: -(150 + index * 50),
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }

  animateHero(): void {
    gsap.from('.hero-title', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
    });

    gsap.from('.hero-location', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out',
    });

    gsap.from('.hero-cta', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 1.5,
      ease: 'power3.out',
    });

    // Animate background blobs heartbeat
    gsap.to('.blob', {
      scale: 1.2,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5,
    });
  }

  startTypingAnimation(): void {
    let index = 0;
    this.typingInterval = setInterval(() => {
      if (index < this.fullText.length) {
        this.typedText = this.fullText.substring(0, index + 1);
        index++;
      } else {
        clearInterval(this.typingInterval);
      }
    }, 50);
  }

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'assets/cv/MahmoudNabil.pdf';
    link.download = 'MahmoudNabil.pdf';
    link.click();
  }

  scrollToProjects(): void {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
