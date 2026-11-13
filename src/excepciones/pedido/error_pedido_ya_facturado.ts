export class ErrorPedidoYaFacturado extends Error {

    public constructor(numPedido: number) {
        super(`El pedido ${numPedido} se encuentra facturado.`);
        this.name = "ErrorPedidoYaFacturado";
    }

    public getMensaje(): string {
        return this.message;
    }

}