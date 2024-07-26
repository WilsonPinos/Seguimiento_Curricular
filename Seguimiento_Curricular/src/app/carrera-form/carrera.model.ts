export class Carrera {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public usuario_id: number // Añadido el campo usuario_id
  ) {}
}
