import { EstadoPedido } from "../../enums/estado_pedido";

export class ErrorPedidoEstadoIncorrecto extends Error {

    public constructor(numPedido: number, estadoEsperado: EstadoPedido) {
        super(`El pedido ${numPedido} no se encuentra en el estado: ${EstadoPedido[estadoEsperado]}`);
        this.name = "ErrorPedidoEstadoIncorrecto";
    }

    public getMensaje(): string {
        return this.message;
    }

}