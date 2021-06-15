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
  form = new Evaluationnnnnn();

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

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

     if(id!==null){
       this.http.get<any[]>('http://localhost:8090/api/evaluation/' + id)
         .subscribe(data => {
             for(let i = 0; i<data.length; i++){
               console.log(data);
               this.form.Nome = data[0].Nome;
               this.form.EvaluationId = data[0].DisciplinaId;
             }
           },
           error => {
             console.log("error");
           }
         );
       console.log(this.form);
     }
  }

  onAddEvaluationComponent(){
    let id = this.route.snapshot.paramMap.get('id');

    console.log(this.form);
    console.log(id);

    if(id == null)
      this.http.post<Evaluationnnnnn>("http://localhost:8090/api/evaluation", this.form).subscribe(value => {console.log(value)});
    else
      this.http.put<Evaluationnnnnn>("http://localhost:8090/api/evaluation/" + id, this.form).subscribe(value => {console.log(value)});

    this.router.navigate(['/grades'])
  }

}

class Evaluationnnnnn{
  public Nome!: string;
  public EvaluationId!: number;
  constructor() {  }
}
