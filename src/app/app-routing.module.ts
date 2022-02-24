import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertPage } from './pages/alerts';
import { DetectionsPage } from './pages/detections';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { NotFoundPage } from './pages/not-found';
import { NotificationsPage } from './pages/notifications';
import { RegisterPage } from './pages/register';
import { LoginGuard } from './services/login.guard';
import { components } from './components';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', component: HomePage, pathMatch: 'full', canActivate: [LoginGuard]},
  {path: 'notifications', component: NotificationsPage, canActivate: [LoginGuard]},
  {path: 'detections', component: DetectionsPage, canActivate: [LoginGuard]},
  {path: 'register', component: RegisterPage, canActivate: [LoginGuard]},
  {path: 'alert', component: AlertPage, canActivate: [LoginGuard]},
  {path: 'login', component: LoginPage},
  {path: '**', component: NotFoundPage, },
];

const pages = [
  HomePage,
  NotificationsPage,
  DetectionsPage,
  RegisterPage,
  AlertPage,
  LoginPage,
  NotFoundPage,
]

@NgModule({
  declarations: [
    ...components,
    ...pages,
  ],
  imports: [RouterModule.forRoot(routes), BrowserModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
