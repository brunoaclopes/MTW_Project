import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

interface List {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-subject-create',
  templateUrl: './subject-create.component.html',
  styleUrls: ['./subject-create.component.scss']
})
export class SubjectCreateComponent implements OnInit{

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router) { }

  courses: List[] = [];
  form = new Subject();

  onAddSubject(){
    let id = this.route.snapshot.paramMap.get('id');
    if(id===null)
      this.http.post<Subject>("http://localhost:8090/api/subject", this.form).subscribe(value => {console.log(value)});
    else{
      this.http.put<Subject>("http://localhost:8090/api/subject/" + id, this.form).subscribe(value => {console.log(value)})
    }
    this.router.navigate(['/subjects']);
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

    if(id!==null){
      this.http.get<any[]>('http://localhost:8090/api/subject/' + id)
        .subscribe(data => {
            for(let i = 0; i<data.length; i++){
              console.log(data);
              this.form.CourseId = data[0].CursoId;
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

class Subject{
  public Nome!: string;
  public CourseId!: number;
  constructor() { }
}
