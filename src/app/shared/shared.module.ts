import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

 
@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],

  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],

  imports: [
    CommonModule,
    RouterModule
    //AppRoutingModule Tu eres el error  
  ]
})
export class SharedModule { }
