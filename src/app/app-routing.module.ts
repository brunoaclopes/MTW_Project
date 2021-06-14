import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CourseListComponent} from "./course/course-list/course-list.component";
import {CourseCreateComponent} from "./course/course-create/course-create.component";
import {ClassListComponent} from "./classes/class-list/class-list.component";
import {StudentListComponent} from "./students/student-list/student-list.component";


const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'course', component: CourseListComponent},
  { path: 'newcourse', component: CourseCreateComponent},
  { path: 'class', component: ClassListComponent},
  { path: 'students', component: StudentListComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
