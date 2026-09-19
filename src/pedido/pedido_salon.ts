import { Pedido } from "./pedido";
import { DIA_SEMANA } from "../enums/dia_semana"
import { ESTADO_PEDIDO } from "../enums/estado_pedido"

export class PedidoSalon extends Pedido {

    private mozo: Mozo;
    private numeroDeMesa: number;
    private pedidoMesaCerrada: boolean;

    public constructor(private m: Mozo, cliente: Cliente, mediosDePago?: MediosDePago,
        estadoPed?: ESTADO_PEDIDO, diaSem?: DIA_SEMANA
    ) {
        super(cliente, mediosDePago, estadoPed, diaSem);
        this.mozo = m;
        this.numeroDeMesa = 0;
        this.pedidoMesaCerrada = false;
    }

}