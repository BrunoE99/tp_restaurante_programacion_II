import { Pedido } from "./pedido";
import { CalculoDia } from "../calculo_dia/dia_actual";
import Cliente from "../empleados-cliente/cliente";
import IMediosDePago from "../medios_de_pago/iMediosDePago";

export class PedidoRetiro extends Pedido {
    
    private horarioDeRetiro: number;
    private numeroDeTelefono: number;
    private pedidoRetirado: boolean;

    public constructor(cliente: Cliente, diaSem: CalculoDia, mediosDePago?: IMediosDePago) {
        super(cliente, diaSem, mediosDePago);
        this.horarioDeRetiro = 0;
        this.numeroDeTelefono = 0;
        this.pedidoRetirado = false;
    }

}