import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AuthGuardService } from './service/auth/auth-guard.service';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [

  //route to logincomponenet
  { path: "login", component: LoginComponent },
  { path: "feedback", component: FeedbackComponent },


 {
    path: "admin", component: AdminComponent,
    canActivate: [AuthGuardService]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
