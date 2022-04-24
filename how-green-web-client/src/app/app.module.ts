import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplianceAddComponent } from './components/appliance/appliance-add/appliance-add.component';
import { ProjectAddComponent } from './components/project/project-add/project-add.component';
import { ProjectAppliancesComponent } from './components/project/project-appliances/project-appliances.component';
import { ProjectDetailsComponent } from './components/project/project-details/project-details.component';
import { ProjectsListComponent } from './components/project/project-list/project-list.component';
import { CoreModule } from './core/core.module';
import { EnergyEfficiencyClassColorPipe } from './shared/pipes/energy-efficiency-class-color.pipe';
import { EnergyEfficiencyClassPipe } from './shared/pipes/energy-efficiency-class.pipe';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    NgbAlertModule

  ],
  declarations: [
    AppComponent,
    ProjectAddComponent,
    ProjectDetailsComponent,
    ProjectsListComponent,
    ProjectAppliancesComponent,
    ApplianceAddComponent,
    EnergyEfficiencyClassPipe,
    EnergyEfficiencyClassColorPipe,
  ],
  providers: [
    EnergyEfficiencyClassPipe,
    EnergyEfficiencyClassColorPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
