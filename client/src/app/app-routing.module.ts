import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { ChatComponent } from './chat/chat.component'
import { ModuleWithProviders }  from '@angular/core';

export const routes: Routes = [
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: 'chat',
    component: ChatComponent
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
