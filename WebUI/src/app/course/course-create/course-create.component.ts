import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})

export class CourseCreateComponent {

  constructor(private router: Router,
              private http: HttpClient) { }

  onAddCourse(curso:Curso): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(curso);
    console.log(body)
    return this.http.post("http://localhost:8090/api/course", body,{'headers':headers})
  }

}
