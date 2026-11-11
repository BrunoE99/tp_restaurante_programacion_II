import IMediosDePago from "../medios_de_pago/iMediosDePago";
import Estacion from "../estacion/estacion";
import { Pedido } from "./pedido";
// import { Item } from "../menu/item";
// import { Combo } from "../menu/combo";
import Producto from "../menu/producto";

export class GestorPedidos {

    private pedido: Pedido;
    // private pedidos: Map<number, Pedido>;
    private historialDePedidos: Map<number, Pedido>;
    private primeraEstacion: Estacion;

    public constructor(pedid: Pedido, primeraEstacion: Estacion) {
        this.pedido = pedid;
        this.historialDePedidos = new Map<number, Pedido>();
        this.primeraEstacion = primeraEstacion;
    }

    public getPedido(): Pedido {
        return this.pedido;
    }

    public setPedido(pedid: Pedido): void {
        this.pedido = pedid;
    }

    public pedidoPago(medioPago: IMediosDePago): void {
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

    public agregarProducto(producto: Producto): void {
        this.pedido.agregarProducto(producto);
    }

    public eliminarProducto(producto: Producto): void {
        this.pedido.eliminarProducto(producto);
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
        for (const item of this.pedido.getItemsAPreparar()) {
            this.primeraEstacion.recibir(item);
        }
    }

}