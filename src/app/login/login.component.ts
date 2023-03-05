import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMsg:string = ""
  successMsg:boolean=false


  //login group
  loginForm = this.fb.group({
    //array
    phone:['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],    
    pswd:['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]],
  })
  
  constructor(private fb:FormBuilder, private router:Router, private api:ApiService){}

  login(){
    if(this.loginForm.valid){
      let phone = this.loginForm.value.phone
      let pswd = this.loginForm.value.pswd
      this.api.loginUser(phone, pswd)
      .subscribe((data:any) =>{
        this.successMsg = true
        //store id local storage
        localStorage.setItem("name",data.name)
         //store account number in local storage
         localStorage.setItem("userId",data.id)
        //store token
        localStorage.setItem("token",data.token)
        //navigate to user home page
        setTimeout(()=>{
          //navigate to login page
          this.router.navigateByUrl('products/user_home')
        },2000)   
         
       },
      //client error
      (result:any)=>{
        this.errorMsg = result.error.message
        setTimeout(()=>{
          this.loginForm.reset()
          this.errorMsg=""
        },3000)
      }
      )
      }
      
      else{
      alert('Invalid Form')
      setTimeout(()=>{
        this.loginForm.reset()
      },2000)
      }

  }
}
