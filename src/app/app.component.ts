import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ProjectModalComponent } from './components/project-modal/project-modal.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProjectModalComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Portfolio';
  showModal = false;
  isMobileMenuOpen = false;

  selectedProject = {
    id: '',
    title: '',
    description: '',
    tags: [] as string[],
    imageUrl: '',
    githubUrl: '',
  };

  modalData = {
    cafeteria: {
      id: 'cafeteria',
      title: 'Cafeteria Operations System',
      description:
        'A cafeteria operations system designed for call center agents to time in for attendance and earn meal credits, which can be redeemed for free meals at the canteen. The system also functions as a POS for the concessionaire, allowing seamless credit-based transactions during order processing.',
      tags: ['JavaScript', 'PHP'],
      imageUrl: 'assets/projects/CafeteriaReinvented.png',
      githubUrl: 'https://github.com/example/cafeteria',
    },
    jitech: {
      id: 'jitech-internal',
      title: "Jitech's Internal Website",
      description:
        'A centralized management system for Jitech Solutions. Includes modules for product inventory, sales processing, and quotation generation, streamlining company operations through an internal dashboard.',
      tags: ['Angular', 'Tailwind', 'TypeScript'],
      imageUrl: 'assets/projects/JitechInternal.png',
      githubUrl: 'https://github.com/Azrael717171/Jitech.git',
    },
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
      }

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, 0);
    }
  }

  openModal(project: any) {
    console.log('Opening modal with project:', project);
    this.selectedProject = project;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const sections = ['about', 'skills', 'projects', 'resume', 'contact'];
    const scrollY = window.scrollY + 150;

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

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}
