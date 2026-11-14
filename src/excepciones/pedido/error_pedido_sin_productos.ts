import { ErrorRestaurante } from "../error_restaurante";

/**
 * Se lanza al confirmar un pedido que no tiene ningun producto.
 * 
 * @see {@link pedido/pedido!Pedido.confirmarPedido}
 */
export class ErrorPedidoSinProductos extends ErrorRestaurante {

    /**
     * @param numPedido Numero del pedido sobre el que se intento la operacion.
     */
    public constructor(numPedido: number) {
        super(`El pedido ${numPedido} no tiene productos asignados.`);
        this.name = "ErrorPedidoSinProductos";
    }

}