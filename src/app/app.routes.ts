import { Routes } from '@angular/router';
import { ListComponent } from './payslip/list/list.component';
import { EditComponent } from './payslip/edit/edit.component';
import { CreateComponent } from './payslip/create/create.component';
import { ViewComponent } from './payslip/view/view.component';

export const routes: Routes = [
  {
    path: 'payslip',
    children: [
      { path: 'list', component: ListComponent },
      { path: 'edit', component: EditComponent },
      { path: 'create', component: CreateComponent },
      { path: 'view', component: ViewComponent },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'payslip/list',
  },
];
