import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface SectionAnimationConfig {
  sectionSelector: string;
  titleSelector?: string;
  exitEnabled?: boolean;
}

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

    // ── inject scan-line ──────────────────────────────────────
    const scanLine = document.createElement('div');
    scanLine.className = 'section-scan-line';
    section.appendChild(scanLine);

    // ── title split + reveal ──────────────────────────────────
    const titleSel = titleSelector ?? `${sectionSelector} .section-title`;
    const titleEl = document.querySelector(titleSel) as HTMLElement;
    if (titleEl) {
      this.splitTitle(titleEl);

      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          // Fire scan-line
          scanLine.style.animationPlayState = 'running';

          // Animate each word-inner upward out of its mask
          gsap.to(titleEl.querySelectorAll('.word-inner'), {
            y: 0,
            duration: 0.8,
            stagger: 0.07,
            ease: 'power4.out',
          });

          // Underline grows
          setTimeout(() => titleEl.classList.add('title-visible'), 600);
        },
      });
    }

    // ── exit: section dims & blurs as user scrolls past ───────
    if (exitEnabled) {
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
