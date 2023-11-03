import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component , OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'hello';
  users:any;

  constructor(private http:HttpClient,private accountService:AccountService){}
  ngOnInit(): void {
  // this.getUsers();
   this.setCurrentUser();
  }

  // getUsers(){
  //   this.http.get('https://localhost:7056/api/users/').subscribe({
  //     next:response=>this.users=response,
  //     error:error=>console.log(error),
  //     complete:()=>console.log('Request has completed')
  //   })
  // }


  setCurrentUser(){
    const userString=localStorage.getItem('user');
    if(!userString)return;
    const user:User=JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
