import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpComponent } from './components/help/help.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { StudentSingUpComponent } from './components/student-sing-up/student-sing-up.component';
import { StudentsPrivateComponent } from './components/students-private/students-private.component';
import { TeacherDetailNavbarComponent } from './components/teacher-detail-navbar/teacher-detail-navbar.component';
import { TeacherDetailsComponent } from './components/teacher-details/teacher-details.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { TeacherPrivateComponent } from './components/teacher-private/teacher-private.component';
import { TeacherSingUpComponent } from './components/teacher-sing-up/teacher-sing-up.component';

const routes: Routes = [
  //rutas estudiantes
  { path: '', component: LandingPageComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'form/students', component: StudentSingUpComponent },
  { path: 'profile/students', component: StudentsPrivateComponent },
  //rutas teachers
  { path: 'form/teacher', component: TeacherSingUpComponent },
  { path: 'list/teacher', component: TeacherListComponent },
  { path: 'profile/teacher', component: TeacherDetailNavbarComponent , 
  children: [
    {path:'profile/:teacherId', component:TeacherPrivateComponent}
      ]
  },
  { path: 'teacher/:teacherId', component: TeacherDetailsComponent},
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
