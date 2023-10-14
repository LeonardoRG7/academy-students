import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/core/interfaces/subject';
import { AcademicService } from 'src/app/core/services/academic.service';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss'],
})
export class CreateSubjectComponent implements OnInit {
  subjectForm: FormGroup;
  nombreTitulo = 'Registrar Materia';
  id: number | null;
  subjects: Subject[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _academyService: AcademicService,
    private aRouter: ActivatedRoute
  ) {
    this.subjectForm = this.fb.group({
      name: ['', Validators.required],
      teacher: ['', Validators.required],
    });

    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this._academyService.getAllSubject().subscribe((res) => {
      this.subjects = res;

      if (this.subjects.length === 8) {
        this.router.navigate(['']);
      }
    });

    this.isUpdate();
  }

  addSubject() {
    const SUBJECT: Subject = {
      name: this.subjectForm.get('name')?.value,
      teacher: this.subjectForm.get('teacher')?.value,
    };

    if (this.id !== null) {
      this.updateSubject(SUBJECT);
    } else {
      this.createSubject(SUBJECT);
    }
  }

  private createSubject(subject: Subject) {
    this._academyService.createSubject(subject).subscribe(
      (res) => {
        console.log('Materia creada:', res);
        this.redirectToSubjects();
      },
      (error) => {
        console.error('Error al crear la materia:', error);
      }
    );
  }

  private updateSubject(subject: Subject) {
    this._academyService.updateSubject(this.id as number, subject).subscribe(
      (res) => {
        console.log('Materia actualizada:', res);
        this.redirectToSubjects();
      },
      (error) => {
        console.error('Error al actualizar la materia:', error);
      }
    );
  }

  private redirectToSubjects() {
    this.router.navigate(['/subjects-list']);
  }

  isUpdate() {
    if (this.id !== null) {
      this.nombreTitulo = 'Editar Materia';
      this._academyService.getSubjectById(this.id).subscribe((data) => {
        if (data && data.name && data.teacher) {
          this.subjectForm.patchValue({
            name: data.name,
            teacher: data.teacher,
          });
        }
      });
    }
  }
}
