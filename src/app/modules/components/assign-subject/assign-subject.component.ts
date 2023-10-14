import { Component } from '@angular/core';
import { Student } from 'src/app/core/interfaces/student';
import { Subject } from 'src/app/core/interfaces/subject';
import { AcademicService } from 'src/app/core/services/academic.service';

@Component({
  selector: 'app-assign-subject',
  templateUrl: './assign-subject.component.html',
  styleUrls: ['./assign-subject.component.scss'],
})
export class AssignSubjectComponent {
  students: Student[] = [];
  subjects: Subject[] = [];
  selectedStudent: Student | any;
  selectedSubject: Subject | any;
  subjectByStudent: any;
  isStudent: string = ''

  constructor(private academicService: AcademicService) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadSubjects();
  }

  loadStudents() {
    this.academicService.getAllStudents().subscribe((students) => {
      this.students = students;
    });
  }

  loadSubjects() {
    this.academicService.getAllSubject().subscribe((subjects) => {
      this.subjects = subjects;
    });
  }

  assignSubjectToStudent() {
    if (this.selectedStudent && this.selectedSubject) {
      this.academicService
        .enrollStudentInSubject(
          this.selectedStudent.id,
          this.selectedSubject.id
        )
        .subscribe((result: boolean) => {
          if (result) {
            console.log('Materia asignada con éxito.');
          } else {
            console.log('Error al asignar la materia.');
          }
        });
    } else {
      console.log('Error: Debes seleccionar un estudiante y una materia.');
    }
  }


  getSubjectNames(subjects: any): string {
    return subjects.map((subject: any) => subject.name).join(', ');
  }
  
  showSubjectsForStudent(student: Student | any) {
    this.academicService.getSubjectsByStudent(student.id).subscribe((subjects) => {
      this.subjectByStudent = subjects
      this.selectedStudent = student.firstName
    })
  }
  
}
