import { StudentFacadeService } from './../../facade/student-facade-services';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StudentApiService } from '../../api/api.service';
import { Student } from '../../model/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  students$ = this.facade.students$;
  viewMode = 'list';
  constructor(
    private readonly facade: StudentFacadeService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.children.length > 0
      ? (this.viewMode = 'detail')
      : 'list';
  }

  ngOnInit(): void {
    this.facade.listAllStudent('');
  }
  onDelete(id: string): void {
    this.facade.deleteStudent(id);
  }
  onSearch(data): void {
    this.facade.listAllStudent(data);
  }
  onIndexChange(): void {}
  onPageSizeChange(): void {}
}
