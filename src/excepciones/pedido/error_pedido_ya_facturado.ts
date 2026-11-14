import { ErrorRestaurante } from "../error_restaurante";

/**
 * Se lanza al cambiar el medio de pago de un pedido que ya esta facturado.
 * 
 * @see {@link pedido/pedido!Pedido.setMedioDePago}
 */
export class ErrorPedidoYaFacturado extends ErrorRestaurante {

    /**
     * @param numPedido Numero del pedido sobre el que se intento la operacion.
     */
    public constructor(numPedido: number) {
        super(`El pedido ${numPedido} se encuentra facturado.`);
        this.name = "ErrorPedidoYaFacturado";
    }

}