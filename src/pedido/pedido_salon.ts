import { Pedido } from "./pedido";
import { CalculoDia } from "../calculo_dia/dia_actual";

export class PedidoSalon extends Pedido {

    private mozo: Mozo;
    private numeroDeMesa: number;
    private pedidoMesaCerrada: boolean;

    public constructor(mozoSalon: Mozo, cliente: Cliente, diaSem: CalculoDia, mediosDePago?: MediosDePago) {
        super(cliente, diaSem, mediosDePago);
        this.mozo = mozoSalon;
        this.numeroDeMesa = 0;
        this.pedidoMesaCerrada = false;
    }

}