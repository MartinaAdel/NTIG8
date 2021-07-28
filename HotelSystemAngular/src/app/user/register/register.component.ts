import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailUsedBefore = false
  userData:any = {
    name:"",
    password:"",
    dateOfBirth:"",
    email:"",
    gender:1,
    phone:"",
    role:1
  }
  constructor(private _user:ApiService) { }

  ngOnInit(): void {
  }
  handleRegister(register:NgForm){
    if(register.valid){
      console.log(this.userData)
      this._user.register(this.userData).subscribe(res=>{
        if(res.error.email) this.emailUsedBefore=true
        console.log(res)
      })
      register.resetForm()  
    }
  }
  reset(e:Event, reg:NgForm){
    // e.preventDefault()
    reg.resetForm()
  }
}
