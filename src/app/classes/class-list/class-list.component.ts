import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogComponent} from "../../dialog/dialog.component";

export interface PeriodicElement {
  name: string;
  code: number;
  course: string;
  year: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {code: 1, name: 'Hydrogen', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 2, name: 'Helium', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 3, name: 'Lithium', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 4, name: 'Beryllium', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 5, name: 'Boron', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 6, name: 'Carbon', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 7, name: 'Nitrogen', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 8, name: 'Oxygen', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 9, name: 'Fluorine', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 10, name: 'Neon', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 11, name: 'Hydrogen2', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 12, name: 'Helium2', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 13, name: 'Lithium2', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 14, name: 'Beryllium2', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 15, name: 'Boron2', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 16, name: 'Carbon2', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 17, name: 'Nitrogen2', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 18, name: 'Oxygen2', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 19, name: 'Fluorine2', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
  {code: 20, name: 'Neon2', course: 'Licenciatura em Engenharia de Sistemas Informaticos', year: '2020/2021'},
];

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})

export class ClassListComponent implements AfterViewInit {
  displayedColumns: string[] = ['code', 'name', 'course', 'year', 'actions'];
  courses = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    this.courses.paginator = this.paginator;
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
