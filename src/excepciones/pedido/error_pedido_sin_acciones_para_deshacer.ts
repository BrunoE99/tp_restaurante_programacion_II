import { ErrorRestaurante } from "../error_restaurante";

/**
 * Se lanza al intentar deshacer la ultima modificacion de un pedido que no tiene
 * modificaciones para deshacer (si no se agregaron ni quitaron productos, o si ya se
 * deshicieron todas).
 * 
 * @see {@link Pedido.deshacerUltimaAccion}
 */
export class ErrorPedidoSinAccionesParaDeshacer extends ErrorRestaurante {

    /**
     * @param numPedido Numero del pedido sobre el que se intento deshacer una modificacion.
     */
    public constructor(numPedido: number) {
        super(`El pedido ${numPedido} no tiene acciones para deshacer.`);
        this.name = "ErrorPedidoSinAccionesParaDeshacer";
    }

}