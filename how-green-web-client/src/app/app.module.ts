import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplianceAddComponent } from './components/appliance/appliance-add/appliance-add.component';
import { ApplianceEditComponent } from './components/appliance/appliance-edit/appliance-edit.component';
import { ProjectAddComponent } from './components/project/project-add/project-add.component';
import { ProjectAppliancesComponent } from './components/project/project-appliances/project-appliances.component';
import { ProjectDetailsComponent } from './components/project/project-details/project-details.component';
import { ProjectsListComponent } from './components/project/project-list/project-list.component';
import { CoreModule } from './core/core.module';
import { EnergyClassColorPipe } from './shared/pipes/energy-class-color.pipe';
import { EnergyClassPipe } from './shared/pipes/energy-class.pipe';

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
    ApplianceEditComponent,

    // Pipes
    EnergyClassPipe,
    EnergyClassColorPipe,
  ],
  providers: [
    EnergyClassPipe,
    EnergyClassColorPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
