import { Pedido } from "./pedido";
import { CalculoDia } from "../calculo_dia/dia_actual";
import Cliente from "../empleados-cliente/cliente";
import IMediosDePago from "../medios_de_pago/iMediosDePago";

export class PedidoSalon extends Pedido {

    private numeroDeMesa: number;

    public constructor(cliente: Cliente, diaSem: CalculoDia, numeroMesa: number, mediosDePago?: IMediosDePago) {
        super(cliente, diaSem, mediosDePago);
        this.numeroDeMesa = numeroMesa;
    }

}