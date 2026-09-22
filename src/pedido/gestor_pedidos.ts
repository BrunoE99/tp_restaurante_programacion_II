import { ESTADO_PEDIDO } from "../enums/estado_pedido";
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

    public consultarHistorial(numPedido: number): void {
        // usar la funcion del MAP para validar el Pedido
    }

    public agregarItem(item: Item): void {
        this.pedido.agregarItem(item);
    }

    public eliminarItem(item: Item): void {
        this.pedido.eliminarItem(item);
    }

    public agregarCombo(combo: Combo): void {
        this.pedido.agregarCombo(combo);
    }

    public eliminarCombo(combo: Combo): void {
        this.pedido.eliminarCombo(combo);
    }

    public modificarPedido(): void {
        // que debia hacer esto?
    }

    public confirmarPedido(): void {
        this.pedido.setEstadoPedido(ESTADO_PEDIDO.EN_PREPARACION);
    }

    public asignarAEstaciones(): void {
        // envia cada item a su estacion designada. probablemente llama a dentro de Pedido.
    }

    public calcularPrecioTotal(): number {
        // calcula el precio con todos los items+combos y suma los descuentos?
    }

}