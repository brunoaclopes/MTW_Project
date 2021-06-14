import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent {

  constructor(private router: Router) { }

  onAddStudent(){

    this.router.navigate(['/students'])
  }

}
