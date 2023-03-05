import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  public payPalConfig ? : IPayPalConfig;

  userId: number = 0
  isEmpty: boolean = false
  emptyMsg: string = ''
  totalQuantity :number=0
  totalPrice :number=0
  shippingCost :number=0
  discountFee :number=0
  tax :number=0
  grantTotal :number=0
  orderId:any

  errorMsg:string = ""
  successMsg:boolean=false


  //payment group
  paymentForm = this.fb.group({
    //array
    name:['', [Validators.required, Validators.pattern('[a-zA-z]*')]],
    address:['', [Validators.required, Validators.pattern('[0-9a-zA-z]*')]],
    phone:['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],    
    place:['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    zip:['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(6), Validators.maxLength(6)]],    

  })
  constructor(private api: ApiService, private fb:FormBuilder, private router:Router) { }
  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      alert("Please Login")
      this.router.navigateByUrl('')
    }
    this.userId = JSON.parse(localStorage.getItem("userId") || '')
    this.api.getCart(this.userId).subscribe((result: any) => {
      this.totalPrice = result.totalCost
      this.totalQuantity = result.tquantity
      this.tax = result.totalTax
      this.discountFee = result.tdiscount
      this.grantTotal = result.grantprice
      this.shippingCost = result.sCost
      this.orderId=result.orderId

    },
      (result: any) => {
        if (result.error.message)
          this.isEmpty = true
        this.emptyMsg = result.error.message

      })

      // this.initConfig();
  }

  payment(){
    if(this.paymentForm.valid){
      let name = this.paymentForm.value.name
      let phone = this.paymentForm.value.phone
      let address = this.paymentForm.value.address
      let place = this.paymentForm.value.place
      let zip = this.paymentForm.value.zip

      this.api.payment(this.userId,name,phone,address,place,zip,this.orderId)
      .subscribe((data:any) =>{
        //success case
        this.successMsg = true
        //alert(data.message)  

        setTimeout(()=>{
          //navigate to login page
          this.router.navigateByUrl('products/invoice/'+this.orderId)
        },2000) 
        alert(data.message)
      },
      //client error
      (result:any)=>{
        this.errorMsg = result.error.message
      }
      )            
      
      }
      
      else{
      alert('Invalid Form')
      }

  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'AeYGVrcgmF21T-DoPY6QRJ9ysz5hO1h98T97klyuYdBHFLOonAaH3HF4jZl34dUJuyEpVH7w0jMTG0SS',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: this.grantTotal.toFixed(),
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: this.grantTotal.toFixed()
                        }
                    }
                },
                // items: [{
                //     name: 'Enterprise Subscription',
                //     quantity: '1',
                //     category: 'DIGITAL_GOODS',
                //     unit_amount: {
                //         currency_code: 'EUR',
                //         value: '9.99',
                //     },
                // }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        // onApprove: (data, actions) => {
        //     console.log('onApprove - transaction was approved, but not authorized', data, actions);
        //     actions.order.get().then((details:any) => {
        //         console.log('onApprove - you can get full order details inside onApprove: ', details);
        //     });

        // },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            console.log(data.id)
            // this.orderId = data.id
            // this.payment()
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);

        },
        onError: err => {
            console.log('OnError', err);
        }
        // onClick: (data, actions) => {
        //     console.log('onClick', data, actions);
        // }
    };
}
}
