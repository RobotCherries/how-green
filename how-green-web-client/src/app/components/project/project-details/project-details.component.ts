import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { IAppliance } from 'src/app/shared/interfaces/appliance.interface';
import { IProject } from 'src/app/shared/interfaces/project.interface';

@Component({
  selector: 'hg-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  project: IProject = {
    title: '',
    description: '',
  };
  projectAppliances: IAppliance[];
  routeProjectId: number;
  projectStatus: { type: string, message: string } = { type: '', message: '' };
  isFormEditable: boolean = false;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.projectStatus.message = '';
    this.getRouteProjectId();
    this.getProject(this.routeProjectId);
    this.getProjectAppliances(this.routeProjectId);
    this.getProjectScore(this.routeProjectId);
  }

  getRouteProjectId(): void {
    this.routeProjectId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  private getUserId(): number {
    return this.authService.userData.value.id;
  }

  getProject(id): void {
    this.projectService.get(id).subscribe({
      next: (data) => {
        this.project = data;
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
      next: (response: any) => {
        this.project.score = response.projectScore;
      },
      error: (error) => {
        this.projectStatus.type = 'danger';
        this.projectStatus.message = error.error.message;
        console.log(error);
      },
    });;
  }

  updateProject(): void {
    const { title, description } = this.project;
    const editedProject = (({ title, description }) => ({ title, description }))(this.project);

    this.projectService.update(this.project.id, editedProject).subscribe({
      next: (response) => {
        console.log(response);
        this.projectStatus.type = 'success';
        this.projectStatus.message = 'The project was updated successfully!';
      },
      error: (error) => {
        this.projectStatus.type = 'danger';
        this.projectStatus.message = error.error.message;
      },
    });
  }

  deleteProject(): void {
    const confirmDelete = confirm('Are you sure you want to delete this project?');

    if (confirmDelete) {
      this.projectService.delete(this.project.id).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/projects']);
      },
      error: (error) => {
        this.projectStatus.type = 'danger';
        this.projectStatus.message = error.error.message;
        console.log(error);
      },
    });
}  }
}
