import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-evaluationcomp-create',
  templateUrl: './evaluationcomp-create.component.html',
  styleUrls: ['./evaluationcomp-create.component.scss']
})
export class EvaluationcompCreateComponent {
  @Input() datasource!: any[];
  @Input() label!: string;
  @Input() labelKey!: string;
  @Input() value!: any;
  @Input() valueKey!: string;

  constructor(private router: Router) { }

  onAddEvaluationComponent(){

    this.router.navigate(['/grades'])
  }

}
