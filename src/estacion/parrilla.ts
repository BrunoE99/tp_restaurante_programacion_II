import Estacion from "./estacion";
import { CATEGORIA } from "../enums/categoria";

export default class Parrilla extends Estacion {

    public constructor() {
        super([CATEGORIA.CARNE]);
    }

}