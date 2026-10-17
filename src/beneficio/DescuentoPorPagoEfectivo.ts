import { Descuento } from './Descuento';
import { Pedido } from '../pedido/pedido';

const DESCUENTO_PAGO_EFECTIVO = 10;

export class DescuentoPorPagoEfectivo implements Descuento {

    private porcentaje: number;

    public constructor(porcentaje: number = DESCUENTO_PAGO_EFECTIVO) {
        this.porcentaje = porcentaje;
    }

    public calcularDescuento(pedido: Pedido): number {
        // falta esEfecitvo en  MediosDePago (Juan)
        //  falta calcularPrecioTotal() ? en Pedido (Bruno)
        return 0;
    }

}