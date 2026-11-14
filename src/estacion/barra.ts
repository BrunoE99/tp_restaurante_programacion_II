import  Estacion  from "./estacion";
import { Categoria } from "../enums/categoria";

/**
 * Estacion de la cocina que se encarga de preparar los items de cateogoria `BEBIDA`.
 * 
 * @see {@link Estacion}
 */
export default class Barra extends Estacion {

    /**
     * Inicializa la estacion con nombre `Barra` y categoria `BEBIDA`.
     */
    public constructor() {
        super('Barra', [Categoria.BEBIDA]);
    }

}