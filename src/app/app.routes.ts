import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';

export const routes: Routes = [

    {
        path: 'menger', component: LoginComponent,
        children: [

        ]
    }

];
