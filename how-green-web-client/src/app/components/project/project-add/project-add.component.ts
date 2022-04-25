import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { AuthService } from '../../../core/auth/services/auth/auth.service';

@Component({
  selector: 'hg-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css'],
})
export class ProjectAddComponent implements OnInit {
  project = {
    title: '',
    description: '',
    status: false,
    userId: this.getUserId(),
  };
  projectStatus: { type: string, message: string } = { type: '', message: '' };

  isFormSubmitted = false;

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.projectStatus.message = '';
    this.project.userId = this.getUserId();
  }

  private getUserId(): number {
    return this.authService.userData.value.id;
  }

  saveProject(): void {
    const data = {
      title: this.project.title,
      description: this.project.description,
      userId: this.project.userId
    };

    this.projectService.create(data).subscribe({
      next: (response) => {
        console.log(response);
        this.projectStatus.type = 'success';
        this.projectStatus.message = 'The project was created successfully!';
        this.isFormSubmitted = true;
        console.log('success');
      },
      error: (error) => {
        this.projectStatus.type = 'danger';
        this.projectStatus.message = error.error.message;
        console.log(error);
      },
    });
  }


  newProject(): void {
    this.isFormSubmitted = false;
    this.project = {
      title: '',
      description: '',
      status: false,
      userId: this.getUserId()
    };
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
