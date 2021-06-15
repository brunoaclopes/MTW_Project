import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogComponent} from "../../dialog/dialog.component";
import {animate, animation, state, style, transition, trigger} from '@angular/animations';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, ReplaySubject} from "rxjs";
import {DataSource} from "@angular/cdk/collections";

export interface PeriodicElement {
  name: string;
  code: number;
  subject: string;
}

let ELEMENT_DATA: PeriodicElement[] = [];

export interface StudentGrades {
  name: string;
  code: number;
  grade: string;
}

let STUDENT_DATA: StudentGrades[] = [];


@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./grade-list.component.scss']
})

export class GradeListComponent implements AfterViewInit {
  displayedColumns: string[] = ['code', 'name', 'subject', 'actions'];
  displayedStudentsColumns: string[] = ['name', 'grade', 'actions'];
  grades = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  students = new StudentDataSource(STUDENT_DATA);
  expandedGrade!: PeriodicElement | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    let ELEMENT_DATA: PeriodicElement[] = [];
    this.grades = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.getData();
    this.grades.paginator = this.paginator;
  }

  public getData() {

    this.http.get<any[]>('http://localhost:8090/api/evaluations')
      .subscribe(data => {
          console.log(data);
          for(let i = 0; i<data.length; i++){

            let todoModel: PeriodicElement = {code: data[i].Id, name: data[i].comp, subject: data[i].disciplina}

            this.grades.data.push(todoModel);
            this.grades.paginator = this.paginator;

          }
        },
        error => {
          console.log("error");
        }
      );
  }

  onStudents(){
    let finalModel: StudentGrades[] = [];
    this.students.setData(finalModel);
    this.http.get<any[]>('http://localhost:8090/api/studentsEvaluations')
      .subscribe(data => {
          console.log(data);
          for(let i = 0; i<data.length; i++){
            if(this.expandedGrade?.code === data[i].AvaliacaoId){
              let todoModel: StudentGrades = {code: data[i].AlunoId, name: data[i].Nome, grade: data[i].Nota};
              finalModel.push(todoModel);
              this.students.setData(finalModel);
            }
          }
        },
        error => {
          console.log("error");
        }
      );
  }

  onRemoveGrade(grade: number, student:number){
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{
        message: 'This Grade will be Deleted!'
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.http.delete("http://localhost:8090/api/studentEvaluation/"+student+"/"+grade).subscribe(
          (res) => {
            this.snackBar.open('Grade deleted with success!', 'Close', {
              duration: 2000,
            })
          },
          (err) => {
            this.snackBar.open('There was an error deleting the Grade!', 'Close', {
              duration: 2000,
            });
            console.error('There was an error!', err);
          }
        );
      }
      this.onStudents();
    });
  }

  onRemoveComponent(){
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{
        message: 'The Course was Deleted!'
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
        this.snackBar.open('Course deleted with success', 'Close', {
          duration: 2000,
        });
      }
    });
  }

}

class StudentDataSource extends DataSource<StudentGrades> {
  private _dataStream = new ReplaySubject<StudentGrades[]>();
  constructor(initialData: StudentGrades[]) {
    super();
    this.setData(initialData);
  }
  connect(): Observable<StudentGrades[]> {
    return this._dataStream;
  }
  disconnect() {}
  setData(data: StudentGrades[]) {
    this._dataStream.next(data);
  }
}
