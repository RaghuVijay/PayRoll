import { Routes } from '@angular/router';
import { ListComponent } from './payslip/list/list.component';
import { EditComponent } from './payslip/edit/edit.component';
import { CreateComponent } from './payslip/create/create.component';
import { ViewComponent } from './payslip/view/view.component';
import { PayslipListResolver } from './payslip/list/list.resolver';
import { PayslipViewResolver } from './payslip/view/view.resolver';

export const routes: Routes = [
  {
    path: 'payslip',
    children: [
      { path: 'list', component: ListComponent,  
        resolve: {
        payslips: PayslipListResolver,
      },
     },
      { path: 'edit', component: EditComponent,
        resolve: {
          userPayslip: PayslipViewResolver
        }
       },
      { path: 'create', component: CreateComponent },
      { path: 'view', component: ViewComponent , 
        resolve: {
          userPayslip: PayslipViewResolver
        }
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'payslip/list',
  },
];
