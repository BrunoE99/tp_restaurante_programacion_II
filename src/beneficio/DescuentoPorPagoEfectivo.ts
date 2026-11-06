import { Descuento } from './Descuento';
import { Pedido } from '../pedido/pedido';

const DESCUENTO_PAGO_EFECTIVO = 10;

export class DescuentoPorPagoEfectivo implements Descuento {

    private porcentaje: number;

    public constructor(porcentaje: number = DESCUENTO_PAGO_EFECTIVO) {
        this.porcentaje = porcentaje;
    }

    public calcularDescuento(pedido: Pedido): number {
        const medio = pedido.getMedioDePago();
    if (medio === undefined) {
            return 0;
        } 
    if (!medio.aplicaDescuentoEfectivo()) {
            return 0;
        } else {
            return pedido.getPrecioTotal() * (this.porcentaje / 100);
        }
    }
}