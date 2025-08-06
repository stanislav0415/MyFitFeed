import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards';
import { NotFound } from './shared/components/not-found/not-found';
import { GuestGuard } from './core/guards';

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
        loadComponent: () => import('./features/auth/register/register').then(c => c.Register),
        canActivate: [GuestGuard],
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(c => c.Login),
        canActivate: [GuestGuard],
    }, {
        path: 'create',
        loadComponent: () => import('./features/posts/create/create').then(c => c.Create),
        canActivate: [AuthGuard],
    },
    {
        path: 'posts',
        loadComponent: () => import('./features/feed/feed-board/feed-board').then(c => c.FeedBoard)
    }, {
        path: 'posts/:id',
        loadComponent: () => import('./features/posts/details/details').then(c => c.Details)
    },{
        path: 'posts/:id/edit',
        loadComponent: () => import('./features/posts/edit/edit').then(c => c.Edit),
        canActivate: [AuthGuard],
    },
   {
        path: '**',
        component: NotFound
    }
];