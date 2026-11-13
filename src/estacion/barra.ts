import  Estacion  from "./estacion";
import { CATEGORIA } from "../enums/categoria";

export default class Barra extends Estacion {

    public constructor() {
        super('Barra', [CATEGORIA.BEBIDA]);
    }

}