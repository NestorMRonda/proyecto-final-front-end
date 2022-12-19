import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { HelpComponent } from './components/help/help.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { StudentDetailEditprofileComponent } from './components/student-detail-editprofile/student-detail-editprofile.component';
import { StudentDetailNavbarComponent } from './components/student-detail-navbar/student-detail-navbar.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentOpinionComponent } from './components/student-opinion/student-opinion.component';
import { StudentSingUpComponent } from './components/student-sing-up/student-sing-up.component';
import { StudentsPrivateComponent } from './components/students-private/students-private.component';
import { TeacherDetailEditprofileComponent } from './components/teacher-detail-editprofile/teacher-detail-editprofile.component';
import { TeacherDetailNavbarComponent } from './components/teacher-detail-navbar/teacher-detail-navbar.component';
import { TeacherDetailsComponent } from './components/teacher-details/teacher-details.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { TeacherRequestComponent } from './components/teacher-request/teacher-request.component';
import { TeacherSingUpComponent } from './components/teacher-sing-up/teacher-sing-up.component';
import { LoginGuard } from './guards/login.guard';
import { TypeGuard } from './guards/type.guard';

const routes: Routes = [
  //rutas estudiantes
  { path: '', component: LandingPageComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [LoginGuard, TypeGuard], data: { type: 'admin' } },
  { path: 'login', component: LoginComponent, },
  { path: 'form/students', component: StudentSingUpComponent },
  {
    path: 'profile/students', component: StudentDetailNavbarComponent, canActivate: [LoginGuard, TypeGuard], data: { type: 'user' },
    children: [
      { path: 'profile/:studentId', component: StudentDetailComponent, canActivate: [LoginGuard, TypeGuard], data: { type: 'user' } },
      { path: 'edit', component: StudentDetailEditprofileComponent, canActivate: [LoginGuard, TypeGuard], data: { type: 'user' } }
    ]
  },
  //rutas teachers
  { path: 'form/teacher', component: TeacherSingUpComponent },
  { path: 'list/teacher', component: TeacherListComponent },
  {
    path: 'profile/teacher', component: TeacherDetailNavbarComponent, canActivate: [LoginGuard],
    children: [
      { path: 'profile/:teacherId', component: TeacherDetailsComponent, canActivate: [LoginGuard] },
      { path: 'edit', component: TeacherDetailEditprofileComponent, canActivate: [LoginGuard, TypeGuard], data: { type: 'teacher' } },
      { path: 'request', component: TeacherRequestComponent, canActivate: [LoginGuard, TypeGuard], data: { type: 'teacher' } }
    ]
  },
  { path: 'teacher/:teacherId', component: TeacherDetailsComponent },
  { path: 'help', component: HelpComponent },
  { path: 'opinion', component: StudentOpinionComponent, canActivate: [LoginGuard, TypeGuard], data: { type: 'user' } },
  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
