import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})

export class CourseCreateComponent {

  constructor(private router: Router,
              private http: HttpClient) { }

  form = new Course('');

  onRemove(){
    //const headers = { 'content-type': 'application/json'}
    //const body=JSON.stringify(this.form);
    //console.log(body);
    this.http.post<Course>("http://localhost:8090/api/course", this.form).subscribe(value => {console.log(value)});

    this.router.navigate(['/course']);
  }


}

class Course{
  public Nome: string;
  constructor(Nome: string) {
    this.Nome = Nome;
  }
}

