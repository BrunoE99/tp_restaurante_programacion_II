import { ErrorRestaurante } from "../error_restaurante";

/**
 * Se lanza cuando se intenta una operacion sobre un item que no esta en el estado `EN_PREPARACION` en la estacion.
 * 
 * @see {@link Estacion.finalizar}
 */
export class ErrorEstacionItemNoEnPreparacion extends ErrorRestaurante {

    /**
     * @param nombreItem Nombre del item que no esta `EN_PREPARACION` en esta estacion
     * @param nombreEstacion Nombre de la estacion a la que pertenece el item.
     */
    public constructor(nombreItem: string, nombreEstacion: string) {
        super(`El item ${nombreItem} no esta en preparacion en la estacion: ${nombreEstacion}.`);
        this.name = "ErrorEstacionItemNoEnPreparacion";
    }

}