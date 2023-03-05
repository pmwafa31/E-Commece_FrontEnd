import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  allProducts:any = []
  searchItem:string=''
  userId: Number=0
  isLogin: boolean = false
  constructor(private api: ApiService, private router:Router){}
  
  ngOnInit(): void {
    
    if(localStorage.getItem("token")){
      this. isLogin = true
    }
     this.api.getAllProducts().subscribe((result:any)=>{
        this.allProducts = result.products
     })

     //to get search term from header component using behaviour subject in api service
     this.api.searchKey.subscribe((result)=>{
      this.searchItem = result
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
}
