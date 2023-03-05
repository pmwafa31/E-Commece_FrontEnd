import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  userId: number = 0
  allProduct: any
  isEmpty: boolean = false
  emptyMsg: string = ''
  totalPrice :number=0
  shippingCost :number=0
  discountFee :number=0
  ship:string=""
  tax :number=0
  grantTotal :number=0
  qty : any

  constructor(private api: ApiService, private router:Router) { }
  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      alert("Please Login")
      this.router.navigateByUrl('')
    }
    this.userId = JSON.parse(localStorage.getItem("userId") || '')
    this.api.getCart(this.userId).subscribe((result: any) => {
      this.allProduct = result.cart
      this.totalPrice = result.totalCost
      this.tax = result.totalTax
      this.discountFee = result.tdiscount
      this.grantTotal = result.grantprice
      this.shippingCost = result.sCost
      this.qty = result.tquantity
      // this.api.addQty.next(this.qty)
    },
      (result: any) => {
        if (result.error.message)
          this.isEmpty = true
        this.emptyMsg = result.error.message

      })
  }

  deleteItem(productId: any) {
    this.api.deleteFromCart(productId).subscribe((result: any) => {
      this.allProduct = result.cart
      this.totalPrice = result.totalCost
      this.tax = result.totalTax
      this.discountFee = result.tdiscount
      this.grantTotal = result.grantprice
      this.shippingCost = result.sCost

    },
      (result: any) => {
        if (result.error.message)
          this.isEmpty = true
        this.emptyMsg = result.error.message

      })
  }

  addQuantity(productId: any) {

    this.api.incrementQuantity(this.userId, productId).subscribe((result: any)=>{
      this.allProduct = result.cart
      this.totalPrice = result.totalCost
      this.tax = result.totalTax
      this.discountFee = result.tdiscount
      this.grantTotal = result.grantprice
      this.shippingCost = result.sCost
    },
      (result: any) => {
        if (result.error.message)
          this.isEmpty = true
        this.emptyMsg = result.error.message

    }) 
  }

  reduceQuantity(productId: any) {

    this.api.decrementQuantity(this.userId, productId).subscribe((result: any)=>{
      this.allProduct = result.cart
      this.totalPrice = result.totalCost
      this.tax = result.totalTax
      this.discountFee = result.tdiscount
      this.grantTotal = result.grantprice
      this.shippingCost = result.sCost

    },
      (result: any) => {
        if (result.error.message)
          this.isEmpty = true
        this.emptyMsg = result.error.message

    })
     
  }

}
