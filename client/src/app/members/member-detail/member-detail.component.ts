import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleriaItem } from 'primeng/galleria';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  member:any
  images=[];
  responsiveOptions: any[] | undefined;

  constructor(private memberService:MembersService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadmember();
  }

  loadmember(){
    const username=this.route.snapshot.paramMap.get('id');
    if(!username)return
      this.memberService.getMember(username).subscribe({
        next:member=>{
         this.member=member;
         this.getImages();
        }
      });
    }

    getImages(){
      if(!this.member) return;
      for(const photo of this.member?.photos){
        this.images=photo;
        console.log(this.images)
      } 
    }

}
