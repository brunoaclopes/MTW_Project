import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogComponent} from "../../dialog/dialog.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface PeriodicElement {
  name: string;
  code: number;
  course: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements AfterViewInit {
  displayedColumns: string[] = ['code', 'name', 'course', 'actions'];
  subjects = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    let ELEMENT_DATA: PeriodicElement[] = [];
    this.subjects = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.getData();
    this.subjects.paginator = this.paginator;
  }

  public getData() {
    this.http.get<any[]>('http://localhost:8090/api/subjects')
      .subscribe(data => {
          console.log(data.length);
          for(let i = 0; i<data.length; i++){

            let todoModel: PeriodicElement = {code: data[i].Id, name: data[i].disciplina, course: data[i].curso}

            this.subjects.data.push(todoModel);
            this.subjects.paginator = this.paginator;
          }

          console.log(this.subjects.data);
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

}
