import Estacion from "./estacion";
import { Categoria } from "../enums/categoria";

export default class Parrilla extends Estacion {

    public constructor() {
        super('Parrilla', [Categoria.CARNE]);
    }

}