import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  private baseUrl = 'http://localhost:8080/api/periodo';

  constructor(private http: HttpClient) {}

  getPeriodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createPeriodo(periodo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, periodo);
  }

  updatePeriodo(id: number, periodo: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, periodo);
  }

  deletePeriodo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
