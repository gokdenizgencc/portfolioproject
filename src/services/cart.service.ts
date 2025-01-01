import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { CartItem } from '../models/cardItem';
import { CartItems } from '../models/cardItems';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(user:User){
    let item= CartItems .find(u=>u.user.userId==user.userId);

    if(item){
      item.quantity+=1;
    }
    else{
      let cardItem=new CartItem();
      cardItem.user=user;
      cardItem.quantity=1;
      CartItems.push(cardItem);

    }
  
    }
    list():CartItem[]{
      return CartItems;
  }
  removeFromCart(user:User){
    let item: CartItem | undefined = CartItems.find(u => u.user.userId == user.userId);

    if (item) {
      CartItems.splice(CartItems.indexOf(item), 1);
    } else {
      console.error("Item not found!");
    }
  }
}
