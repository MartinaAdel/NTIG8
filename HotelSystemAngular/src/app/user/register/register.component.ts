import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  contactus = new FormGroup({
    name:new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]), //Validators.pattern('')
    email:new FormControl(),
    message:new FormControl(),
    phone:new FormControl(),
  
  })
  get name(){ return this.contactus.get('name')}
  
  constructor(private _user:ApiService) { }

  ngOnInit(): void {
  }
  handleRegister(){
    console.log(this.contactus.valid);
    
    console.log(this.contactus.value)
    // if(register.valid){
    //   console.log(this.userData)
    //   this._user.register(this.userData).subscribe(res=>{
    //     if(res.error.email) this.emailUsedBefore=true
    //     console.log(res)
    //   })
    //   register.resetForm()  
    // }
  }
  // reset(){
    // e.preventDefault()
    // reg.resetForm()
  // }
}
