import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProjectSearchCriteria } from '../shared/interfaces/project-search-criteria.interface';

const apiBaseUrl: string = `${environment.apiEndpoint}/projects`;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }

  create(data): Observable<any> {
    return this.httpClient.post(`${apiBaseUrl}/`, data);
  }

  getAll(userId: number): Observable<any> {
    return this.httpClient.get(`${apiBaseUrl}?userId=${userId}`);
  }

  getOne(id: number): Observable<any> {
    return this.httpClient.get(`${apiBaseUrl}/${id}`);
  }

  getScore(id: number): Observable<any> {
    return this.httpClient.get(`${apiBaseUrl}/${id}/score`);
  }

  getAppliances(id: number): Observable<any> {
    return this.httpClient.get(`${apiBaseUrl}/${id}/appliances`);
  }

  update(id: number, data): Observable<any> {
    return this.httpClient.put(`${apiBaseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${apiBaseUrl}/${id}`);
  }

  findBy(criteria: IProjectSearchCriteria): Observable<any> {
    return this.httpClient.get(`${apiBaseUrl}?userId=${criteria.userId}&title=${criteria.title}`);
  }
}
