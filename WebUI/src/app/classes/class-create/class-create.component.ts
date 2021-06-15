import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {subscribeOn} from "rxjs/operators";

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

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router) { }

  courses: List[] = [];
  years: List[] = [];
  form = new Class('', 0, 0);

  onAddClass(){
    let id = this.route.snapshot.paramMap.get('id');
    if(id===null)
      this.http.post<Class>("http://localhost:8090/api/class", this.form).subscribe(value => {console.log(value)});
    else{
      this.http.put<Class>("http://localhost:8090/api/class/" + id, this.form).subscribe(value => {console.log(value)})
    }
      this.router.navigate(['/class'])
  }



  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

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

    if(id!==null){
      this.http.get<any[]>('http://localhost:8090/api/class/' + id)
        .subscribe(data => {
            for(let i = 0; i<data.length; i++){
              console.log(data);
              this.form.CourseId = data[0].CursoId;
              this.form.YearId = data[0].AnoLetivoId;
              this.form.Nome = data[0].Nome;
            }
          },
          error => {
            console.log("error");
          }
        );
    }
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
