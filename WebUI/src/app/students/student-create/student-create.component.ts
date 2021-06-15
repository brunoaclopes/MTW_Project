import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss'],
  providers: [DatePipe]
})
export class StudentCreateComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private datepipe: DatePipe) { }

  form = new Student();

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    if(id == null) return;

    this.http.get<any[]>('http://localhost:8090/api/student/' + id)
      .subscribe(data => {
          this.form.Nome = data[0].Nome;
          this.form.DataNascimento = this.datepipe.transform(new Date(data[0].DataNascimento), 'yyyy-MM-dd');
        },
        error => {
          console.log("error");
        }
      );
  }

  onPost(){
    let id = this.route.snapshot.paramMap.get('id');

    if(id == null){
      this.http.post<Student>("http://localhost:8090/api/student", this.form).subscribe((value) => {console.log(value)});
    }
    else{
      console.log(this.form)
      this.http.put<Student>("http://localhost:8090/api/student/" + id, this.form).subscribe(value => {console.log(value)});
    }

    this.router.navigate(['/students'])
  }

}
class Student{
  public Nome!: string;
  public DataNascimento!: string | null
  constructor() { }
}
