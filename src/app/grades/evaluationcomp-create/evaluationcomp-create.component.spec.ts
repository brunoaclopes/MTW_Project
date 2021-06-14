import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationcompCreateComponent } from './evaluationcomp-create.component';

describe('EvaluationcompCreateComponent', () => {
  let component: EvaluationcompCreateComponent;
  let fixture: ComponentFixture<EvaluationcompCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationcompCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationcompCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
