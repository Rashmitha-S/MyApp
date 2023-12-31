import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hello';
  users:any;

  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.http.get('https://localhost:7056/api/users/').subscribe({
      next:response=>this.users=response,
      error:error=>console.log(error),
      complete:()=>console.log('Request has completed')
    })

    console.log(this.users[0].id+"hghj")
 
  }
}
