import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl='https://localhost:7056/api/';
  validationErrors:string[]=[];

  constructor(private http:HttpClient,private messageservice:MessageService) { }

  ngOnInit(): void {
  }
  get404error(){
    this.http.get(this.baseUrl+'buggy/not-found').subscribe({
      next:response=>console.log(response),
      error:error=>console.log(error)
    })
  }
  get400error(){
    this.http.get(this.baseUrl+'buggy/bad-request').subscribe({
      next:response=>console.log(response),
      error:error=>console.log(error)
    })
  }
  get500error(){
    this.http.get(this.baseUrl+'buggy/server-error').subscribe({
      next:response=>console.log(response),
      error:error=>console.log(error)
    })
  }
  get401error(){
    debugger
    this.http.get(this.baseUrl+'buggy/auth').subscribe({
      next:response=>console.log(response),
      error:error=>this.messageservice.add({severity:'error', summary:'Unauthorised', detail:error.status.toString()})
    })
  }
  get400Validationerror(){
    debugger
    this.http.post(this.baseUrl+'account/register',{}).subscribe({
      next:response=>console.log(response),
      error:error=>{console.log(error);
      this.validationErrors=error;}
    })
  }
}
