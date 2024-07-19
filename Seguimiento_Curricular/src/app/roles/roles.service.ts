  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { Roles } from './roles';

  @Injectable({
    providedIn: 'root'
  })
  export class RolesService {

    private baseURL ="http://localhost:8080/api/roles";
    constructor(private httpClient : HttpClient) { }

    obtenerListaRoles(): Observable<Roles[]>{
      return this.httpClient.get<Roles[]>(`${this.baseURL}`);
    }

  }
