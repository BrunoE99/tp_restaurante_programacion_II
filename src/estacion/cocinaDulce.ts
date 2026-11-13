import Estacion from "./estacion";
import { Categoria } from "../enums/categoria";

export default class CocinaDulce extends Estacion {

    public constructor() {
        super('Cocina dulce', [Categoria.POSTRE]);
    }

}