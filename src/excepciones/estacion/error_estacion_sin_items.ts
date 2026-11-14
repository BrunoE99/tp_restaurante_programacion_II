import { ErrorRestaurante } from "../error_restaurante";

/**
 * Se lanza al pedir el siguiente item de una estacion que no tiene mas items.
 * 
 * @see {@link estacion/estacion!default.iniciarSiguiente}
 */
export class ErrorEstacionSinItems extends ErrorRestaurante {
    
    /**
     * @param nombreEstacion Nombre de la estacion sobre la que se intenta la operacion.
     */
    public constructor(nombreEstacion: string) {
        super(`No hay items en la cola de ${nombreEstacion}.`);
        this.name = "ErrorEstacionSinItems";
    }

}