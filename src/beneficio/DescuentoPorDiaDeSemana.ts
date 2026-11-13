import { Pedido } from '../pedido/pedido';
import { DiaSemana } from '../enums/dia_semana';
import { DescuentoPorcentual } from './DescuentoPorcentual';

const DESCUENTO_DIA_SEMANA = 15;

export class DescuentoPorDiaDeSemana extends DescuentoPorcentual {

    private diaQueAplica: DiaSemana;

    public constructor(diaQueAplica: DiaSemana = DiaSemana.LUNES, porcentaje: number = DESCUENTO_DIA_SEMANA) {
        super(porcentaje);
        this.diaQueAplica = diaQueAplica;
    }

    protected aplica(pedido: Pedido): boolean {
        const diaPedido = pedido.getDiaActual();
        return diaPedido === this.diaQueAplica;
    }
}