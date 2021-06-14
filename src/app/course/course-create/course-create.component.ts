import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent {

  constructor(private router: Router) { }

  onAddCourse(){

    this.router.navigate(['/course'])
  }

}
