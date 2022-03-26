import { studentEndPoint } from './student-endpoint';
import { Student } from './../model/student';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class StudentApiService {
  constructor(private readonly http: HttpClient) {}

  listAllStudent(searchQuery?: string): Observable<Student[]> {
    let request =
      searchQuery.length > 0
        ? `${studentEndPoint.list}?q=${searchQuery}`
        : `${studentEndPoint.list}`;
    return this.http.get<Student[]>(request).pipe(
      map((result: Student[]) => {
        return result;
      })
    );
  }

  getStudentById(id: string): Observable<Student> {
    return this.http.get(`${studentEndPoint.detail}/${id}`).pipe(
      map((result: Student) => {
        return result;
      })
    );
  }

  addStudent(data: Student): Observable<Student> {
    return this.http.post(`${studentEndPoint.update}`, data).pipe(
      map((result: Student) => {
        return result;
      })
    );
  }
  updateStudent(data: Student): Observable<Student> {
    return this.http.put(`${studentEndPoint.update}/${data.id}`, data).pipe(
      map((result: Student) => {
        return result;
      })
    );
  }

  deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${studentEndPoint.detail}/${id}`).pipe(
      map((result) => {
        return result;
      })
    );
  }
}
