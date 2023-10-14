import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/core/interfaces/student';
import { AcademicService } from 'src/app/core/services/academic.service';

@Component({
  selector: 'app-academic-home',
  templateUrl: './academic-home.component.html',
  styleUrls: ['./academic-home.component.scss'],
})
export class AcademicHomeComponent implements OnInit {
  public students: Student[] = [];
  public maxStudents = 20;
  public createStudentButton = true;

  constructor(private _academyService: AcademicService) {}

  ngOnInit() {
    this.getStudents();

    if (this.students.length >= this.maxStudents) {
      this.createStudentButton = false;
    }
  }

  getStudents() {
    this._academyService.getAllStudents().subscribe((res) => {
      this.students = res;
    });
  }

  deleteStudent(id: any) {
    this._academyService.deleteStudent(id).subscribe((res) => {
      this.getStudents();
    });
  }
}
