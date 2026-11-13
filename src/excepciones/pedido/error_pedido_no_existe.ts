import { ErrorRestaurante } from "../error_restaurante";

export class ErrorPedidoNoExiste extends ErrorRestaurante {

    public constructor(numPedido: number) {
        super(`El pedido ${numPedido} no existe.`);
        this.name = "ErrorPedidoNoExiste";
    }

}