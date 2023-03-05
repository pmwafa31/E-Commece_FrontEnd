import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  allProducts:any = []

  constructor(private api: ApiService){}
  
  ngOnInit(): void {
   
     this.api.getAllProducts().subscribe((result:any)=>{
        this.allProducts = result.products.slice(0,6)
     }
     )
   }

}
