import { EstadoItem } from "../../enums/estado_item";
import { ErrorRestaurante } from "../error_restaurante";

/**
 * Se lanza cuando se intenta una operacion sobre un itemPedido que no esta en el estado que esa operacion necesita.
 * 
 * @see {@link pedido/item_pedido!ItemPedido.iniciarPreparacion}
 * @see {@link pedido/item_pedido!ItemPedido.marcarListo}
 */
export class ErrorItemPedidoEstadoIncorrecto extends ErrorRestaurante {

    /**
     * @param numPedido Numero del pedido al que pertenece itemPedido.
     * @param itemNombre Nombre del itemPedido sobre el que se intento la operacion.
     * @param estadoEsperado Estado en el que el itemPedido deberia estar para permitir la operacion (no el actual).
     */
    public constructor(numPedido: number, itemNombre: string, estadoEsperado: EstadoItem) {
        super(`El item ${itemNombre} del pedido ${numPedido} no se encuentra en el estado: ${EstadoItem[estadoEsperado]}`);
        this.name = "ErrorItemPedidoEstadoIncorrecto";
    }

}