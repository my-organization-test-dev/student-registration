import { StudentFacadeService } from './../../facade/student-facade-services';
import { Component, OnInit } from '@angular/core';
import { StudentApiService } from '../../api/api.service';
import { Student } from '../../model/student';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss'],
})
export class NewStudentComponent implements OnInit {
  constructor(private readonly facade: StudentFacadeService) {}

  ngOnInit(): void {}

  onCreate(data: any): void {
    this.facade.addStudent(data);
  }
}
