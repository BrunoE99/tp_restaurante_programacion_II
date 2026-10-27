import { Pedido } from "./pedido";
import { CalculoDia } from "../calculo_dia/dia_actual";
import Mozo from "../empleados-cliente/mozo";
import Cliente from "../empleados-cliente/cliente";
import IMediosDePago from "../medios_de_pago/iMediosDePago";

export class PedidoSalon extends Pedido {

    private mozo: Mozo;
    private numeroDeMesa: number;
    private pedidoMesaCerrada: boolean;

    public constructor(mozoSalon: Mozo, cliente: Cliente, diaSem: CalculoDia, mediosDePago?: IMediosDePago) {
        super(cliente, diaSem, mediosDePago);
        this.mozo = mozoSalon;
        this.numeroDeMesa = 0;
        this.pedidoMesaCerrada = false;
    }

}