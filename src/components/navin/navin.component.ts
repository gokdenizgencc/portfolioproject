import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-navin',
  standalone: true,
  imports: [CommonModule,HttpClientModule, FormsModule,ToastrModule, ReactiveFormsModule,RouterModule],
  templateUrl: './navin.component.html',
  styleUrl: './navin.component.css'
})
export class NavinComponent {

}
