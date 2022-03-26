import { StudentFormComponent } from './student/components/student-form/student-form.component';
import { StudentDetailComponent } from './student/pages/student-detail/student-detail.component';
import { StudentListComponent } from './student/pages/student-list/student-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './sheard/header/header.component';
import { NewStudentComponent } from './student/container/new-student/new-student.component';
import { PageNotFoundComponent } from './sheard/component/page-not-found/page-not-found.component';
import { AuthGuard } from './sheard/auth/auth.guard';
import { LoginFormComponent } from './login/login-form/login-form.component';

const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'students',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: StudentListComponent,
        children: [
          {
            path: 'detail/:id',
            component: StudentDetailComponent,
          },
          {
            path: 'new',
            component: NewStudentComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
