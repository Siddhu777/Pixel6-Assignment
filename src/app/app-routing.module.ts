import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './gurads/auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'register', component:RegisterComponent} ,
 {path:'',redirectTo: '/register', pathMatch: 'full' },
 {path: 'home', canActivate: [AuthGuard],
  loadChildren: () => import('./Home/home/home.module').then((m) =>m.HomeModule)}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
