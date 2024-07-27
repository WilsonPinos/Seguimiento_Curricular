export interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fecha_nacimiento: Date;
  cedula: string;
  rol_id?: number;
  contrasena: string; // Nuevo campo para la contraseña
}
