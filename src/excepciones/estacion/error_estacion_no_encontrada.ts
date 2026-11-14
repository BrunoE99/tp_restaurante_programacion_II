import { Categoria } from "../../enums/categoria";
import { ErrorRestaurante } from "../error_restaurante";

/**
 * Se lanza cuando un item de una categoria no puede ser aceptado por ninguna estacion.
 * 
 * @see {@link estacion/estacion!default.recibir}
 */
export class ErrorEstacionNoEncontrada extends ErrorRestaurante {

    /**
     * @param nombreItem Nombre del item que se esta enviando a la estacion.
     * @param categoria Categoria del item que se esta enviando a la estacion.
     */
    public constructor(nombreItem: string, categoria: Categoria) {
        super(`Ninguna estacion puede preparar la categoria ${Categoria[categoria]} (item: ${nombreItem}).`);
        this.name = "ErrorEstacionNoEncontrada";
    }

}