import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {

  isLogin:boolean = false
  name:string=""
  logoutSpinner:boolean=false
  userId: number = 0
  qty : any

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this. isLogin = true
    }
    if(localStorage.getItem("name")){
      this. name = localStorage.getItem("name") ||''
    }
    this.userId = JSON.parse(localStorage.getItem("userId") || '')
    this.api.getCart(this.userId).subscribe((result: any) => {
      this.qty = result.tquantity

    })
    // this.api.addQty.subscribe((result)=>{
    //   this.qty = result
    //  })
  }
  search(event:any){
    let searchTerm = event.target.value
    this.api.searchKey.next(searchTerm)
      
  }

  //log out function
  logOut(){
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    localStorage.removeItem("userId")
    this.logoutSpinner = true
    setTimeout(()=>{
      this.logoutSpinner = false
      this.router.navigateByUrl('/')
    },4000)
  }
}
