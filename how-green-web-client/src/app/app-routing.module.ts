import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplianceAddComponent } from './components/appliance/appliance-add/appliance-add.component';
import { ProjectAddComponent } from './components/project/project-add/project-add.component';
import { ProjectAppliancesComponent } from './components/project/project-appliances/project-appliances.component';
import { ProjectDetailsComponent } from './components/project/project-details/project-details.component';
import { ProjectsListComponent } from './components/project/project-list/project-list.component';
import { AuthGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectsListComponent, canActivate: [AuthGuard]  },
  { path: 'projects/:id', component: ProjectDetailsComponent, canActivate: [AuthGuard]  },
  { path: 'projects/:id/appliances', component: ProjectAppliancesComponent, canActivate: [AuthGuard]  },
  { path: 'projects/:id/appliances/add', component: ApplianceAddComponent, canActivate: [AuthGuard]  },
  { path: 'add', component: ProjectAddComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
