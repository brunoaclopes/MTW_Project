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
  year: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})

export class ClassListComponent implements AfterViewInit {
  displayedColumns: string[] = ['code', 'name', 'course', 'year', 'actions'];
  courses = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    this.getData();
    this.courses.paginator = this.paginator;
  }

  public getData() {
    this.http.get<any[]>('http://localhost:8090/api/classes')
      .subscribe(data => {
          console.log(data.length);
          for(let i = 0; i<data.length; i++){

            let todoModel: PeriodicElement = {code: data[i].Id, name: data[i].turma, course: data[i].curso, year: data[i].Anos}

            this.courses.data.push(todoModel);
            this.paginator._changePageSize(this.paginator.pageSize);
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
