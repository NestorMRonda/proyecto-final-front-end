import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { StudentsPrivateComponent } from './components/students-private/students-private.component';
import { TeacherPrivateComponent } from './components/teacher-private/teacher-private.component';
import { StudentSingUpComponent } from './components/student-sing-up/student-sing-up.component';
import { TeacherSingUpComponent } from './components/teacher-sing-up/teacher-sing-up.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { TeacherDetailsComponent } from './components/teacher-details/teacher-details.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HelpComponent } from './components/help/help.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherDetailNavbarComponent } from './components/teacher-detail-navbar/teacher-detail-navbar.component';
import { TeacherDetailEditprofileComponent } from './components/teacher-detail-editprofile/teacher-detail-editprofile.component';
import { StudentDetailNavbarComponent } from './components/student-detail-navbar/student-detail-navbar.component';
import { StudentDetailEditprofileComponent } from './components/student-detail-editprofile/student-detail-editprofile.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentsPrivateComponent,
    TeacherPrivateComponent,
    StudentSingUpComponent,
    TeacherSingUpComponent,
    TeacherListComponent,
    TeacherDetailsComponent,
    LandingPageComponent,
    HelpComponent,
    TeacherDetailNavbarComponent,
    TeacherDetailEditprofileComponent,
    StudentDetailNavbarComponent,
    StudentDetailEditprofileComponent,
    MapaComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
