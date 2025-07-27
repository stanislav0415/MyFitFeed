import { Routes } from '@angular/router';


export const routes: Routes = [
 {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(c => c.Home)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then(c => c.Register)
    },
     {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(c => c.Login)
    }, {
        path: 'create',
        loadComponent: () => import('./features/posts/create/create').then(c => c.Create)
    }
];