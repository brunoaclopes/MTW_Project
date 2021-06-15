import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

interface List {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-class-create',
  templateUrl: './class-create.component.html',
  styleUrls: ['./class-create.component.scss']
})

export class ClassCreateComponent implements OnInit{

  constructor(private http: HttpClient,
              private router: Router) { }

  courses: List[] = [];
  years: List[] = [];
  form = new Class('', 0, 0);

  onAddClass(){
    console.log(this.form);

    this.http.post<Class>("http://localhost:8090/api/class", this.form).subscribe(value => {console.log(value)});

    this.router.navigate(['/class'])
  }



  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8090/api/courses')
      .subscribe(data => {
          for(let i = 0; i<data.length; i++){
            let todoModel : List = {value: data[i].Id, viewValue: data[i].Nome}
            this.courses.push(todoModel);
          }
        },
        error => {
          console.log("error");
        }
      );

    this.http.get<any[]>('http://localhost:8090/api/schoolYears')
      .subscribe(data => {
          for(let i = 0; i<data.length; i++){
            let todoModel : List = {value: data[i].Id, viewValue: data[i].Anos}
            this.years.push(todoModel);
          }
        },
        error => {
          console.log("error");
        }
      );
  }

}

class Class{
  public Nome: string;
  public CourseId!: number;
  public YearId!: number;
  constructor(Nome: string, CourseId: number, YearId: number) {
    this.Nome = Nome;
    this.CourseId = CourseId;
    this.YearId = YearId;
  }
}
