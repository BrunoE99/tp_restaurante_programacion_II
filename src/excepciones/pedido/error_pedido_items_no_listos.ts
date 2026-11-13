export class ErrorPedidoItemsNoListos extends Error {

    public constructor(numPedido: number) {
        super(`Los items del pedido ${numPedido} no estan listos`);
        this.name = "ErrorPedidoItemsNoListos";
    }

    public getMensaje(): string {
        return this.message;
    }

}