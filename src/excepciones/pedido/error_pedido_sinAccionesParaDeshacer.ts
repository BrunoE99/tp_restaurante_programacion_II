import { ErrorRestaurante } from "../error_restaurante";

export class ErrorPedidoSinAccionesParaDeshacer extends ErrorRestaurante {

    public constructor(numPedido: number) {
        super(`El pedido ${numPedido} no tiene acciones para deshacer.`);
        this.name = "ErrorPedidoSinAccionesParaDeshacer";
    }

}