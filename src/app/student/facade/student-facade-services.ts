import { Injectable } from '@angular/core';

import { Store } from '@ngxs/store';
import { StudentApiService } from '../api/api.service';
import { Student } from '../model/student';
import {
  CreateStudent,
  GetStudentByIDStudent,
  ListAllStudents,
  UpdateStudent,
  DeleteStudent,
} from '../store/action/student.action';
import { StudentState } from '../store/state/student-state';

@Injectable({
  providedIn: 'root',
})
export class StudentFacadeService {
  itemsLoading$ = this.store.select(StudentState.itemsLoading);
  students$ = this.store.select(StudentState.students);
  selectedStudent$ = this.store.select(StudentState.selectedStudent);
  detailLoading$ = this.store.select(StudentState.detailLoading);
  creating$ = this.store.select(StudentState.creating);
  updating$ = this.store.select(StudentState.updating);
  deleting$ = this.store.select(StudentState.deleting);

  viewMode$ = this.store.select(StudentState.viewMode);

  constructor(private readonly store: Store) {}

  listAllStudent(searchQuery?: string): void {
    this.store.dispatch(new ListAllStudents(searchQuery));
  }

  getStudentById(id: string): void {
    this.store.dispatch(new GetStudentByIDStudent(id));
  }

  addStudent(student: Student): void {
    this.store.dispatch(new CreateStudent(student));
  }

  updateStudent(student: Student): void {
    this.store.dispatch(new UpdateStudent(student));
  }

  deleteStudent(id: string): void {
    this.store.dispatch(new DeleteStudent(id));
  }
}
