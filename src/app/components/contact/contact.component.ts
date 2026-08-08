import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionAnimationsService } from '../../services/section-animations.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements AfterViewInit {
  contactInfo = [
    {
      icon: 'email',
      label: 'Email',
      value: 'mahmoudnabil2328@gmail.com',
      link: 'mailto:mahmoudnabil2328@gmail.com',
    },
    {
      icon: 'whatsapp',
      label: 'WhatsApp',
      value: '+201027197422',
      link: 'https://wa.me/201027197422',
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      value: 'Mahmoud Nabil',
      link: 'https://www.linkedin.com/in/mahmoud-nabil-5480821ab/',
    },
    {
      icon: 'github',
      label: 'GitHub',
      value: 'mahmoudnabil',
      link: 'https://github.com/Mahmoudnabil911',
    },
  ];

  formData = { name: '', email: '', subject: '', message: '' };
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  constructor(
    private http: HttpClient,
    private sectionAnim: SectionAnimationsService
  ) {}

  ngAfterViewInit(): void {
    // ── Section-level enter/exit ──────────────────────────────
    this.sectionAnim.initSectionAnimation({
      sectionSelector: '.contact-section',
      exitEnabled: false, // last section – keep it visible
    });

    // ── Content animations ────────────────────────────────────
    this.animateContact();
  }

  animateContact(): void {
    // Set initial state
    gsap.set('.contact-info', { x: -60, opacity: 0 });
    gsap.set('.contact-form-wrapper', { x: 60, opacity: 0 });
    gsap.set('.contact-card', { x: -30, opacity: 0 });
    gsap.set('.form-group, .submit-btn', { x: 30, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top bottom',
        once: true,
      },
    });

    tl.to('.contact-info', {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
      })
      .to(
        '.contact-form-wrapper',
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '<'
      )
      .to(
        '.contact-card',
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )
      .to(
        '.form-group, .submit-btn',
        { x: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: 'power2.out' },
        '<'
      );

    // Continuous shimmer on contact cards on hover
    document.querySelectorAll('.contact-card').forEach((card: any) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          boxShadow: '0 0 25px rgba(102, 126, 234, 0.4)',
          duration: 0.3,
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          boxShadow: 'none',
          duration: 0.3,
        });
      });
    });
  }

  onSubmit(): void {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      return;
    }

    this.isSubmitting = true;

    const subject = encodeURIComponent(
      this.formData.subject || 'New Contact from Portfolio'
    );
    const body = encodeURIComponent(
      `Name: ${this.formData.name}\n` +
        `Email: ${this.formData.email}\n\n` +
        `Message:\n${this.formData.message}`
    );

    window.open(
      `mailto:mahmodnabil2328@gmail.com?subject=${subject}&body=${body}`,
      '_blank'
    );

    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.formData = { name: '', email: '', subject: '', message: '' };

      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    }, 1000);
  }
}
