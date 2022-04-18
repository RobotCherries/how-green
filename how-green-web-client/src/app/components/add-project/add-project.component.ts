import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'hg-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  project = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(
    private router: Router,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
  }

  saveProject(): void {
    const data = {
      title: this.project.title,
      description: this.project.description
    };

    this.projectService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  getUserId(): any {
    // return this
  }

  newProject(): void {
    this.submitted = false;
    this.project = {
      title: '',
      description: '',
      published: false
    };
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}
