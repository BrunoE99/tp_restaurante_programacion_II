import { Pedido } from "./pedido";

export class GestorPedidos {

    private pedido: Pedido;
    private historialDePedidos: Map<number, Pedido>;

    public constructor(private pedid: Pedido) {
        this.pedido = pedid;
        this.historialDePedidos = new Map<number, Pedido>();
    }

    public getPedido(): Pedido {
        return this.pedido;
    }

    public setPedido(pedid: Pedido): void {
        this.pedido = pedid;
    }

    public pedidoPago(medioPago: mediosDePago): void {
        this.pedido.setMedioDePago(medioPago);
    }

}