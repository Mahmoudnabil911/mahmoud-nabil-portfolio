import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface SectionAnimationConfig {
  sectionSelector: string;
  titleSelector?: string;
  exitEnabled?: boolean;
}

const isMobile = (): boolean =>
  window.matchMedia('(pointer: coarse), (max-width: 768px)').matches ||
  navigator.maxTouchPoints > 0;

@Injectable({
  providedIn: 'root',
})
export class SectionAnimationsService {

  // ──────────────────────────────────────────────────────────────
  // SPLIT TITLE  — wrap each word in a mask for a theatrical reveal
  // ──────────────────────────────────────────────────────────────
  splitTitle(el: HTMLElement): void {
    const words = el.textContent?.split(' ') ?? [];
    el.innerHTML = words
      .map(
        (w) =>
          `<span class="word-mask"><span class="word-inner">${w}</span></span>`
      )
      .join(' ');

    // Preserve gradient-text class on the whole element
    // (clip applied per span won't carry gradient — re-apply it)
  }

  // ──────────────────────────────────────────────────────────────
  // INIT SECTION  — scan-line, split-title reveal, parallax exit
  // ──────────────────────────────────────────────────────────────
  initSectionAnimation(config: SectionAnimationConfig): void {
    const { sectionSelector, titleSelector, exitEnabled = true } = config;

    const section = document.querySelector(sectionSelector) as HTMLElement;
    if (!section) return;

    section.style.position = 'relative';
    section.style.overflow = 'hidden';

    const mobile = isMobile();

    // ── inject scan-line (desktop only) ──────────────────────
    if (!mobile) {
      const scanLine = document.createElement('div');
      scanLine.className = 'section-scan-line';
      section.appendChild(scanLine);

      // Will be fired on scroll enter below
      (section as any).__scanLine = scanLine;
    }

    // ── title split + reveal ──────────────────────────────────
    const titleSel = titleSelector ?? `${sectionSelector} .section-title`;
    const titleEl = document.querySelector(titleSel) as HTMLElement;
    if (titleEl) {
      this.splitTitle(titleEl);

      ScrollTrigger.create({
        trigger: section,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          const scanLine = (section as any).__scanLine;
          if (scanLine) scanLine.style.animationPlayState = 'running';

          // Animate each word-inner upward out of its mask
          gsap.to(titleEl.querySelectorAll('.word-inner'), {
            y: 0,
            duration: mobile ? 0.5 : 0.8,
            stagger: mobile ? 0.04 : 0.07,
            ease: 'power4.out',
          });

          // Underline grows
          setTimeout(() => titleEl.classList.add('title-visible'), mobile ? 400 : 600);
        },
      });
    }

    // ── exit animation ────────────────────────────────────────
    if (exitEnabled) {
      if (mobile) {
        // Mobile: opacity only — NO blur/scale (both cause jank)
        gsap.to(section, {
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'bottom 20%',
            end: 'bottom top',
            scrub: 1,
          },
        });
      } else {
        // Desktop: full cinematic exit
        gsap.to(section, {
          opacity: 0.12,
          scale: 0.97,
          filter: 'blur(6px)',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'bottom 15%',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }
    }
  }

  // ──────────────────────────────────────────────────────────────
  // STAGGER REVEAL  — generic items rise from below
  // ──────────────────────────────────────────────────────────────
  staggerReveal(
    selector: string,
    trigger: string,
    options: {
      start?: string;
      fromY?: number;
      fromScale?: number;
      duration?: number;
      stagger?: number;
      ease?: string;
    } = {}
  ): void {
    const {
      start = 'top 88%',
      fromY = 60,
      fromScale = 0.9,
      duration = 0.9,
      stagger = 0.12,
      ease = 'power3.out',
    } = options;

    const els = document.querySelectorAll(selector);
    if (!els.length) return;

    gsap.set(els, { y: fromY, scale: fromScale, opacity: 0 });

    ScrollTrigger.create({
      trigger,
      start,
      once: true,
      onEnter: () => {
        gsap.to(els, { y: 0, scale: 1, opacity: 1, duration, stagger, ease });
      },
    });
  }

  // ──────────────────────────────────────────────────────────────
  // ALTERNATING SLIDE  — items slide in from alternating sides
  // ──────────────────────────────────────────────────────────────
  alternatingSlide(selector: string, trigger: string, start = 'top 88%'): void {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;

    els.forEach((el, i) => {
      const dir = i % 2 === 0 ? -80 : 80;
      gsap.set(el, { x: dir, opacity: 0 });
      ScrollTrigger.create({
        trigger,
        start,
        once: true,
        onEnter: () => {
          gsap.to(el, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
          });
        },
      });
    });
  }
}
