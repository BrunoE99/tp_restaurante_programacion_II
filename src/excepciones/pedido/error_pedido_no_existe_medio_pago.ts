export class ErrorPedidoNoExisteMedioDePago extends Error {

    public constructor(numPedido: number) {
        super(`El pedido ${numPedido} no tiene medio de pago seleccionado.`);
        this.name = "ErrorPedidoNoExisteMedioDePago";
    }

    public getMensaje(): string {
        return this.message;
    }

}