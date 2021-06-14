import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-grade-create',
  templateUrl: './grade-create.component.html',
  styleUrls: ['./grade-create.component.scss']
})
export class GradeCreateComponent {
  @Input() datasource!: any[];
  @Input() label!: string;
  @Input() labelKey!: string;
  @Input() value!: any;
  @Input() valueKey!: string;
  evalComponent: any; // Preencher com o componente de avaliacao selecionado

  constructor(private router: Router) { }

  onAddGrade(){

    this.router.navigate(['/grades'])
  }

}
