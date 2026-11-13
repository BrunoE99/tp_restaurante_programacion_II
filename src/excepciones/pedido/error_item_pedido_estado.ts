import { EstadoItem } from "../../enums/estado_item";
import { ErrorRestaurante } from "../error_restaurante";

export class ErrorItemPedidoEstadoIncorrecto extends ErrorRestaurante {

    public constructor(numPedido: number, itemNombre: string, estadoEsperado: EstadoItem) {
        super(`El item ${itemNombre} del pedido ${numPedido} no se encuentra en el estado: ${EstadoItem[estadoEsperado]}`);
        this.name = "ErrorItemPedidoEstadoIncorrecto";
    }

}