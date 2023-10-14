import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Student } from '../interfaces/student';
import { Subject } from '../interfaces/subject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AcademicService {
  private apiUrlStudent = `${environment.apiUrl}/Student`;
  private apiUrlSubject = `${environment.apiUrl}/Subject`;
  private apiUrlEnroll = `${environment.apiUrl}/Enroll`;

  constructor(private _http: HttpClient) {}


  // Students
  getAllStudents(){
    return this._http.get<Student[]>(`${this.apiUrlStudent}`);
  }

  getStudentById(id: number){
    return this._http.get<Student>(`${this.apiUrlStudent}/${id}`);
  }

  createStudent(student: Student){
    return this._http.post<Student>(`${this.apiUrlStudent}`, student);
  }

  updateStudent(id: number, student: Student){
    return this._http.put<Student>(`${this.apiUrlStudent}/${id}`, student)
  }

  deleteStudent(id: number){
    return this._http.delete<Student>(`${this.apiUrlStudent}/${id}`);
  }


  //Subject 
  getAllSubject(){
    return this._http.get<Subject[]>(`${this.apiUrlSubject}`)
  }

  getSubjectById(id: number){
    return this._http.get<Subject>(`${this.apiUrlSubject}/${id}`)
  }

  createSubject(subject: Subject){
    return this._http.post<Subject>(`${this.apiUrlSubject}`, subject)
  }

  updateSubject(id: number, subject: Subject){
    return this._http.put<Subject>(`${this.apiUrlSubject}/${id}`, subject)
  }

  deleteSubject(id: number){
    return this._http.delete<Subject>(`${this.apiUrlSubject}/${id}`)
  }

  //Enrroll

  enrollStudentInSubject(studentId: number, subjectId: number): Observable<boolean> {
    return this._http.post<boolean>(`${this.apiUrlEnroll}/Enroll`, { studentId, subjectId });
  }

  cancelStudentEnrollmentInSubject(studentId: number, subjectId: number): Observable<boolean> {
    return this._http.post<boolean>(`${this.apiUrlSubject}/CancelStudentEnrollmentInSubject`, { studentId, subjectId });
  }

  getSubjectsByStudent(studentId: number) {
    return this._http.get<Subject[]>(`${this.apiUrlEnroll}/GetSubjectsByStudent?studentId=${studentId}`);
  }
  
}
