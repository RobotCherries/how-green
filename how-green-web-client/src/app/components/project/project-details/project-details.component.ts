import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { IAppliance } from 'src/app/shared/interfaces/appliance.interface';
import { IProject } from 'src/app/shared/interfaces/project.interface';
import { ApplianceService } from './../../../services/appliance.service';

@Component({
  selector: 'hg-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit, AfterViewInit {
  project: IProject = {
    title: '',
    description: '',
  };
  originalProject: IProject;
  projectAppliances: IAppliance[];
  routeProjectId: number;
  projectStatus: { type: string; message: string } = { type: '', message: '' };
  isFormEditable: boolean = false;

  constructor(
    private projectService: ProjectService,
    private applianceService: ApplianceService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.projectStatus.message = '';
    this.getRouteProjectId();
    this.getProject(this.routeProjectId);
    this.getProjectAppliances(this.routeProjectId);
  }

  ngAfterViewInit(): void {
    this.getProjectScore(this.routeProjectId);
  }

  getRouteProjectId(): void {
    this.routeProjectId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  getProject(id: number): void {
    this.projectService.getOne(id).subscribe({
      next: (data) => {
        this.project = data;
        this.originalProject = data;
        console.log(data);
      },
      error: (error) => {
        this.projectStatus.type = 'danger';
        this.projectStatus.message = error.error.message;
        console.log(error);
      },
    });
  }

  getProjectAppliances(id: number): void {
    this.projectService.getAppliances(id).subscribe({
      next: (appliances: IAppliance[]) => {
        this.projectAppliances = appliances;
      },
      error: (error) => {
        this.projectStatus.type = 'danger';
        this.projectStatus.message = error.error.message;
        console.log(error);
      },
    });
  }

  getProjectScore(id: number): void {
    this.projectService.getScore(id).subscribe({
      next: (response: { projectScore: number }) => {
        console.log(response);
        this.project.score = response.projectScore;
      },
      error: (error: HttpErrorResponse) => {
        if (!error.error.message.includes('does not contain any appliances')) {
          this.projectStatus.type = 'error';
          this.projectStatus.message = error.error.message;
        }
      },
    });
  }

  updateProject(): void {
    const editedProject = (({ title, description }) => ({
      title,
      description,
    }))(this.project);

    this.projectService.update(this.project.id, editedProject).subscribe({
      next: (data: IProject) => {
        console.log(data);
        this.projectStatus.type = 'success';
        this.projectStatus.message = 'The project was updated successfully!';
        this.isFormEditable = false;
      },
      error: (error: HttpErrorResponse) => {
        this.projectStatus.type = 'danger';
        this.projectStatus.message = error.error.message;
      },
    });
  }

  initUpdate(): void {
    this.isFormEditable = true;
  }

  cancelUpdate(): void {
    this.project = this.originalProject;
    this.isFormEditable = false;
  }

  deleteProject(): void {
    const confirmDelete = confirm(
      "Are you sure you want to delete this project and all it's appliances? \nThis action cannot be undone."
    );

    if (confirmDelete) {
      this.projectService.delete(this.project.id).subscribe({
        next: (response: { message: string }) => {
          console.log(response);
          this.router.navigate(['/projects']);
        },
        error: (error: HttpErrorResponse) => {
          this.projectStatus.type = 'danger';
          this.projectStatus.message = error.error.message;
          console.log(error);
        },
      });
    }
  }

  handleApplianceDelete(id: number): void {
    console.log('delete id', id, this.routeProjectId);

    const confirmDelete = confirm(
      "Are you sure you want to delete this appliance? \nThis action cannot be undone."
    );

    if (confirmDelete) {
      this.applianceService.delete(this.routeProjectId, id).subscribe({
        next: (response: { message: string }) => {
          console.log(response);
          this.getProjectAppliances(this.routeProjectId);
        },
        error: (error: HttpErrorResponse) => {
          this.projectStatus.type = 'danger';
          this.projectStatus.message = error.error.message;
          console.log(error);
        },
      });
    }
  }
}
