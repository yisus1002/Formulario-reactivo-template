import { ReactiveComponent } from './pages/reactive/reactive.component';
import { TemplateComponent } from './pages/template/template.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'reactive', component: ReactiveComponent},
  {path:'template', component: TemplateComponent},
  {path:'', pathMatch: 'full', redirectTo: 'template'},
  {path:'**', pathMatch: 'full', redirectTo: 'reactive'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
