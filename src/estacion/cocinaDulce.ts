import Estacion from "./estacion";
import { CATEGORIA } from "../enums/categoria";

export default class CocinaDulce extends Estacion {

    public constructor() {
        super([CATEGORIA.POSTRE]);
    }

}