import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  errorMsg:string = ""
  //register group
  registerForm = this.fb.group({
    //array
    name:['', [Validators.required, Validators.pattern('[a-zA-z]*')]],
    email:['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    phone:['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],    
    pswd:['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]],
    // confirm_pswd:['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]],
  })

  constructor(private fb:FormBuilder, private router:Router, private api:ApiService){}

  register(){
    if(this.registerForm.valid){
      let name = this.registerForm.value.name
      let phone = this.registerForm.value.phone
      let email = this.registerForm.value.email
      let pswd = this.registerForm.value.pswd
      this.api.registerUser(name, email, phone, pswd)
      .subscribe((data:any) =>{
        //success case
        alert(data.message)  
        //navigate to login page
        this.router.navigateByUrl('login')
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
}
