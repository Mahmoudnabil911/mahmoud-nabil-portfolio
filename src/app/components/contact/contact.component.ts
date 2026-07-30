import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      value: 'mahmodnabil2328@gmail.com',
      link: 'mailto:mahmodnabil2328@gmail.com',
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
      link: 'https://www.linkedin.com/in/mahmoud-elkholy-5480821ab/',
    },
    {
      icon: 'github',
      label: 'GitHub',
      value: 'mahmoudnabil',
      link: 'https://github.com/Mahmoudnabil911',
    },
  ];

  formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    const contactElements = gsap.utils.toArray('.contact-card, .form-group, .submit-btn');

    gsap.fromTo(
      contactElements as HTMLElement[],
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 80%',
        },
      }
    );
  }

  onSubmit(): void {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      return;
    }

    this.isSubmitting = true;

    const subject = encodeURIComponent(this.formData.subject || 'New Contact from Portfolio');
    const body = encodeURIComponent(
      `Name: ${this.formData.name}\n` +
      `Email: ${this.formData.email}\n\n` +
      `Message:\n${this.formData.message}`
    );

    // Open user's default email client in a new tab (if possible) or same window
    window.open(`mailto:mahmodnabil2328@gmail.com?subject=${subject}&body=${body}`, '_blank');

    // Show success for a short time
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
