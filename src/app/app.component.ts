import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Portfolio';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Prevent automatic anchor jump
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
      }

      // Scroll to top manually
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, 0);
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const sections = ['about', 'skills', 'projects', 'resume', 'contact'];
    const scrollY = window.scrollY + 150; // Adjust for fixed navbar height

    let currentSection: string | null = null;

    for (let id of sections) {
      const section = document.getElementById(id);
      if (section && scrollY >= section.offsetTop) {
        currentSection = id;
      }
    }

    this.highlightNav(currentSection);
  }

  highlightNav(activeId: string | null): void {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      const target = link.getAttribute('data-scrollspy');
      if (target === activeId) {
        link.classList.add('text-mint-600', 'font-bold');
      } else {
        link.classList.remove('text-mint-600', 'font-bold');
      }
    });
  }
}
