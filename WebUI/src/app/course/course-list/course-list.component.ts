import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogComponent} from "../../dialog/dialog.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

export interface PeriodicElement {
  name: string;
  code: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {code: 1, name: 'Hydrogen'},
  {code: 2, name: 'Helium'},
  {code: 3, name: 'Lithium'},
  {code: 4, name: 'Beryllium'},
  {code: 5, name: 'Boron'},
  {code: 6, name: 'Carbon'},
  {code: 7, name: 'Nitrogen'},
  {code: 8, name: 'Oxygen'},
  {code: 9, name: 'Fluorine'},
  {code: 10, name: 'Neon'},
  {code: 11, name: 'Hydrogen2'},
  {code: 12, name: 'Helium2'},
  {code: 13, name: 'Lithium2'},
  {code: 14, name: 'Beryllium2'},
  {code: 15, name: 'Boron2'},
  {code: 16, name: 'Carbon2'},
  {code: 17, name: 'Nitrogen2'},
  {code: 18, name: 'Oxygen2'},
  {code: 19, name: 'Fluorine2'},
  {code: 20, name: 'Neon2'},
];

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})

export class CourseListComponent implements AfterViewInit {
  displayedColumns: string[] = ['code', 'name', 'actions'];
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
