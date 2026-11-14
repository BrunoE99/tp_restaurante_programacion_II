import { Pedido } from "./pedido";
export class Factura {
    private numeroDePedido: number;
    private lineas: {nombreProducto: string, precioProducto: number}[];
    private subtotal: number;
    private descuento: number;
    private total: number;

    public constructor(pedido: Pedido, descuento: number) {
        this.numeroDePedido = pedido.getNumeroDePedido();
        this.lineas = pedido.getProductos().map(producto => ({
            nombreProducto: producto.getNombre(),
            precioProducto: producto.getPrecio()
        }));
        this.subtotal = pedido.getPrecioTotal();
        this.descuento = descuento;
        this.total = this.subtotal - this.descuento;
    }

    public getNumeroDePedido(): number {
        return this.numeroDePedido;
    }

    public getLineas(): {nombreProducto: string, precioProducto: number}[] {
        return this.lineas;
    }

    public getSubtotal(): number {
        return this.subtotal;
    }

    public getDescuento(): number {
        return this.descuento;
    }

    public getTotal(): number {
        return this.total;
    }

    public mostrarFactura(): void {
        console.log(`Factura del pedido ${this.numeroDePedido}:`);
        console.log("--------------------------------------------------");
        for (const linea of this.lineas) {
            console.log(`${linea.nombreProducto}: $${linea.precioProducto.toFixed(2)}`);
        }
        console.log("--------------------------------------------------");
        console.log(`Subtotal: $${this.subtotal.toFixed(2)}`);
        console.log(`Descuento: $${this.descuento.toFixed(2)}`);
        console.log(`Total: $${this.total.toFixed(2)}`);
    }
}
