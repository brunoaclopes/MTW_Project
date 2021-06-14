import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogComponent} from "../../dialog/dialog.component";
import {animate, animation, state, style, transition, trigger} from '@angular/animations';

export interface PeriodicElement {
  name: string;
  code: number;
  subject: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {code: 1, name: 'Hydrogen', subject: 'Multimedia e Tecnologias Web'},
  {code: 2, name: 'Helium', subject: 'Multimedia e Tecnologias Web'},
  {code: 3, name: 'Lithium', subject: 'Multimedia e Tecnologias Web'},
  {code: 4, name: 'Beryllium', subject: 'Multimedia e Tecnologias Web'},
  {code: 5, name: 'Boron', subject: 'Multimedia e Tecnologias Web'},
  {code: 6, name: 'Carbon', subject: 'Multimedia e Tecnologias Web'},
  {code: 7, name: 'Nitrogen', subject: 'Multimedia e Tecnologias Web'},
  {code: 8, name: 'Oxygen', subject: 'Multimedia e Tecnologias Web'},
  {code: 9, name: 'Fluorine', subject: 'Multimedia e Tecnologias Web'},
  {code: 10, name: 'Neon', subject: 'Multimedia e Tecnologias Web'},
  {code: 11, name: 'Hydrogen2', subject: 'Multimedia e Tecnologias Web'},
  {code: 12, name: 'Helium2', subject: 'Multimedia e Tecnologias Web'},
  {code: 13, name: 'Lithium2', subject: 'Multimedia e Tecnologias Web'},
  {code: 14, name: 'Beryllium2', subject: 'Multimedia e Tecnologias Web'},
  {code: 15, name: 'Boron2', subject: 'Multimedia e Tecnologias Web'},
  {code: 16, name: 'Carbon2', subject: 'Multimedia e Tecnologias Web'},
  {code: 17, name: 'Nitrogen2', subject: 'Multimedia e Tecnologias Web'},
  {code: 18, name: 'Oxygen2', subject: 'Multimedia e Tecnologias Web'},
  {code: 19, name: 'Fluorine2', subject: 'Multimedia e Tecnologias Web'},
  {code: 20, name: 'Neon2', subject: 'Multimedia e Tecnologias Web'},
];

export interface StudentGrades {
  name: string;
  grade: string;
}

const STUDENT_DATA: StudentGrades[] = [
  {name: 'Hydrogen', grade: '20'},
  {name: 'Helium', grade: '20'},
  {name: 'Lithium', grade: '20'},
  {name: 'Beryllium', grade: '20'},
  {name: 'Boron', grade: '20'},
  {name: 'Carbon', grade: '20'},
  {name: 'Nitrogen', grade: '20'}
];


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
  students = new MatTableDataSource<StudentGrades>(STUDENT_DATA);
  expandedGrade!: PeriodicElement | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    this.grades.paginator = this.paginator;
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
