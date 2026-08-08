import { Component, AfterViewInit, HostListener } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'portfolio';

  ngAfterViewInit() {
    this.initCustomCursor();
  }

  initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('custom-cursor-follower');

    if (!cursor || !follower) return;

    // Use GSAP quickTo for highly performant tracking
    const cursorX = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power3' });
    const cursorY = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power3' });
    const followerX = gsap.quickTo(follower, 'x', { duration: 0.3, ease: 'power3' });
    const followerY = gsap.quickTo(follower, 'y', { duration: 0.3, ease: 'power3' });

    window.addEventListener('mousemove', (e) => {
      cursorX(e.clientX);
      cursorY(e.clientY);
      followerX(e.clientX);
      followerY(e.clientY);
    });

    // Add hover states for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }
}
