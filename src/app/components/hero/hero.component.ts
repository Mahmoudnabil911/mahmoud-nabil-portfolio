import { Component, OnInit, OnDestroy } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  typedText = '';
  fullText =
    'Building high-performance Angular apps with modern UI/UX and advanced animations.';
  typingInterval: any;

  ngOnInit(): void {
    this.animateHero();
    this.startTypingAnimation();
  }

  ngOnDestroy(): void {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
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

    // Animate background blobs
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
