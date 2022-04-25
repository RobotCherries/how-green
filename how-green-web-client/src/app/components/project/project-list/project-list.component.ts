import { HttpErrorResponse } from '@angular/common/http';
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
    this.getAllProjects(this.getUserId());
  }

  private getUserId(): number {
    return this.authService.userData.value.id;
  }

  getAllProjects(id: number): void {
    this.projectService.getAll(id).subscribe({
      next: (data: IProject[]) => {
        console.log('projects', data);
        this.projects = data;
        this.getProjectScores();
        console.log(data);
        this.initCurrentProject();

      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getProjectScores(): void {
    this.projects.forEach((project: IProject) => {
      this.projectService.getScore(project.id).subscribe({
        next: (response: { projectScore: number }) => {
          project.score = response.projectScore;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.error.message);
        }
      });
    })
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
      userId: this.getUserId(),
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
