import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-firstpage',
  standalone: true,
  imports: [],
  templateUrl: './firstpage.component.html',
  styleUrl: './firstpage.component.css'
})
export class FirstpageComponent {
  showImage: boolean = false;
  

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.scrollY;
    const textElement = document.querySelector('.text') as HTMLElement;
    const imageElement = document.querySelector('.image') as HTMLElement;

    if (scrollPosition > 100) {
      textElement.style.opacity = '0';
      imageElement.style.opacity = '1';
      imageElement.style.top = '50%';
    } else {
      textElement.style.opacity = '1';
      imageElement.style.opacity = '0';
      imageElement.style.top = '100%';
    }
  }
}
