import { Pedido } from '../pedido/pedido';
import { DiaSemana } from '../enums/dia_semana';
import { DescuentoPorcentual } from './DescuentoPorcentual';

const DESCUENTO_DIA_SEMANA = 15;

/**
 * Estrategia concreta del descuento porcentual que aplica un descuento
 * cuando el pedido se realiza en un dia especifico.
 */
export class DescuentoPorDiaDeSemana extends DescuentoPorcentual {

    private diaQueAplica: DiaSemana;

    /**
     * @param diaQueAplica Dia de la semana en el que aplica el descuento. Por defecto, `LUNES`.
     * @param porcentaje Porcentaje de descuento a aplicar, en escala 0 a 100. Por defecto, 15.
     */
    public constructor(diaQueAplica: DiaSemana = DiaSemana.LUNES, porcentaje: number = DESCUENTO_DIA_SEMANA) {
        super(porcentaje);
        this.diaQueAplica = diaQueAplica;
    }

    /**
     * Verifica si el dia en que se registro el pedido coincide con el dia configurado para este descuento.
     * 
     * @param pedido Pedido a evaluar.
     * @returns `tru` si el dia del pedido coincide; `false` si no.
     */
    protected aplica(pedido: Pedido): boolean {
        const diaPedido = pedido.getDiaActual();
        return diaPedido === this.diaQueAplica;
    }
}