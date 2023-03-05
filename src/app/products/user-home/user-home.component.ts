import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit{
  
  allProducts:any = []

  constructor(private api: ApiService, private router: Router){}
  
  ngOnInit(): void {
   
    if(!localStorage.getItem("token")){
      alert("Please Login")
      this.router.navigateByUrl('')
    }
     this.api.getAllProducts().subscribe((result:any)=>{
        this.allProducts = result.products.slice(0,6)
     }
     )
   }

}
