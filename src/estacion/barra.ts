import  Estacion  from "./estacion";
import { Categoria } from "../enums/categoria";

export default class Barra extends Estacion {

    public constructor() {
        super('Barra', [Categoria.BEBIDA]);
    }

}