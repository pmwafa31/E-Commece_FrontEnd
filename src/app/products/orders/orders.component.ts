import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  userId:string=""
  orders:any =[]
  isEmpty:boolean =false
  emptyMsg:string=""
  ordId :any
  constructor(private api: ApiService, private router:Router){}
  ngOnInit(): void {
   
    if(!localStorage.getItem("token")){
      alert("Please Login")
      this.router.navigateByUrl('')
    }
    this.userId = JSON.parse(localStorage.getItem("userId") || '')
    console.log(this.userId)
    this.api.getOrders(this.userId).subscribe((result: any) => {

      this.orders = result.order
      this.ordId = this.orders.orderId
    },
      (result: any) => {
        if (result.error.message){
          this.isEmpty =true
          this.emptyMsg =result.error.message

        }

  })
  }

  

}
