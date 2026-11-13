export class ErrorPedidoSinProductos extends Error {

    public constructor(numPedido: number) {
        super(`El pedido ${numPedido} no tiene productos asignados.`);
        this.name = "ErrorPedidoSinProductos";
    }

    public getMensaje(): string {
        return this.message;
    }

}