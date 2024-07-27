import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VinculacionService {

  private baseUrl = 'http://localhost:8080/api/vinculaciones';

  constructor(private http: HttpClient) {}

  vincular(periodoId: number, carreraIds: number[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/vincular`, { periodoId, carreraIds });
  }

  getPeriodos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/periodos`);
  }

  getCarreras(): Observable<any> {
    return this.http.get(`${this.baseUrl}/carreras`);
  }
}
