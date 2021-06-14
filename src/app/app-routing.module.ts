import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CourseListComponent} from "./course/course-list/course-list.component";
import {CourseCreateComponent} from "./course/course-create/course-create.component";
import {ClassListComponent} from "./classes/class-list/class-list.component";
import {StudentListComponent} from "./students/student-list/student-list.component";
import {GradeListComponent} from "./grades/grade-list/grade-list.component";
import {ClassCreateComponent} from "./classes/class-create/class-create.component";
import {StudentCreateComponent} from "./students/student-create/student-create.component";
import {GradeCreateComponent} from "./grades/grade-create/grade-create.component";
import {EvaluationcompCreateComponent} from "./grades/evaluationcomp-create/evaluationcomp-create.component";
import {ClassLinkStudentComponent} from "./classes/class-link-student/class-link-student.component";


const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'course', component: CourseListComponent},
  { path: 'newcourse', component: CourseCreateComponent},
  { path: 'class', component: ClassListComponent},
  { path: 'newclass', component: ClassCreateComponent},
  { path: 'newclass-student', component: ClassLinkStudentComponent},
  { path: 'students', component: StudentListComponent},
  { path: 'newstudent', component: StudentCreateComponent},
  { path: 'grades', component: GradeListComponent},
  { path: 'newgrade', component: GradeCreateComponent},
  { path: 'newcomponent', component: EvaluationcompCreateComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
