import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

interface List {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-grade-create',
  templateUrl: './grade-create.component.html',
  styleUrls: ['./grade-create.component.scss']
})
export class GradeCreateComponent implements OnInit{

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router) { }

  form = new Nota();
  students: List[] = [];

  onAddGrade(){
    let id = this.route.snapshot.paramMap.get('id');

    this.http.post<Nota>("http://localhost:8090/api/studentEvaluation/" + id, this.form).subscribe(value => {console.log(value)});

    this.router.navigate(['/grades'])
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8090/api/students')
      .subscribe(data => {
          for(let i = 0; i<data.length; i++){
            let todoModel : List = {value: data[i].Id, viewValue: data[i].Nome}
            this.students.push(todoModel);
          }
        },
        error => {
          console.log("error");
        }
      );
  }


}
class Nota{
  public Nota!: number;
  public StudentId!: number;
  constructor() {  }
}
