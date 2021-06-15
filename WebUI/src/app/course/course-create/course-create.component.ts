import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {PeriodicElement} from "../course-list/course-list.component";

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})

export class CourseCreateComponent implements OnInit{

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) { }

  form = new Course('');

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    if(id == null) return;

    this.http.get<any[]>('http://localhost:8090/api/course/' + id)
      .subscribe(data => {
          console.log(data[0].Nome);
          this.form.Nome = data[0].Nome;
        },
        error => {
          console.log("error");
        }
      );
  }

  onPost(){
    let id = this.route.snapshot.paramMap.get('id');

    if(id == null)
      this.http.post<Course>("http://localhost:8090/api/course", this.form).subscribe(value => {console.log(value)});
    else
      this.http.put<Course>("http://localhost:8090/api/course/" + id, this.form).subscribe(value => {console.log(value)});


    this.router.navigate(['/course']);
  }


}

class Course{
  public Nome: string;
  constructor(Nome: string) {
    this.Nome = Nome;
  }
}

