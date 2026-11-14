import { ErrorRestaurante } from "../error_restaurante";

/**
 * Se lanza al facturar un pedido que no tiene todos sus items en estado `LISTO`.
 * 
 * @see {@link pedido/pedido!Pedido.facturarPedido}
 */
export class ErrorPedidoItemsNoListos extends ErrorRestaurante {

    /**
     * @param numPedido Numero del pedido sobre el que se intento la operacion.
     */
    public constructor(numPedido: number) {
        super(`Los items del pedido ${numPedido} no estan listos`);
        this.name = "ErrorPedidoItemsNoListos";
    }

}