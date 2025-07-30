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
    },
    {
        path: 'posts',
        loadComponent: () => import('./features/feed/feed-board/feed-board').then(c => c.FeedBoard)
    }, {
        path: 'posts/:id',
        loadComponent: () => import('./features/posts/details/details').then(c => c.Details)
    }
];