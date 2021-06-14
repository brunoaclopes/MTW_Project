import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-class-link-student',
  templateUrl: './class-link-student.component.html',
  styleUrls: ['./class-link-student.component.scss']
})
export class ClassLinkStudentComponent {
  @Input() datasource!: any[];
  @Input() label!: string;
  @Input() labelKey!: string;
  @Input() value!: any;
  @Input() valueKey!: string;
  class: any; // Preencher com a turma selecionada

  constructor(private router: Router) { }

  onAddStudent(){

    this.router.navigate(['/class'])
  }

}
