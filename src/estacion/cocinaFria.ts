import Estacion from "./estacion";
import { CATEGORIA } from "../enums/categoria";

export default class CocinaFria extends Estacion {

    public constructor() {
        super('Cocina fria', [CATEGORIA.ENSALADA]);
    }

}