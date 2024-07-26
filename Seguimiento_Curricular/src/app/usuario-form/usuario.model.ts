export interface Usuario {
  id?: number; // El id puede ser opcional para cuando se está creando un nuevo usuario
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fecha_nacimiento: Date;
  cedula: string;
  rol_id?: number; // Asegúrate de que este campo esté presente
}
