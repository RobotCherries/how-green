import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppliance } from 'src/app/shared/interfaces/appliance.interface';
import { environment } from 'src/environments/environment';

const apiBaseUrl: string = `${environment.apiEndpoint}/projects`;

@Injectable({
  providedIn: 'root'
})
export class ApplianceService {

  constructor(private httpClient: HttpClient) { }

  create(projectId: number, data: IAppliance): Observable<any> {
    return this.httpClient.post(`${apiBaseUrl}/${projectId}/appliances`, data);
  }

  getAll(projectId: number): Observable<any> {
    return this.httpClient.get(`${apiBaseUrl}/${projectId}/appliances`);
  }

  getOne(projectId: number, id: number): Observable<any> {
    return this.httpClient.get(`${apiBaseUrl}/${projectId}/appliances/${id}`);
  }

  update(projectId: number, id: number, data): Observable<any> {
    return this.httpClient.put(`${apiBaseUrl}/${projectId}/appliances/${id}`, data);
  }

  delete(projectId: number, id: number): Observable<any> {
    return this.httpClient.delete(`${apiBaseUrl}/${projectId}/appliances/${id}`);
  }

}
