import { DescuentoPorcentual } from './DescuentoPorcentual';
import { Pedido } from '../pedido/pedido';

const DESCUENTO_PAGO_EFECTIVO = 10;

export class DescuentoPorPagoEfectivo extends DescuentoPorcentual {

    public constructor(porcentaje: number = DESCUENTO_PAGO_EFECTIVO) {
        super(porcentaje);
    }

    protected aplica(pedido: Pedido): boolean {
        const medio = pedido.getMedioDePago();
        if (medio === undefined) {
            return false;
        }
        return medio.aplicaDescuentoEfectivo();
    }
}