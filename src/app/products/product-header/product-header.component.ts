import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.css']
})
export class ProductHeaderComponent {

  constructor(private api:ApiService){}

  search(event:any){
    let searchTerm = event.target.value
    this.api.searchKey.next(searchTerm)
      
  }
}
