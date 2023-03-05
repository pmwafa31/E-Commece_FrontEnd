import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit{

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
    console.log(this.orderId,this.userId)
    this.api.getCartInvoice(this.userId,this.orderId).subscribe((result: any) => {
      console.log(result)
      this.allProducts = result.cart
      this.shipAddress=result.shipAdr
      this.totalPrice = result.totalCost
      this.tax = result.totalTax
      this.discountFee = result.tdiscount
      this.grantTotal = result.grantprice
      this.shippingCost = result.sCost
      this.ordId=result.orderId
      this.date=result.date
      this.name=this.shipAddress[0].name
    },
      (result: any) => {
        if (result.error.message)
          this.isEmpty = true

      })
  }

  print(){
    window.print()
  }

}
