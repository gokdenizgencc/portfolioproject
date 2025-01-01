import { Component } from '@angular/core';
import { CartItem } from '../../models/cardItem';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { User } from '../../models/user';
import { ToastrModule, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule,ToastrModule],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent {
  constructor(private cartService:CartService,private toastrService:ToastrService){

  }
  ngOnInit():void{
    this.getCart();
  }
  cartItems:CartItem[];
  getCart(){
    this.cartItems=this.cartService.list();
  }
  removeFromCart(user:User){
    this.cartService.removeFromCart(user)
    this.toastrService.error("Silindi")
  }
}
