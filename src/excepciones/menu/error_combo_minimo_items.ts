import { ErrorRestaurante } from "../error_restaurante";

/**
 * Se lanza cuando se intenta crear un combo con una cantidad de items menor al minimo.
 * 
 * @see {@link menu/combo!Combo.constructor}
 */
export class ErrorComboMinimoItems extends ErrorRestaurante {

    /**
     * @param combo Nombre del combo que se quiso crear.
     * @param minimoItems Cantidad minima exigida de items del combo.
     */
    public constructor(combo: string, minimoItems: number) {
        super(`El minimo de items para el combo ${combo} son ${minimoItems}.`);
        this.name = "ErrorComboMinimoItems";
    }

}