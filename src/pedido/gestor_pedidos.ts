import { ESTADO_PEDIDO } from "../enums/estado_pedido";
import { Pedido } from "./pedido";

export class GestorPedidos {

    private pedido: Pedido;
    private historialDePedidos: Map<number, Pedido>;
    private estaciones: Estacion[];

    public constructor(pedid: Pedido, estacionesParam: Estacion[]) {
        this.pedido = pedid;
        this.historialDePedidos = new Map<number, Pedido>();
        this.estaciones = estacionesParam;
    }

    public getPedido(): Pedido {
        return this.pedido;
    }

    public setPedido(pedid: Pedido): void {
        this.pedido = pedid;
    }

    public pedidoPago(medioPago: MediosDePago): void {
        this.pedido.setMedioDePago(medioPago);
    }

    public consultarHistorial(numPedido: number): void {
        this.historialDePedidos.forEach((valor, llave) => {
            console.log(`Pedido nro: ${llave}`)
        })
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

    // public modificarPedido(): void {
    //     // que debia hacer esto?
    // }

    public confirmarPedido(): void {
        this.pedido.setEstadoPedido(ESTADO_PEDIDO.PENDIENTE);
        // deberia agregarse al finalizarse? al pagarse?
        this.historialDePedidos.set(this.pedido.getNumeroDePedido(), this.pedido);
    }

    public asignarAEstaciones(): void {
        // envia cada item a su estacion designada. probablemente llama a dentro de Pedido.
    }

}