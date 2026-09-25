import { Pedido } from "./pedido";
import { ESTADO_PEDIDO } from "../enums/estado_pedido"
import { CalculoDia } from "../calculo_dia/dia_actual";

export class PedidoSalon extends Pedido {

    private mozo: Mozo;
    private numeroDeMesa: number;
    private pedidoMesaCerrada: boolean;

    public constructor(m: Mozo, cliente: Cliente, diaSem: CalculoDia, mediosDePago?: MediosDePago,
    estadoPed?: ESTADO_PEDIDO) {
        super(cliente, diaSem, mediosDePago, estadoPed);
        this.mozo = m;
        this.numeroDeMesa = 0;
        this.pedidoMesaCerrada = false;
    }

}