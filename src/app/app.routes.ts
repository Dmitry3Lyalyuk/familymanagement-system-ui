import { Routes } from '@angular/router';
import { UserComponent } from './user/user-list/user.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { FamilyListComponent } from './family/family-list/family-list.component';
import { authGuard } from './auth/auth.guard';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { ProfileComponent } from './core/profile-page/profile.component';
import { UserSettingsComponent } from './core/user-settings/user-settings.component';
import { UserHelpComponent } from './core/user-help/user-help.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'families',
    component: FamilyListComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'settings',
    component: UserSettingsComponent,
  },
  {
    path: 'help',
    component: UserHelpComponent,
  },
  {
    path: 'error',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

