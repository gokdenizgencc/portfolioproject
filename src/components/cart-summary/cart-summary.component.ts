import { Component } from '@angular/core';
import { CartItem } from '../../models/cardItem';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent {
  constructor(private cartService:CartService){

  }
  ngOnInit():void{
    this.getCart();
  }
  cartItems:CartItem[];
  getCart(){
    this.cartItems=this.cartService.list();
  }
}
