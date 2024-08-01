export class Periodo {
  constructor(
    public id?: number,
    public nombre?: string,
    public fecha_inicio?: Date,
    public fecha_fin?: Date,
    public carrera_id?: number
  ) {}
}
