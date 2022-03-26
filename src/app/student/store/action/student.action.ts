import { Student } from '../../model/student';

export class ListAllStudents {
  static readonly type = '[studentState] ListAllStudents';
  constructor(public readonly payload?: string) {}
}
export class GetStudentByIDStudent {
  static readonly type = '[studentState] GetStudentByIDStudent';
  constructor(public readonly payload: string) {}
}

export class CreateStudent {
  static readonly type = '[studentState] CreateStudent';
  constructor(public readonly payload: Student) {}
}

export class UpdateStudent {
  static readonly type = '[studentState] UpdateStudent';
  constructor(public readonly payload: Student) {}
}

export class DeleteStudent {
  static readonly type = '[studentState] DeleteStudent';
  constructor(public readonly payload: string) {}
}
