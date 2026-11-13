import { ESTADO_PEDIDO } from "../../enums/estado_pedido";

export class ErrorPedidoEstadoIncorrecto extends Error {

    public constructor(numPedido: number, estadoEsperado: ESTADO_PEDIDO) {
        super(`El pedido ${numPedido} no se encuentra en el estado: ${ESTADO_PEDIDO[estadoEsperado]}`);
        this.name = "ErrorPedidoEstadoIncorrecto";
    }

    public getMensaje(): string {
        return this.message;
    }

}