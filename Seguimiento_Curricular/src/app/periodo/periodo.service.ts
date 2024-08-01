import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = this.getBaseUrl();
  }

  private getBaseUrl(): string {
    const hostname = window.location.hostname;
    if (hostname === 'localhost') {
      return 'http://localhost:8080/api/periodo';
    } else {
      // Asume que la IP de tu PC en la red local es 192.168.0.110
      return 'http://192.168.23.248:8080/api/periodo';
    }
  }

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
