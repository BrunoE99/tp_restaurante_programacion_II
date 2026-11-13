import { ErrorRestaurante } from "../error_restaurante";

export class ErrorPedidoItemsNoListos extends ErrorRestaurante {

    public constructor(numPedido: number) {
        super(`Los items del pedido ${numPedido} no estan listos`);
        this.name = "ErrorPedidoItemsNoListos";
    }

}