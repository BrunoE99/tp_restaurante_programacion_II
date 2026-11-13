export class ErrorPedidoNoExiste extends Error {

    public constructor(numPedido: number) {
        super(`El pedido ${numPedido} no existe.`);
        this.name = "ErrorPedidoNoExiste";
    }

    public getMensaje(): string {
        return this.message;
    }

}