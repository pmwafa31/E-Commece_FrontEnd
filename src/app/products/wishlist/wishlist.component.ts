import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  userId: Number = 0
  allProduct: any
  isEmpty: boolean = false
  emptyMsg: string = ''

  constructor(private api: ApiService, private router:Router) { }
  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      alert("Please Login")
      this.router.navigateByUrl('')
    }
    this.userId = JSON.parse(localStorage.getItem("userId") || '')
    this.api.getWishlist(this.userId).subscribe((result: any) => {
      this.allProduct = result.wishlist

    },
      (result: any) => {
        if (result.error.message)
          this.isEmpty = true
        this.emptyMsg = result.error.message

      })
  }

  deleteItem(productId: any) {
    this.api.deleteProduct(productId).subscribe((result: any) => {
      this.allProduct = result.wishlist

    },
      (result: any) => {
        if (result.error.message)
          this.isEmpty = true
        this.emptyMsg = result.error.message

      })
  }

  addCart(product: any) {
    this.userId = JSON.parse(localStorage.getItem("userId") || '')
    this.api.addToCart(this.userId, product).subscribe((result: any) => {
      alert(result.message)
    },
      (result: any) => {
        alert(result.error.message)
      })
      this.deleteItem(product.id)
  }
}
