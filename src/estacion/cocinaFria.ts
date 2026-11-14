import Estacion from "./estacion";
import { Categoria } from "../enums/categoria";

/**
 * Estacion de la cocina que se encarga de preparar los items de cateogoria `ENSALADA`.
 * 
 * @see {@link Estacion}
 */
export default class CocinaFria extends Estacion {

    /**
     * Inicializa la estacion con nombre `Cocina fria` y categoria `Ensalada`.
     */
    public constructor() {
        super('Cocina fria', [Categoria.ENSALADA]);
    }

}