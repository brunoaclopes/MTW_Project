import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogComponent} from "../../dialog/dialog.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface PeriodicElement {
  code:number;
  name: string;
  birthdate: string;
  course: string;
}

const ELEMENT_DATA: PeriodicElement[] = [

];

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})

export class StudentListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'birthdate', 'course', 'actions'];
  students = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    let ELEMENT_DATA: PeriodicElement[] = [];
    this.students = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.getData();
    this.students.paginator = this.paginator;
  }

  public getData() {
    this.http.get<any[]>('http://localhost:8090/api/students')
      .subscribe(data => {

          console.log(data);
          for(let i = 0; i<data.length; i++){

            let todoModel: PeriodicElement = {code: data[i].Id, name: data[i].Nome, birthdate: data[i].DataNascimento.substring(0,10), course: data[i].curso}

            this.students.data.push(todoModel);
            this.students.paginator = this.paginator;
          }
        },
        error => {
          console.log("error");
        }
      );
  }

  onRemove(){
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

  uploadListener($event: MouseEvent) {

  }
}
