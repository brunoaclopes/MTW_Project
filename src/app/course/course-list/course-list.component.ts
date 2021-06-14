import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogComponent} from "../../dialog/dialog.component";

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
];

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'actions'];
  courses = ELEMENT_DATA;

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
