import { ErrorRestaurante } from "../error_restaurante";

/**
 * Se lanza al facturar un pedido que no tiene ningun medio de pago.
 * 
 * @see {@link Pedido.facturarPedido}
 */
export class ErrorPedidoNoExisteMedioDePago extends ErrorRestaurante {

    /**
     * @param numPedido Numero del pedido sobre el que se intento la operacion.
     */
    public constructor(numPedido: number) {
        super(`El pedido ${numPedido} no tiene medio de pago seleccionado.`);
        this.name = "ErrorPedidoNoExisteMedioDePago";
    }

}