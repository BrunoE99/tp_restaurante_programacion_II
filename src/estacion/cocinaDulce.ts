import Estacion from "./estacion";
import { Categoria } from "../enums/categoria";

/**
 * Estacion de la cocina que se encarga de preparar los items de cateogoria `POSTRE`.
 * 
 * @see {@link Estacion}
 */
export default class CocinaDulce extends Estacion {

    /**
     * Inicializa la estacion con nombre `Cocina dulce` y categoria `POSTRE`.
     */
    public constructor() {
        super('Cocina dulce', [Categoria.POSTRE]);
    }

}