import { DescuentoPorcentual } from './DescuentoPorcentual';
import { Pedido } from '../pedido/pedido';

const DESCUENTO_PAGO_EFECTIVO = 10;

/**
 * Estrategia concreta del descuento porcentual que aplica un descuento 
 * cuando el pedido se paga en efectivo.
 */
export class DescuentoPorPagoEfectivo extends DescuentoPorcentual {

    /**
     * @param porcentaje Porcentaje de descuento a aplicar, en escala de 0 a 100. Por defecto, 10.
     */
    public constructor(porcentaje: number = DESCUENTO_PAGO_EFECTIVO) {
        super(porcentaje);
    }

    /**
     * Verifica si el pedido cuenta con un medio de pago asociado y si este califica
     * para el descuento por pago en efectivo.
     * 
     * @param pedido Pedido a evaluar.
     * @returns `true` si tiene un medio de pago asignado y califica para el descuento; 
     * `false` `false` si no tiene medio de pago, no califica o el porcentaje es 0.
     */
    protected aplica(pedido: Pedido): boolean {
        const medio = pedido.getMedioDePago();
        if (medio === undefined || this.getPorcentaje() <= 0) {
            return false;
        }
        return medio.aplicaDescuentoEfectivo();
    }
}