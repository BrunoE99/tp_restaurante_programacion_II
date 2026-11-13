import { Pedido } from "./pedido";
import { CalculoDia } from "../calculo_dia/dia_actual";
import Cliente from "../empleados-cliente/cliente";
import IMediosDePago from "../medios_de_pago/iMediosDePago";

export class PedidoSalon extends Pedido {

    private numeroDeMesa: number;

    public constructor(numero: number, cliente: Cliente, diaSem: CalculoDia, numeroMesa: number, 
        mediosDePago?: IMediosDePago) {
        super(numero, cliente, diaSem, mediosDePago);
        this.numeroDeMesa = numeroMesa;
    }

}