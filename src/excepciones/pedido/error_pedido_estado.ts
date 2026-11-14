import { EstadoPedido } from "../../enums/estado_pedido";
import { ErrorRestaurante } from "../error_restaurante";

/**
 * Se lanza cuando se intenta una operacion sobre un pedido que no esta en el estado que esa operacion necesita.
 * 
 * @see {@link Pedido.validarPedidoEnConstruccion}
 * @see {@link Pedido.facturarPedido}
 */
export class ErrorPedidoEstadoIncorrecto extends ErrorRestaurante {

    /**
     * @param numPedido Numero del pedido sobre el que se intento la operacion.
     * @param estadoEsperado Estado en el que el pedido deberia estar para permitir la operacion (no el actual).
     */
    public constructor(numPedido: number, estadoEsperado: EstadoPedido) {
        super(`El pedido ${numPedido} no se encuentra en el estado: ${EstadoPedido[estadoEsperado]}`);
        this.name = "ErrorPedidoEstadoIncorrecto";
    }
    
}