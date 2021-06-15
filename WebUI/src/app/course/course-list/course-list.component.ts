import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogComponent} from "../../dialog/dialog.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface PeriodicElement {
  name: string;
  code: number;
}

let ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})

export class CourseListComponent implements AfterViewInit {
  displayedColumns: string[] = ['code', 'name', 'actions'];
  courses = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    let ELEMENT_DATA: PeriodicElement[] = [];
    this.courses = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.getData();
    this.courses.paginator = this.paginator;
  }

  public getData() {
    this.http.get<any[]>('http://localhost:8090/api/courses')
      .subscribe(data => {
          console.log(data.length);
          for(let i = 0; i<data.length; i++){

            let todoModel: PeriodicElement = {code: data[i].Id, name: data[i].Nome}

            this.courses.data.push(todoModel);
            this.courses.paginator = this.paginator;
          }

          console.log(this.courses.data);
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
