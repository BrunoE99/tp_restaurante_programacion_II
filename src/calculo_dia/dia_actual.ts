import { DiaSemana } from "../enums/dia_semana";

/**
 * Calcula el dia de semana de una fecha.
 * 
 * Por defecto utiliza la fecha actual. Tambien permite que la fecha se pueda indicar,
 * lo que permite simular distintos dias.
 * 
 * @example
 * const hoy = new calculoDia();
 * const martes = new calculoDia(new Date(2026, 11, 10));
 * martes.calculoDia();
 */
export class CalculoDia {

    private fecha: Date;
    
    /**
     * @param fechaHoy Fecha a utilizar. Si se omite, envia la fecha y hora actuales.
     */
    public constructor(fechaHoy?: Date) {
        this.fecha = fechaHoy ?? new Date();
    }

    /**
     * Devuelve el dia de la semana correspondiente a la fecha ingresada.
     * 
     * Usa el numero de `Date.prototype.getDay()`, que coincide con el orden de {@link DiaSemana}.
     * 
     * @returns El dia de la semana correspondiente a la fecha.
     */
    public calculoDia(): DiaSemana {
        const numeroDia = this.fecha.getDay();
        return numeroDia;
    }

}