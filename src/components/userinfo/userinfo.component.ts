import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-userinfo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userinfo.component.html',
  styleUrl: './userinfo.component.css'
})
export class UserinfoComponent {
 infos = [
    { title: 'Üniversite', content: 'Mersin Üniversitesi' },
    { title: 'Bölüm', content: 'Bilgisayar Mühendisliği' },
    { title: 'Doğum Yeri', content: 'İstanbul' },
    { title: 'Yaş', content: '25' }
  ];
}
