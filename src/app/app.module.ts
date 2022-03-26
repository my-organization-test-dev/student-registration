import { StudentState } from './student/store/state/student-state';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagingServicesComponent } from './sheard/services/messaging-services/messaging-services.component';
import { HeaderComponent } from './sheard/header/header.component';
import { StudentListComponent } from './student/pages/student-list/student-list.component';
import { StudentDetailComponent } from './student/pages/student-detail/student-detail.component';
import { StudentFormComponent } from './student/components/student-form/student-form.component';
import { NewStudentComponent } from './student/container/new-student/new-student.component';
import { StudentApiService } from './student/api/api.service';
import { PageNotFoundComponent } from './sheard/component/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { StudentFacadeService } from './student/facade/student-facade-services';
import { LoginFormComponent } from './login/login-form/login-form.component';
@NgModule({
  declarations: [
    AppComponent,
    MessagingServicesComponent,
    HeaderComponent,
    StudentListComponent,
    StudentDetailComponent,
    StudentFormComponent,
    NewStudentComponent,
    PageNotFoundComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxsModule.forRoot([StudentState]),
  ],
  providers: [StudentApiService, StudentFacadeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
