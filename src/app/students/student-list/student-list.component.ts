import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogComponent} from "../../dialog/dialog.component";

export interface PeriodicElement {
  name: string;
  birthdate: string;
  course: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {birthdate: '01/01/1900', name: 'Hydrogen', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Helium', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Lithium', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Beryllium', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Boron', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Carbon', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Nitrogen', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Oxygen', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Fluorine', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Neon', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Hydrogen2', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Helium2', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Lithium2', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Beryllium2', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Boron2', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Carbon2', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Nitrogen2', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Oxygen2', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Fluorine2', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
  {birthdate: '01/01/1900', name: 'Neon2', course: 'Licenciatura em Engenharia de Sistemas Informaticos'},
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

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    this.students.paginator = this.paginator;
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
