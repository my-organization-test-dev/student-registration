import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../model/student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit, OnChanges {
  @Input() selectedStudent: Student;
  @Input() viewMode: string;

  @Output() readonly create = new EventEmitter<Student>();
  @Output() readonly update = new EventEmitter<Student>();
  @Output() readonly delete = new EventEmitter<string>();
  studentForm: FormGroup;
  file: any;
  imageToUpload: any;
  imageUrl: string = '../../../../assets/images/user.png';
  submitted = false;
  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedStudent && this.selectedStudent) {
      this.studentForm.patchValue(this.selectedStudent);
    }
  }
  createForm() {
    this.studentForm = this.fb.group({
      id: [undefined],
      firstName: [undefined, [Validators.required]],
      lastName: [undefined, [Validators.required]],
      department: [undefined, [Validators.required]],
      address: this.fb.group({
        email: [undefined, [Validators.required, Validators.email]],
        phoneNumber: [undefined, [Validators.required]],
        city: [undefined, [Validators.required]],
        subCity: [undefined, [Validators.required]],
      }),
    });
  }

  get studentFormControls() {
    return this.studentForm.controls;
  }

  get studentFormAddressControls() {
    return this.studentForm.get('address') as FormArray;
  }
  onSave(): void {
    //! to upload student profile to the server use FormData  like below
    //! the concept is on the back-end save the photo in some folder on the server and save path to database
    // if (this.imageToUpload) {
    //   let formData = new FormData();
    //   formData.append('photo', this.imageToUpload);
    //   formData.append('photo', JSON.stringify(this.studentForm.value.firstName));
    //   formData.append('photo', JSON.stringify(this.studentForm.value.lastName));
    //   formData.append('photo', JSON.stringify(this.studentForm.value.department));
    //   formData.append('photo', JSON.stringify(this.studentForm.value.address));

    //   this.create.emit(formData)
    // }
    this.submitted = true;
    if (this.studentForm.valid) {
      this.create.emit(this.studentForm.value);
    }
  }
  onUpdate(): void {
    this.submitted = true;
    if (this.studentForm.valid) {
      this.update.emit(this.studentForm.value);
    }
  }
  onDelete(): void {
    if (confirm('are you sure to delete') == true) {
      this.delete.emit(this.selectedStudent.id);
    } else {
    }
  }
  handleInputImage(event: Event) {
    const target = event.target as HTMLInputElement;
    this.file = target.files;
    this.imageToUpload = this.file.item(0);
    console.log(this.imageToUpload);
    // show preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };

    reader.readAsDataURL(this.imageToUpload);
  }
}
