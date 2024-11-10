import { Routes } from '@angular/router';
import { IndexComponent } from './components/screens/index/index.component';
import { CreateClassComponent } from './components/screens/class/create-class/create-class.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'class/create', component: CreateClassComponent },
];
