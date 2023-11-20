import { Component, OnInit } from '@angular/core';
//import {Member} from '../_models/member';
//import { Member } from '../_models/member';
import {Member} from '../../_models/member';
import {MembersService} from '../../_services/members.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  //members$:Observable<Member[]>|undefined;
  members:Member[]|undefined;

  constructor(private memberService:MembersService) { }

  ngOnInit(): void {
    //this.members$=this.memberService.getMembers();
     this.loadMembers();
  }

  loadMembers()
  {
    this.memberService.getMembers().subscribe({
      next:member=>{
      
      this.members=member;
      console.log(this.members);
      }
    })


   }




}
