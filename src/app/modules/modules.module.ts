import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicHomeComponent } from './academic-home/academic-home.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { CreateSubjectComponent } from './components/create-subject/create-subject.component';
import { SubectsComponent } from './components/subects/subects.component';
import { SubjectsListComponent } from './components/subjects-list/subjects-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AssignSubjectComponent } from './components/assign-subject/assign-subject.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [BrowserModule, CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule, AppRoutingModule],
  declarations: [
    AcademicHomeComponent,
    CreateStudentComponent,
    CreateSubjectComponent,
    SubectsComponent,
    SubjectsListComponent,
    AssignSubjectComponent,
  ],
})
export class ModulesModule {}
