import { Component, OnInit } from '@angular/core';
//import {Member} from '../_models/member';
//import { Member } from '../_models/member';
import {Member} from '../../_models/member';
import {MembersService} from '../../_services/members.service';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  member:Member[]=[];
 //members$:Observable<Member[]>|undefined;
 pagination: Pagination | undefined;
 userParams: UserParams | undefined;
 genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];
 // members:Member[]|undefined;

  constructor(private memberService:MembersService,private accountService:AccountService) {
 this.userParams=this.memberService.getUserParams();
   }

  ngOnInit(): void {
 // this.members$=this.memberService.getMembers();
    this.loadMembers();
  }

  loadMembers()
  {
   if(this.userParams){
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe({
      next:response=>{
      if(response.result && response.pagination){
        this.member=response.result;
        this.pagination=response.pagination;
      }
    }
    })
   }
    //const userString=JSON.parse(localStorage.getItem('user'))?.username;
    
  }
  resetFilters() {
      this.userParams=this.memberService.resetUserParams();
      this.loadMembers();
  }

 pageChanged(event:any){
  debugger
  if(this.userParams.pageNumber!=event.page){
    this.userParams.pageNumber=event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }
 }




}
