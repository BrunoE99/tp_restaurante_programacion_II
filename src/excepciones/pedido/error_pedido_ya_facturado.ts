import { ErrorRestaurante } from "../error_restaurante";

export class ErrorPedidoYaFacturado extends ErrorRestaurante {

    public constructor(numPedido: number) {
        super(`El pedido ${numPedido} se encuentra facturado.`);
        this.name = "ErrorPedidoYaFacturado";
    }

}