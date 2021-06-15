import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

interface List {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-evaluationcomp-create',
  templateUrl: './evaluationcomp-create.component.html',
  styleUrls: ['./evaluationcomp-create.component.scss']
})
export class EvaluationcompCreateComponent implements OnInit{

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router) { }

  subjects: List[] = [];
  form = new Evaluation('', 0);

  ngOnInit(): void {

    this.http.get<any[]>('http://localhost:8090/api/subjects')
      .subscribe(data => {
          for(let i = 0; i<data.length; i++){
            let todoModel : List = {value: data[i].Id, viewValue: data[i].Nome}
            this.subjects.push(todoModel);
          }
        },
        error => {
          console.log("error");
        }
      );

    // if(id!==null){
    //   this.http.get<any[]>('http://localhost:8090/api/class/' + id)
    //     .subscribe(data => {
    //         for(let i = 0; i<data.length; i++){
    //           console.log(data);
    //           this.form.CourseId = data[0].CursoId;
    //           this.form.YearId = data[0].AnoLetivoId;
    //           this.form.Nome = data[0].Nome;
    //         }
    //       },
    //       error => {
    //         console.log("error");
    //       }
    //     );
    // }
  }

  onAddEvaluationComponent(){

    this.router.navigate(['/grades'])
  }

}

class Evaluation{
  public Nome: string;
  public EvaluationId!: number;
  constructor(Nome: string, EvaluationId: number) {
    this.Nome = Nome;
    this.EvaluationId = EvaluationId;
  }
}
