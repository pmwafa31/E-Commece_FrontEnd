import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{
  productId :any
  product:any = []
  userId:Number=0
  isLogin:boolean = false
  constructor(private activatedRoute:ActivatedRoute, private api:ApiService, private router:Router){}
  ngOnInit(): void {

    if(localStorage.getItem("token")){
      this. isLogin = true
    }
 
    this.activatedRoute.params.subscribe((result:any)=>{
      this.productId = result.id  
   })

   //api call for product
   this.api.viewProduct(this.productId).subscribe((result:any)=>{
      this.product = result.product
   })
  }

  addWishlist(product:any){
    if(!localStorage.getItem("token")){
      alert("Please Login")
      this.router.navigateByUrl('/login')
    }
    else{
        this.userId = JSON.parse(localStorage.getItem("userId")||'')
        this.api.addToWishlist(this.userId, product).subscribe((result:any)=>{
          alert(result.message)
        },
        (result:any)=>{
          alert(result.error.message)
        })
    }
   }

   addCart(product:any){
    if(!localStorage.getItem("token")){
      alert("Please Login")
      this.router.navigateByUrl('/login')
    }
    else{
        this.userId = JSON.parse(localStorage.getItem("userId")||'')
        this.api.addToCart(this.userId, product).subscribe((result:any)=>{
          alert(result.message)
        },
        (result:any)=>{
          alert(result.error.message)
        })
    }
   }
}
