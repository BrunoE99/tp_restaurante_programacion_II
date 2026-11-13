import { EstadoPedido } from "../../enums/estado_pedido";
import { ErrorRestaurante } from "../error_restaurante";

export class ErrorPedidoEstadoIncorrecto extends ErrorRestaurante {

    public constructor(numPedido: number, estadoEsperado: EstadoPedido) {
        super(`El pedido ${numPedido} no se encuentra en el estado: ${EstadoPedido[estadoEsperado]}`);
        this.name = "ErrorPedidoEstadoIncorrecto";
    }
    
}