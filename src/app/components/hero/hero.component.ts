import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** True on any touch / small-screen device */
const isMobile = (): boolean =>
  window.matchMedia('(pointer: coarse), (max-width: 768px)').matches ||
  navigator.maxTouchPoints > 0;

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {
  typedText = '';
  fullText =
    'Building high-performance React and Angular applications with modern UI/UX and scalable frontend architecture.';
  typingInterval: any;

  ngOnInit(): void {
    this.animateHero();
    this.startTypingAnimation();
  }

  ngAfterViewInit(): void {
    this.initParallax();
    if (!isMobile()) {
      // Neural-network canvas — desktop only (O(n²) is too heavy for mobile)
      this.initHeroParticleCanvas();
    }
    this.initHeroExit();
  }

  ngOnDestroy(): void {
    if (this.typingInterval) clearInterval(this.typingInterval);
  }

  // ── Entrance ─────────────────────────────────────────────────
  animateHero(): void {
    const mobile = isMobile();

    // On mobile: no blur filter (GPU cost), shorter delay
    const fromProps = mobile
      ? { opacity: 0, y: 30 }
      : { opacity: 0, y: 50, filter: 'blur(8px)' };

    const toBase = (extra: object) =>
      mobile
        ? { opacity: 1, y: 0, ...extra }
        : { opacity: 1, y: 0, filter: 'blur(0px)', ...extra };

    gsap.set(
      [
        '.hero-title',
        '.hero-subtitle',
        '.hero-location',
        '.hero-description',
        '.hero-cta',
      ],
      fromProps,
    );

    // Mobile: shorter delay (no preloader wait needed — preloader is instant)
    const delay = mobile ? 0.8 : 2.4;
    const tl = gsap.timeline({ delay });

    tl.to(
      '.hero-title',
      toBase({ duration: mobile ? 0.6 : 1, ease: 'power3.out' }),
    )
      .to(
        '.hero-subtitle',
        toBase({ duration: mobile ? 0.5 : 0.9, ease: 'power3.out' }),
        '-=0.35',
      )
      .to(
        '.hero-location',
        toBase({ duration: mobile ? 0.4 : 0.7, ease: 'power3.out' }),
        '-=0.3',
      )
      .to(
        '.hero-description',
        toBase({ duration: mobile ? 0.4 : 0.7, ease: 'power3.out' }),
        '-=0.25',
      )
      .to(
        '.hero-cta',
        toBase({ duration: mobile ? 0.4 : 0.8, ease: 'back.out(1.5)' }),
        '-=0.2',
      );

    // CTA button shimmer — desktop only
    if (!mobile) {
      tl.to('.btn-primary', {
        boxShadow: '0 0 40px rgba(102,126,234,0.6)',
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Blob pulse — lighter on mobile
    gsap.to('.blob', {
      scale: mobile ? 1.1 : 1.25,
      duration: mobile ? 3 : 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.7,
    });
  }

  // ── Parallax — disabled on mobile (scroll jank) ──────────────
  initParallax(): void {
    if (isMobile()) return; // skip entirely on touch devices

    document.querySelectorAll('.float-el').forEach((el: any) => {
      gsap.to(el, {
        y: (Math.random() > 0.5 ? -1 : 1) * (120 + Math.random() * 80),
        rotation: Math.random() * 60 - 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    });

    document.querySelectorAll('.blob').forEach((blob: any, i) => {
      gsap.to(blob, {
        y: -(180 + i * 60),
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

  // ── Exit animation — no blur on mobile ───────────────────────
  initHeroExit(): void {
    const mobile = isMobile();

    if (mobile) {
      // Simple opacity fade only — no scale/blur (GPU heavy)
      gsap.to('.hero-content', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'center top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    } else {
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
  }

  // ── Neural-network canvas — desktop only ─────────────────────
  initHeroParticleCanvas(): void {
    const hero = document.querySelector('.hero') as HTMLElement;
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText =
      'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    hero.prepend(canvas);

    const ctx = canvas.getContext('2d')!;
    const resize = () => {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = 50; // slightly reduced for performance
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 2,
    }));

    let mx = canvas.width / 2,
      my = canvas.height / 2;
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

        const dx = n.x - mx,
          dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          n.vx += (dx / dist) * 0.1;
          n.vy += (dy / dist) * 0.1;
        }
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 2) {
          n.vx = (n.vx / speed) * 2;
          n.vy = (n.vy / speed) * 2;
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(102,126,234,0.45)';
        ctx.fill();
      });

      // Connecting lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(102,126,234,${0.13 * (1 - d / 130)})`;
            ctx.lineWidth = 0.7;
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
    const speed = isMobile() ? 35 : 45; // slightly faster on mobile
    this.typingInterval = setInterval(() => {
      if (i < this.fullText.length) {
        this.typedText = this.fullText.substring(0, i + 1);
        i++;
      } else {
        clearInterval(this.typingInterval);
      }
    }, speed);
  }

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = '/assets/cv/Mahmoud_Nabil.pdf';
    link.download = 'Mahmoud_Nabil.pdf';
    link.click();
  }

  scrollToProjects(): void {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
