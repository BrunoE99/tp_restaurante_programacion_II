import { Pedido } from "./pedido";
import { CalculoDia } from "../calculo_dia/dia_actual";
import Cliente from "../empleados-cliente/cliente";
import IMediosDePago from "../medios_de_pago/iMediosDePago";

export class PedidoRetiro extends Pedido {
    
    private horarioDeRetiro: number;
    private numeroDeTelefono: string;
    public constructor(cliente: Cliente, diaSem: CalculoDia, horarioRetiro: number, numeroTel: string, 
        mediosDePago?: IMediosDePago) {
        super(cliente, diaSem, mediosDePago);
        this.horarioDeRetiro = horarioRetiro;
        this.numeroDeTelefono = numeroTel;
    }

}