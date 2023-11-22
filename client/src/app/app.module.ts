import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu'; 
import { SplitButtonModule } from 'primeng/splitbutton';
import { HomeComponent } from './home/home.component';
import { CardModule } from 'primeng/card';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageService, SharedModule } from 'primeng/api';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ErrorsInterceptor } from './_interceptor/errors.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { OrderListModule } from 'primeng/orderlist';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { TabViewModule } from 'primeng/tabview';
import { GalleriaModule } from 'primeng/galleria';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';

import { AvatarModule } from 'primeng/avatar';





@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent
  ],
  imports: [CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    TableModule,
    CarouselModule, MenubarModule,MegaMenuModule,PasswordModule,FormsModule,MenuModule,
    SplitButtonModule,CardModule,MessagesModule,ToastModule,OrderListModule,
    TabViewModule,GalleriaModule,ProgressSpinnerModule,FileUploadModule,AvatarModule
    
    

  ],
  providers: [MessageService,{provide:HTTP_INTERCEPTORS,useClass:ErrorsInterceptor,multi: true},
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
