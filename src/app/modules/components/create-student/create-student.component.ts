import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/core/interfaces/student';
import { AcademicService } from 'src/app/core/services/academic.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent implements OnInit {
  studentForm: FormGroup;
  nombreTitulo = 'Registrar estudiante'; // nombre de nuestro titulo del container
  id: number | null;
  students: Student[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _academyService: AcademicService,
    private aRouter: ActivatedRoute
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      age: ['', Validators.required],
    });

    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this._academyService.getAllStudents().subscribe((res) => {
      this.students = res;

      if (this.students.length === 20) {
        this.router.navigate(['']);
      }
    });
    this.isUpdate();
  }

  addStudent() {
    const studentData: Student = this.studentForm.value;

    if (this.id) {
      this._academyService.updateStudent(this.id, studentData).subscribe(
        (data) => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.studentForm.reset();
        }
      );
    } else {
      this._academyService.createStudent(studentData).subscribe(
        (data) => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.studentForm.reset();
        }
      );
    }
  }

  isUpdate() {
    if (this.id) {
      this.nombreTitulo = 'Editar Estudiante';
      this._academyService.getStudentById(this.id).subscribe((data) => {
        if (data && data.firstName) {
          this.studentForm.patchValue({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            age: data.age,
          });
        }
      });
    }
  }
}
