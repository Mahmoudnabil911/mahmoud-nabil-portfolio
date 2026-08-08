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
  fullText = 'Building high-performance Angular apps with modern UI/UX and advanced animations.';
  typingInterval: any;

  ngOnInit(): void {
    this.animateHero();
    this.startTypingAnimation();
  }

  ngAfterViewInit(): void {
    this.initParallax();
    this.initHeroParticleCanvas();
    this.initHeroExit();
  }

  ngOnDestroy(): void {
    if (this.typingInterval) clearInterval(this.typingInterval);
  }

  // ── Cinematic staggered entrance ────────────────────────────
  animateHero(): void {
    // Set all hidden first
    gsap.set(['.hero-title', '.hero-subtitle', '.hero-location', '.hero-description', '.hero-cta'], {
      opacity: 0,
      y: 50,
      filter: 'blur(8px)',
    });

    const tl = gsap.timeline({ delay: 2.4 }); // wait for preloader

    tl.to('.hero-title', {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 1, ease: 'power4.out',
      })
      .to('.hero-subtitle', {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.9, ease: 'power3.out',
      }, '-=0.5')
      .to('.hero-location', {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.7, ease: 'power3.out',
      }, '-=0.4')
      .to('.hero-description', {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.7, ease: 'power3.out',
      }, '-=0.3')
      .to('.hero-cta', {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.8, ease: 'back.out(1.5)',
      }, '-=0.2');

    // CTA buttons subtle shimmer loop after entrance
    tl.to('.btn-primary', {
      boxShadow: '0 0 40px rgba(102,126,234,0.6)',
      duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });

    // Blobs animate
    gsap.to('.blob', {
      scale: 1.25,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.7,
    });
  }

  // ── Floating elements parallax ───────────────────────────────
  initParallax(): void {
    document.querySelectorAll('.float-el').forEach((el: any) => {
      gsap.to(el, {
        y: (Math.random() > 0.5 ? -1 : 1) * (120 + Math.random() * 80),
        rotation: Math.random() * 60 - 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5,
        },
      });
    });

    document.querySelectorAll('.blob').forEach((blob: any, i) => {
      gsap.to(blob, {
        y: -(180 + i * 60),
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true,
        },
      });
    });
  }

  // ── Cinematic hero exit ──────────────────────────────────────
  initHeroExit(): void {
    gsap.to('.hero-content', {
      opacity: 0,
      y: -80,
      scale: 0.9,
      filter: 'blur(10px)',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'center top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    gsap.to('.hero-background', {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'bottom 70%',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  // ── Interactive particle canvas inside hero ──────────────────
  initHeroParticleCanvas(): void {
    const hero = document.querySelector('.hero') as HTMLElement;
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText =
      'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    hero.prepend(canvas);

    const ctx = canvas.getContext('2d')!;
    const resize = () => { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    // Nodes
    const count = 60;
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 1 + Math.random() * 2,
    }));

    let mx = canvas.width / 2, my = canvas.height / 2;
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    });

    const draw = () => {
      requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        // Mouse repulsion
        const dx = n.x - mx, dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          n.vx += (dx / dist) * 0.12;
          n.vy += (dy / dist) * 0.12;
        }
        // Clamp speed
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 2) { n.vx = (n.vx / speed) * 2; n.vy = (n.vy / speed) * 2; }

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(102,126,234,0.5)';
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(102,126,234,${0.15 * (1 - d / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };
    draw();
  }

  // ── Typing ───────────────────────────────────────────────────
  startTypingAnimation(): void {
    let i = 0;
    this.typingInterval = setInterval(() => {
      if (i < this.fullText.length) {
        this.typedText = this.fullText.substring(0, i + 1);
        i++;
      } else {
        clearInterval(this.typingInterval);
      }
    }, 45);
  }

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'assets/cv/MahmoudNabil.pdf';
    link.download = 'MahmoudNabil.pdf';
    link.click();
  }

  scrollToProjects(): void {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
