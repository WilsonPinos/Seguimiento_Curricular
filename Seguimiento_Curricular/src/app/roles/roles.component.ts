import { Component, OnInit } from '@angular/core';
import { Roles } from './roles';
import { RolesService } from './roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{

  roles:Roles[];

  constructor(private RolesService:RolesService){}

    ngOnInit(): void{
      this.obtenerRoles()
    }
  
    private obtenerRoles(){
      this.RolesService.obtenerListaRoles().subscribe(dato =>{
        this.roles = dato;
      })
    }

}
