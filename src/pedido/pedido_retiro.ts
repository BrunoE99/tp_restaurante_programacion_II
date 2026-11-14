import { Pedido } from "./pedido";
import { CalculoDia } from "../calculo_dia/dia_actual";
import Cliente from "../empleados-cliente/cliente";
import IMediosDePago from "../medios_de_pago/iMediosDePago";

/**
 * Pedido realizado para retirar. Asociado a un horario de retiro y un telefono de contacto del cliente.
 */
export class PedidoRetiro extends Pedido {
    
    private horarioDeRetiro: number;
    private numeroDeTelefono: string;
    
    /**
     * @param numero Numero de pedido.
     * @param cliente Cliente que hace el pedido.
     * @param diaSem Fecha del pedido, que define si tiene descuento por dia.
     * @param horarioRetiro Horario acordado para el retiro, en formato HHMM (ejemplo: `2030` = `20:30`).
     * @param numeroTel Telefono de contacto del cliente.
     * @param mediosDePago Medio de pago, si ya se conoce.
     */
    public constructor(numero: number, cliente: Cliente, diaSem: CalculoDia, horarioRetiro: number, numeroTel: string, 
        mediosDePago?: IMediosDePago) {
        super(numero, cliente, diaSem, mediosDePago);
        this.horarioDeRetiro = horarioRetiro;
        this.numeroDeTelefono = numeroTel;
    }

}