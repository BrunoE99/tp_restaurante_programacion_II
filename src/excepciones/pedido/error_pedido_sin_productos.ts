import { ErrorRestaurante } from "../error_restaurante";

export class ErrorPedidoSinProductos extends ErrorRestaurante {

    public constructor(numPedido: number) {
        super(`El pedido ${numPedido} no tiene productos asignados.`);
        this.name = "ErrorPedidoSinProductos";
    }

}