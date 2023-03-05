import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit{
  ordId:any
  userId:string =''
  allProducts:any=[]
  shipAddress:any
  totalPrice:number=0
  tax:number=0
  discountFee:number=0
  grantTotal:number=0
  shippingCost:number=0
  orderId:any
  isEmpty:boolean=false
  name:any
  date:string=''
  constructor(private api: ApiService, private activatedRoute:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      alert("Please Login")
      this.router.navigateByUrl('')
    }
    this.activatedRoute.params.subscribe((result:any)=>{
      this.orderId = result.id
    })
    this.userId = JSON.parse(localStorage.getItem("userId") || '')
    this.api.getCartInvoice(this.userId,this.orderId).subscribe((result: any) => {
      this.allProducts = result.cart
      this.shipAddress=result.shipadr
      this.totalPrice = result.totalCost
      this.tax = result.totalTax
      this.discountFee = result.tdiscount
      this.grantTotal = result.grantprice
      this.shippingCost = result.sCost
      this.ordId=result.orderId
      this.date=result.date
      console.log(this.shipAddress)
    },
      (result: any) => {
        if (result.error.message)
          this.isEmpty = true

      })
  }

}
