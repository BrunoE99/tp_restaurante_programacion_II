import { DIA_SEMANA } from "../enums/dia_semana";

export class CalculoDia {

    private fecha: Date;
    
    public constructor(fechaHoy?: Date) {
        this.fecha = fechaHoy ?? new Date();
    }

    public calculoDia(): DIA_SEMANA {
        const numeroDia = this.fecha.getDay();
        return numeroDia;
    }

}