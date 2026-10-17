import { Descuento } from './Descuento';
import { Pedido } from '../pedido/pedido';
import { DIA_SEMANA } from '../enums/dia_semana';

const DESCUENTO_DIA_SEMANA = 15;

export class DescuentoPorDiaDeSemana implements Descuento {

    private diaQueAplica: DIA_SEMANA;
    private porcentaje: number;

    public constructor(diaQueAplica: DIA_SEMANA = DIA_SEMANA.LUNES, porcentaje: number = DESCUENTO_DIA_SEMANA) {
        this.diaQueAplica = diaQueAplica;
        this.porcentaje = porcentaje;
    }

    public calcularDescuento(pedido: Pedido): number {
        if (pedido.getDiaActual() !== this.diaQueAplica) {
            return 0;
        }
        // falta calcularPrecioTotal() en Pedido (Bruno)
        return 0;
    }
}