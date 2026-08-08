import { Component, AfterViewInit, HostListener, NgZone } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'portfolio';

  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.runPreloader();
      this.initParticleTrail();
      this.initCustomCursor();
      this.initMagneticButtons();
    });
  }

  // ══════════════════════════════════════════════════════════════
  // PRELOADER  — code lines type in, bar fills, then EXPLODE out
  // ══════════════════════════════════════════════════════════════
  runPreloader(): void {
    const preloader = document.getElementById('preloader');
    const bar = document.getElementById('preloader-bar');
    const pct = document.getElementById('preloader-pct');
    const l1 = document.getElementById('pl-l1');
    const l2 = document.getElementById('pl-l2');
    const l3 = document.getElementById('pl-l3');

    if (!preloader || !bar || !pct) return;

    // Prevent scroll during preloader
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        this.dismissPreloader(preloader);
      },
    });

    // Lines appear one by one
    tl.to(l1, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, 0.3)
      .to(l2, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, 0.7)
      .to(l3, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, 1.1);

    // Progress bar + percentage
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 8 + 2;
      if (progress >= 100) { progress = 100; clearInterval(interval); }
      if (bar) bar.style.width = progress + '%';
      if (pct) pct.textContent = Math.round(progress) + '%';
    }, 60);

    // Hold, then exit
    tl.to({}, { duration: 0.8 }, 1.5);
  }

  private dismissPreloader(preloader: HTMLElement): void {
    const tl = gsap.timeline({
      onComplete: () => {
        preloader.style.display = 'none';
        document.body.style.overflow = '';
        ScrollTrigger.refresh();
      },
    });

    // Scale and shatter out
    tl.to(preloader, {
      clipPath: 'inset(50% 50% 50% 50% round 50%)',
      duration: 0.7,
      ease: 'power4.in',
    }).to(preloader, { opacity: 0, duration: 0.2 }, '-=0.1');
  }

  // ══════════════════════════════════════════════════════════════
  // CUSTOM CURSOR  — dot + ring + color-morph on hover
  // ══════════════════════════════════════════════════════════════
  initCustomCursor(): void {
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('custom-cursor-follower');
    if (!cursor || !follower) return;

    const cursorX = gsap.quickTo(cursor, 'x', { duration: 0.08, ease: 'power3' });
    const cursorY = gsap.quickTo(cursor, 'y', { duration: 0.08, ease: 'power3' });
    const followerX = gsap.quickTo(follower, 'x', { duration: 0.25, ease: 'power3' });
    const followerY = gsap.quickTo(follower, 'y', { duration: 0.25, ease: 'power3' });

    window.addEventListener('mousemove', (e) => {
      cursorX(e.clientX);
      cursorY(e.clientY);
      followerX(e.clientX);
      followerY(e.clientY);
    });

    document
      .querySelectorAll('a, button, .project-card, input, textarea, .stat-card')
      .forEach((el) => {
        el.addEventListener('mouseenter', () => {
          document.body.classList.add('cursor-hover');
          gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
          document.body.classList.remove('cursor-hover');
          gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
      });
  }

  // ══════════════════════════════════════════════════════════════
  // MAGNETIC BUTTONS  — elements gravitate toward the cursor
  // ══════════════════════════════════════════════════════════════
  initMagneticButtons(): void {
    document.querySelectorAll('.btn, .overlay-btn').forEach((btn: any) => {
      btn.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  // ══════════════════════════════════════════════════════════════
  // PARTICLE TRAIL  — glowing orbs chase the cursor on canvas
  // ══════════════════════════════════════════════════════════════
  initParticleTrail(): void {
    const canvas = document.getElementById('cursor-trail-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const particles: {
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; r: number; hue: number;
    }[] = [];

    let mx = -999, my = -999;
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });

    const colors = [240, 270, 300, 200]; // hues: blue, purple, pink, cyan

    const spawnParticle = () => {
      particles.push({
        x: mx + (Math.random() - 0.5) * 8,
        y: my + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 0.5,
        life: 1,
        maxLife: 0.5 + Math.random() * 0.5,
        r: 2 + Math.random() * 4,
        hue: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    let frameCount = 0;
    const loop = () => {
      requestAnimationFrame(loop);
      frameCount++;
      if (frameCount % 2 === 0) spawnParticle();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.04; // slight float upward
        p.life -= 0.025 / p.maxLife;

        if (p.life <= 0) { particles.splice(i, 1); continue; }

        const alpha = p.life;
        const radius = p.r * p.life;

        ctx.save();
        ctx.globalAlpha = alpha * 0.7;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 2.5);
        grad.addColorStop(0, `hsla(${p.hue}, 90%, 70%, 1)`);
        grad.addColorStop(1, `hsla(${p.hue}, 90%, 70%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };
    loop();
  }
}
