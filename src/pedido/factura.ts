import { Pedido } from "./pedido";

/**
 * Detalle de lo cobrado en un pedido: productos con su precio, el subtotal, el descuento
 * aplicado y el total.
 * 
 * Captura una snapshot del pedido al momento de facturar, para asi no guardar una referencia al pedido.
 */
export class Factura {
    private numeroDePedido: number;
    private lineas: {nombreProducto: string, precioProducto: number}[];
    private subtotal: number;
    private descuento: number;
    private total: number;

    /**
     * Genera una factura a partir del estado actual de un pedido y el monto de descuento
     * a aplicar.
     * 
     * @param pedido Pedido facturado del cual se capturo la snapshot.
     * @param descuento Importe a descontar.
     */
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

    /**
     * @returns Numero del pedido facturado.
     */
    public getNumeroDePedido(): number {
        return this.numeroDePedido;
    }

    /**
     * @returns Las lineas/renglones de la factura: nombre y precio de cada producto.
     */
    public getLineas(): {nombreProducto: string, precioProducto: number}[] {
        return this.lineas;
    }

    /**
     * @returns El importe total del pedido, antes del descuento.
     */
    public getSubtotal(): number {
        return this.subtotal;
    }

    /**
     * @returns El importe total descontado.
     */
    public getDescuento(): number {
        return this.descuento;
    }

    /**
     * @returns Importe final a cobrar (subtotal menos descuento).
     */
    public getTotal(): number {
        return this.total;
    }

    /**
     * Imprime por consola el detalle formateado de la factura.
     */
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
