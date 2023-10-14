import { Component } from '@angular/core';
import { Subject } from 'src/app/core/interfaces/subject';
import { AcademicService } from 'src/app/core/services/academic.service';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss'],
})
export class SubjectsListComponent {
  public subjects: Subject[] = [];

  constructor(private _academyService: AcademicService) {}
  public maxSubjects = 8;
  public createSubjectButton = true;

  ngOnInit() {
    this.getSubjects();
  }

  getSubjects() {
    this._academyService.getAllSubject().subscribe((res) => {
      this.subjects = res;
    });

    if (this.subjects.length >= this.maxSubjects) {
      this.createSubjectButton = false;
    }
  }

  deleteSubject(id: any) {
    this._academyService.deleteSubject(id).subscribe((res) => {
      this.getSubjects();
    });
  }
}
