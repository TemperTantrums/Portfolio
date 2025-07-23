import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css'],
})
export class ProjectModalComponent {
  @Input() id = '';
  @Input() title = '';
  @Input() description = '';
  @Input() tags: string[] = [];
  @Input() imageUrl = '';
  @Input() githubUrl = '';
  @Input() visible = false;

  @HostBinding('class.hidden') get hiddenClass() {
    return !this.visible;
  }

  closeModal() {
    this.visible = false;
  }
}
