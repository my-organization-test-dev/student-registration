import { DeleteStudent } from './../../store/action/student.action';
import { StudentFacadeService } from './../../facade/student-facade-services';
import { StudentApiService } from './../../api/api.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../model/student';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent implements OnInit {
  student$ = this.facade.selectedStudent$;
  constructor(
    private readonly facade: StudentFacadeService,
    private readonly activatedRout: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRout.paramMap.subscribe((params) => {
      this.facade.getStudentById(params.get('id'));
    });
  }
  onUpdate(data: Student): void {
    this.facade.updateStudent(data);
  }
  onDelete(id: string): void {
    this.facade.deleteStudent(id);
  }
}
