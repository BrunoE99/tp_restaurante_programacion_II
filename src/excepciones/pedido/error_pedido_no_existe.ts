import { ErrorRestaurante } from "../error_restaurante";

/**
 * Se lanza cuando se intenta una operacion sobre un pedido que no existe.
 * 
 * @see {@link GestorPedidos.consultarHistorialPedido}
 * @see {@link GestorPedidos.buscarPedidoEnCurso}
 */
export class ErrorPedidoNoExiste extends ErrorRestaurante {

    /**
     * @param numPedido Numero del pedido sobre el que se intento la operacion.
     */
    public constructor(numPedido: number) {
        super(`El pedido ${numPedido} no existe.`);
        this.name = "ErrorPedidoNoExiste";
    }

}