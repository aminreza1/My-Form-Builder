import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateFormComponent } from './forms/create-form/create-form.component';
import { FormsComponent } from './forms/forms.component';
import { PreviewFormComponent } from './forms/preview-form/preview-form.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'forms',component:FormsComponent},
  {path:'forms/create',component:CreateFormComponent},
  {path:'forms/preview/:index',component:PreviewFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
