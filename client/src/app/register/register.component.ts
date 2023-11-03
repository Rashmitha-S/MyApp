import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { error } from '@angular/compiler/src/util';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  model:any={};
 // @Input() usersFromHomeComponent:any;
  @Output() cancelRegister=new EventEmitter();

  constructor(private accountService:AccountService,
    private messageService:MessageService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe({
      next: () => {
         // console.log(response);
          this.cancel();
      },
      error:error=> this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error})           
  })
    console.log(this.model);

    
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log("cancelled");
  }

}
