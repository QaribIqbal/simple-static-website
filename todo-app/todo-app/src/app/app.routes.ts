import { Routes, RouterModule } from '@angular/router';
import { SavedTasksComponent } from './saved-tasks/saved-tasks.component';
import { NgModule } from '@angular/core';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AuthGuard } from './authguard/auth.guard';
import { LogoutComponent } from './Logout/logout/logout.component';
import {TodaytasksComponent} from './todaytasks/todaytasks.component'
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: "Savedtasks", canActivate: [AuthGuard],
        component: SavedTasksComponent
    },
    {
        path:"Home",canActivate:[AuthGuard],
        component:HomeComponent
    },
    {
        path: "Todaytasks",canActivate: [AuthGuard],
        component:TodaytasksComponent
    },
    {
        path: "Login",
        component: SigninFormComponent,
    },
    {
        path: "signup",
        component: SignupFormComponent,
    },
    {
        path: "LogOut",
        component: LogoutComponent
    },
    {
      path:"forgotpassword",
      component:ForgotpasswordComponent
    },
    {
        path: "**",
        component:SigninFormComponent
    },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
