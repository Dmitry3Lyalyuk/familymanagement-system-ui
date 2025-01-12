import { Routes } from '@angular/router';
import { UserComponent } from './user/user-list/user.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';


export const routes: Routes = [
  {
      path: '', component: HomeComponent
  },
  {
      path: 'register', component: RegisterComponent
  },
  {
      path: 'login', component: LoginComponent
  },
  {
      path: 'user', component: UserComponent
  },
  {
    path: '**', redirectTo: 'users'
  },
];
