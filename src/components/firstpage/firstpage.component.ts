import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-firstpage',
  standalone: true,
  imports: [],
  templateUrl: './firstpage.component.html',
  styleUrl: './firstpage.component.css'
})
export class FirstpageComponent {
  showImage: boolean = false;
constructor( private authService:AuthService){

}
  @HostListener('window:scroll', [])

  ngOnInit(){
      this.authService.checklogin();
  }
  onScroll(): void {
    const scrollPosition = window.scrollY;
    const textElement = document.querySelector('.text') as HTMLElement;
    const imageElement = document.querySelector('.image') as HTMLElement;
  
    const maxScroll = 300; // Yazının tamamen kaybolacağı scroll miktarı
    const scaleValue = Math.max(0.5, 1 - scrollPosition / (2 * maxScroll)); // Ölçekleme 1'den 0.5'e düşecek
    const opacityValue = Math.max(0, 1 - scrollPosition / maxScroll);
  
    textElement.style.opacity = `${opacityValue}`;
    textElement.style.transform = `translate(-50%, -50%) scale(${scaleValue})`;
  
    if (scrollPosition > maxScroll) {
      imageElement.style.opacity = '1';
      imageElement.style.top = '50%';
    } else {
      imageElement.style.opacity = '0';
      imageElement.style.top = '100%';
    }
  }
}
