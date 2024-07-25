export interface Usuario {
  id?: number; // Angular usa number que puede representar long en TypeScript
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fecha_nacimiento: Date;
  cedula: string;
}
