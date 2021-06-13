import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CourseListComponent} from "./course/course-list/course-list.component";


const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'course', component: CourseListComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
