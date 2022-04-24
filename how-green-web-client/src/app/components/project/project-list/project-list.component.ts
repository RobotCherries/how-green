import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/services/auth/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { IProjectSearchCriteria } from 'src/app/shared/interfaces/project-search-criteria.interface';
import { IProject } from 'src/app/shared/interfaces/project.interface';

@Component({
  selector: 'hg-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects: IProject[] = [];
  project: IProject = null;
  currentIndex: number = -1;
  title: string = '';

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
        this.initCurrentProject();

      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  initCurrentProject(): void {
    if(this.projects?.length) {
      this.project = this.projects[0];
      this.currentIndex = 0;
      this.setActiveProject(this.project, this.currentIndex);
    }
  }

  setActiveProject(project, index): void {
    this.project = project;
    console.log(this.project, this.currentIndex);
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
