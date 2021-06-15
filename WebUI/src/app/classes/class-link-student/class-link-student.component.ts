import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

interface List {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-class-link-student',
  templateUrl: './class-link-student.component.html',
  styleUrls: ['./class-link-student.component.scss']
})
export class ClassLinkStudentComponent implements OnInit{
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router) { }

  students: List[] = [];
  form = new StudentClass(0, 0);

  onAddStudent(){
    let id = this.route.snapshot.paramMap.get('id');

    this.form.ClassId = Number(id);

    this.http.post<StudentClass>("http://localhost:8090/api/studentClass", this.form).subscribe(value => {console.log(value)});

    this.router.navigate(['/class'])
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

class StudentClass{
  public ClassId: number;
  public StudentId!: number;
  constructor(ClassId: number, StudentId: number) {
    this.ClassId = ClassId;
    this.StudentId = StudentId;
  }
}

