import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { error } from '@angular/compiler/src/util';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],})
export class RegisterComponent implements OnInit {

  model:any={};
  registerForm:FormGroup=new FormGroup({});
  maxDate:Date=new Date();
  validationErrors:string[] | undefined;
 // @Input() usersFromHomeComponent:any;
  @Output() cancelRegister=new EventEmitter();

  constructor(private accountService:AccountService,
    private messageService:MessageService,private fb:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    debugger
    this.initialiseForm();
    this.maxDate.setFullYear(this.maxDate.setFullYear(0) -18);
  }

  initialiseForm(){
    this.registerForm=this.fb.group({
      gender:['male'],
      username:['',Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword:['',[Validators.required,this.matchValues('password')]]
    })
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    });
  }

  matchValues(matchTo:string):ValidatorFn{
    return (control:AbstractControl)=>{
      return control?.value === control?.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }

  }

  // register(){
  //   console.log(this.registerForm?.value);
  //   this.accountService.register(this.registerForm?.value).subscribe({
  //     next: () => {
  //       this.router.navigateByUrl('/members');
  //        // console.log(response);
  //         this.cancel();
  //     },
  //     error:error=>{
  //      this.validationErrors=error;
  //     }
  //    // error:error=> this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error})           
  // })
  // }

  register() {
    const dob = this.GetDateOnly(this.registerForm.controls['dateOfBirth'].value)
    const values = {...this.registerForm.value, dateOfBirth: this.GetDateOnly(dob)}
    this.accountService.register(values).subscribe({
      next: response => {
        this.router.navigateByUrl('/members');
      },
      error: error => {
        this.validationErrors = error;
      } 
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
   // console.log("cancelled");
  }

  
  private GetDateOnly(dob: string | undefined) {
    if (!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes()-theDob.getTimezoneOffset())).toISOString().slice(0,10);
  }

}
