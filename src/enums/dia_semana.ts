/**
 * Dias de la semana utilizados en el descuento por dia especial.
 * 
 * El orden de los valores estan ordenados segun `Date.prototype.getDay()` en el que
 * 0 = Domingo, 1 = Lunes, etc.
 */
export enum DiaSemana {
    DOMINGO,
    LUNES,
    MARTES,
    MIERCOLES,
    JUEVES,
    VIERNES,
    SABADO
}