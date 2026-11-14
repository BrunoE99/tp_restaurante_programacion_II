import { Pedido } from "./pedido";
import { CalculoDia } from "../calculo_dia/dia_actual";
import Cliente from "../empleados-cliente/cliente";
import IMediosDePago from "../medios_de_pago/iMediosDePago";

/**
 * Pedido realizado dentro del salon, asociado a una mesa especifica.
 */
export class PedidoSalon extends Pedido {

    private numeroDeMesa: number;

    /**
     * @param numero Numero de pedido.
     * @param cliente Cliente que hace el pedido.
     * @param diaSem Fecha del pedido, que define si tiene descuento por dia.
     * @param numeroMesa Mesa a la que corresponde el pedido.
     * @param mediosDePago Medio de pago, si ya se conoce.
     */
    public constructor(numero: number, cliente: Cliente, diaSem: CalculoDia, numeroMesa: number, 
        mediosDePago?: IMediosDePago) {
        super(numero, cliente, diaSem, mediosDePago);
        this.numeroDeMesa = numeroMesa;
    }

}