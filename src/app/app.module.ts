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
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { StudentOpinionComponent } from './components/student-opinion/student-opinion.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { TeacherRequestComponent } from './components/teacher-request/teacher-request.component';
import { TeacherHasStudentsComponent } from './components/teacher-has-students/teacher-has-students.component';
import { StudentHasTeachersComponent } from './components/student-has-teachers/student-has-teachers.component';
import { MessagesComponent } from './components/messages/messages.component';


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
    AdminPanelComponent,
    StudentOpinionComponent,
    StudentDetailComponent,
    TeacherRequestComponent,
    TeacherHasStudentsComponent,
    StudentHasTeachersComponent,
    MessagesComponent,

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
