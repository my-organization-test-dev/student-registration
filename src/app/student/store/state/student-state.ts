import { Student } from './../../model/student';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StudentApiService } from '../../api/api.service';
import {
  CreateStudent,
  DeleteStudent,
  GetStudentByIDStudent,
  ListAllStudents,
  UpdateStudent,
} from '../action/student.action';

export interface StudentStateModel {
  students: Student[];
  selectedStudent: Student;
  detailLoading: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  itemsLoading: boolean;
  viewMode: string;
}
@State<StudentStateModel>({
  name: 'studentState',
  defaults: {
    students: [],
    selectedStudent: undefined,
    detailLoading: false,
    itemsLoading: false,
    creating: false,
    updating: false,
    deleting: false,
    viewMode: 'list',
  },
})
@Injectable()
export class StudentState {
  detailUrl = '/detail';
  Url = '/';
  viewMode = 'list';
  @Selector() public static students(state: StudentStateModel): Student[] {
    return state.students;
  }
  @Selector() public static itemsLoading(state: StudentStateModel): boolean {
    return state.itemsLoading;
  }
  @Selector() public static selectedStudent(state: StudentStateModel): Student {
    return state.selectedStudent;
  }
  @Selector() public static detailLoading(state: StudentStateModel): boolean {
    return state.detailLoading;
  }
  @Selector() public static creating(state: StudentStateModel): boolean {
    return state.creating;
  }
  @Selector() public static updating(state: StudentStateModel): boolean {
    return state.updating;
  }
  @Selector() public static deleting(state: StudentStateModel): boolean {
    return state.deleting;
  }
  @Selector() public static viewMode(state: StudentStateModel): string {
    return state.viewMode;
  }
  constructor(
    private readonly api: StudentApiService,
    private readonly router: Router,
    private readonly store: Store
  ) {}

  @Action(ListAllStudents) listAllStudents(
    { patchState, getState }: StateContext<StudentStateModel>,
    { payload }: ListAllStudents
  ): Observable<Student[]> {
    patchState({
      itemsLoading: true,
    });

    return this.api.listAllStudent(payload).pipe(
      tap((result: any) => {
        patchState({
          students: result,
          itemsLoading: false,
        });
      }),
      catchError((error) => of(patchState({ itemsLoading: false })))
    );
  }

  @Action(GetStudentByIDStudent) getStudentByIDStudent(
    { patchState }: StateContext<StudentStateModel>,
    { payload }: GetStudentByIDStudent
  ): Observable<Student | StudentStateModel> {
    patchState({
      detailLoading: true,
    });

    return this.api.getStudentById(payload).pipe(
      tap((item: Student) => {
        patchState({
          detailLoading: false,
          selectedStudent: item,
        });
      }),
      catchError((error) =>
        of(
          patchState({
            detailLoading: false,
          })
        )
      )
    );
  }
  @Action(CreateStudent) createStudent(
    { patchState, getState }: StateContext<StudentStateModel>,
    { payload }: CreateStudent
  ): Observable<Student | StudentStateModel> {
    patchState({
      creating: true,
    });

    return this.api.addStudent(payload).pipe(
      tap((item: Student) => {
        const result = [...getState().students, item];
        patchState({
          creating: false,
          selectedStudent: item,
          students: result,
        });

        alert('student add Successfully');
      }),
      catchError((error) =>
        of(
          patchState({
            creating: false,
          })
        )
      )
    );
  }
  @Action(DeleteStudent) deleteStudent(
    { patchState, dispatch, getState }: StateContext<StudentStateModel>,
    { payload }: DeleteStudent
  ): Observable<Student | StudentStateModel> {
    patchState({
      deleting: true,
    });

    return this.api.deleteStudent(payload).pipe(
      tap(() => {
        patchState({
          deleting: false,
          students: getState().students.filter((i) => i.id !== payload),
          viewMode: 'list',
        });

        alert('Student Deleted Successfully');
        // this.router.navigate(['/']);
      }),
      catchError((error) =>
        of(
          patchState({
            deleting: false,
          })
        )
      )
    );
  }

  @Action(UpdateStudent) UpdateStudent(
    { patchState, getState }: StateContext<StudentStateModel>,
    { payload }: UpdateStudent
  ): Observable<Student | StudentStateModel> {
    patchState({
      updating: true,
    });

    return this.api.updateStudent(payload).pipe(
      tap((item: Student) => {
        patchState({
          students: this.updateCollection(getState().students, item),
          updating: false,
          selectedStudent: item,
        });
        alert('Student Updated Successfully');
      }),
      catchError((error) =>
        of(
          patchState({
            updating: false,
          })
        )
      )
    );
  }

  updateCollection(items, apiResponse): any[] {
    return items.map((item) => {
      let result = item;
      if (item.id === apiResponse.id) {
        result = apiResponse;
      }

      return result;
    });
  }
}
