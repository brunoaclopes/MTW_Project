import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-class-create',
  templateUrl: './class-create.component.html',
  styleUrls: ['./class-create.component.scss']
})
export class ClassCreateComponent {
  @Input() datasource!: any[];
  @Input() label!: string;
  @Input() labelKey!: string;
  @Input() value!: any;
  @Input() valueKey!: string;

  constructor(private router: Router) { }

  onAddClass(){

    this.router.navigate(['/course'])
  }

}
