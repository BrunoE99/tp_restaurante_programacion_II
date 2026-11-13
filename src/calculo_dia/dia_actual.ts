import { DiaSemana } from "../enums/dia_semana";

export class CalculoDia {

    private fecha: Date;
    
    public constructor(fechaHoy?: Date) {
        this.fecha = fechaHoy ?? new Date();
    }

    public calculoDia(): DiaSemana {
        const numeroDia = this.fecha.getDay();
        return numeroDia;
    }

}