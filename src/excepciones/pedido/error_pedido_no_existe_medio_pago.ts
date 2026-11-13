import { ErrorRestaurante } from "../error_restaurante";

export class ErrorPedidoNoExisteMedioDePago extends ErrorRestaurante {

    public constructor(numPedido: number) {
        super(`El pedido ${numPedido} no tiene medio de pago seleccionado.`);
        this.name = "ErrorPedidoNoExisteMedioDePago";
    }

}