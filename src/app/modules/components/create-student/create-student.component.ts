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
    const STUDENT: Student = {
      firstName: this.studentForm.get('firstName')?.value,
      lastName: this.studentForm.get('lastName')?.value,
      email: this.studentForm.get('email')?.value,
      age: this.studentForm.get('age')?.value,
    };

    if (this.id !== null) {
      this.createStudent(STUDENT);
    } else {
      this.updateStudent(STUDENT);
    }
  }

  private createStudent(student: Student) {
    this._academyService.createStudent(student).subscribe(
      (res) => {
        console.log('Estudiante creado:', res);
        this.redirectToStudents();
      },
      (error) => {
        console.error('Error al crear el estudiante:', error);
      }
    );
  }

  private updateStudent(student: Student) {
    this._academyService.updateStudent(this.id as number, student).subscribe(
      (res) => {
        console.log('Estudiante actualizado:', res);
        this.redirectToStudents();
      },
      (error) => {
        console.error('Error al actualizar el estudiante:', error);
      }
    );
  }

  private redirectToStudents() {
    this.router.navigate(['/']);
  }

  isUpdate() {
    if (this.id !== null) {
      this.nombreTitulo = 'Editar Estudiante';
      this._academyService.getStudentById(this.id).subscribe((data) => {
        if (data && data.firstName && data.lastName && data.email && data.age) {
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
