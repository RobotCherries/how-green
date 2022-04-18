import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProjectSearchCriteria } from '../shared/interfaces/project-search-criteria.interface';

const apiBaseUrl: string = `${environment.apiEndpoint}/projects/`;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }

  getAll(userId: number): Observable<any> {
    return this.httpClient.get(`${apiBaseUrl}?userId=${userId}`);
  }

  get(id): Observable<any> {
    return this.httpClient.get(`${apiBaseUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.httpClient.post(`${apiBaseUrl}/create`, data);
  }

  update(id, data): Observable<any> {
    return this.httpClient.put(`${apiBaseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete(`${apiBaseUrl}/${id}`);
  }

  findBy(criteria: IProjectSearchCriteria): Observable<any> {
    return this.httpClient.get(`${apiBaseUrl}?userId=${criteria.userId}&title=${criteria.title}`);
  }
}
