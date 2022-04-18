import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { IProject } from 'src/app/shared/interfaces/project.interface';
import { AuthService } from './../../core/auth/services/auth/auth.service';
import { IProjectSearchCriteria } from './../../shared/interfaces/project-search-criteria.interface';

@Component({
  selector: 'hg-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects: IProject[] = [];
  currentProject = this.projects[0];
  currentIndex = 0;
  title = '';

  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.retrieveProjects();
  }

  retrieveProjects(): void {
    this.projectService.getAll(1).subscribe({
      next: (data) => {
        console.log('projects', data);
        this.projects = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  setActiveProject(project, index): void {
    this.currentProject = project;
    this.currentIndex = index;
  }

  searchTitle(): void {
    const searchCriteria: IProjectSearchCriteria = {
      userId: this.authService.userData.value.id,
      title: this.title
    }

    this.projectService.findBy(searchCriteria).subscribe({
      next: (data) => {
        this.projects = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
