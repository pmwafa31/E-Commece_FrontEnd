import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductsRoutingModule } from '../products-routing.module';

const options = {
  headers:new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //to set user id in header
  appendToken(){
    //fetch user id to http header
    const id = localStorage.getItem('userId')||''
    //create http header
    var headers = new HttpHeaders()
    if(id){
        headers = headers.append('id',id)
        options.headers=headers
    }
    return options
    }
  //to hold search key from from header component
  addQty = new BehaviorSubject('')
  searchKey = new BehaviorSubject('')
  constructor(private http: HttpClient) { }

  //all products api
  getAllProducts(){
    return this.http.get('http://localhost:3000/all_products')
  }

  //particular product api
  viewProduct(productId:any){
    return this.http.get('http://localhost:3000/view_product/'+productId)
  }

  //add to wishlist api
  addToWishlist(userId:any, product:any){
    const body={
      userId,
      product
    }
    return this.http.post('http://localhost:3000/add_to_wishlist/', body)
  }

  //get wishlist api
  getWishlist(userId:any){
    return this.http.get('http://localhost:3000/wishlist/'+userId)
  }

   //delete from wishlist api
   deleteProduct(productId:any){
    return this.http.delete('http://localhost:3000/delete_from_wishlist/'+productId, this.appendToken())
  }

  //add to cart api
  addToCart(userId:any, product:any){
    const body={
      userId,
      product
    }
    return this.http.post('http://localhost:3000/add_to_cart/', body)
  }

   //get cart api
   getCart(userId:any){
    return this.http.get('http://localhost:3000/cart/'+userId)
  }

   //delete from cart api
   deleteFromCart(productId:any){
    return this.http.delete('http://localhost:3000/delete_from_cart/'+productId, this.appendToken())
  }

  //increment quantity
  incrementQuantity(userId:any, productId:any){
    const body={
      userId,
      productId
    }
    return this.http.post('http://localhost:3000/add_quantity/', body)

  }

   //decrement quantity
   decrementQuantity(userId:any, productId:any){
    console.log(productId)
    const body={
      userId,
      productId
    }
    return this.http.post('http://localhost:3000/reduce_quantity', body)

  }

  //add shipping address
  payment(userId:any,name:any,phone:any,addr:any,place:any,zip:any,ordId:any){
    const body={
      userId,
      name,
      phone,
      addr,
      place,
      zip,
      ordId
    }
    return this.http.post('http://localhost:3000/add_shipping', body)

  }
  //get cart api
  getCartInvoice(userId:any,ordId:any){
    console.log(userId,ordId);
    
    const body={
      userId,
      ordId
    }
    return this.http.post('http://localhost:3000/invoice/', body)
  }

  getOrders(userId:any){
    console.log(userId);
    
    return this.http.get('http://localhost:3000/orders/'+userId)
  }
}
