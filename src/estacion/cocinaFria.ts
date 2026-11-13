import Estacion from "./estacion";
import { Categoria } from "../enums/categoria";

export default class CocinaFria extends Estacion {

    public constructor() {
        super('Cocina fria', [Categoria.ENSALADA]);
    }

}