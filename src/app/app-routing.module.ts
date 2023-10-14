import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicHomeComponent } from './modules/academic-home/academic-home.component';
import { CreateStudentComponent } from './modules/components/create-student/create-student.component';
import { CreateSubjectComponent } from './modules/components/create-subject/create-subject.component';
import { SubjectsListComponent } from './modules/components/subjects-list/subjects-list.component';
import { AssignSubjectComponent } from './modules/components/assign-subject/assign-subject.component';

const routes: Routes = [
  { path: '', component: AcademicHomeComponent },
  { path: 'create-student', component: CreateStudentComponent },
  { path: 'edit-student/:id', component: CreateStudentComponent },

  { path: 'subjects-list', component: SubjectsListComponent },
  { path: 'create-subject', component: CreateSubjectComponent },
  { path: 'edit-subject/:id', component: CreateSubjectComponent },

  { path: 'assing-subject', component: AssignSubjectComponent },

  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}