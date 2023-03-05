import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  //register
  registerUser(name:any,email:any,phone:any,pswd:any){
    const body={
      name,
      email,
      phone,
      pswd
      
    }
    return this.http.post('http://localhost:3000/register', body)
  }

  //login
  loginUser(phone:any,pswd:any){ 
    const body={
      phone,
      pswd
    }
    return this.http.post('http://localhost:3000/login', body)
  }
}