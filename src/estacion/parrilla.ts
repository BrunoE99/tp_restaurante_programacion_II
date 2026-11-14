import Estacion from "./estacion";
import { Categoria } from "../enums/categoria";

/**
 * Estacion de la cocina que se encarga de preparar los items de cateogoria `CARNE`.
 * 
 * @see {@link Estacion}
 */
export default class Parrilla extends Estacion {

    /**
     * Inicializa la estacion con nombre `Parrilla` y categoria `CARNE`.
     */
    public constructor() {
        super('Parrilla', [Categoria.CARNE]);
    }

}