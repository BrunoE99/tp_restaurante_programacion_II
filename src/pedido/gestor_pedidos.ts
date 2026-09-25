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

    public getHistorial(): Pedido[] {
        const pedidosCompleto: Pedido[] = Array.from(this.historialDePedidos.values());

        return pedidosCompleto;
    }

    public consultarHistorialPedido(numPedido: number): Pedido {
        const pedidoConsultado = this.historialDePedidos.get(numPedido);

        if (pedidoConsultado === undefined) {
            throw new Error("No existe el pedido");
        }

        return pedidoConsultado;
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

    public confirmarPedido(): void {
        this.pedido.confirmarPedido();
        this.asignarAEstaciones();
    }

    public facturarPedido(): void {
        this.pedido.facturarPedido();
        this.historialDePedidos.set(this.pedido.getNumeroDePedido(), this.pedido);
    }

    private asignarAEstaciones(): void {
        // envia cada item a su estacion designada. probablemente llama a dentro de Pedido.
    }

}