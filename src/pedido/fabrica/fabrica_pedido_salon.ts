import { FabricaPedido } from "./fabrica_pedido";
import Cliente from "../../empleados-cliente/cliente";
import { CalculoDia } from "../../calculo_dia/dia_actual";
import IMediosDePago from "../../medios_de_pago/iMediosDePago";
import { Pedido } from "../pedido";
import { PedidoSalon } from "../pedido_salon";

/**
 * Fabrica concreta encargada de crear pedidos con modalidad de salon ({@link PedidoSalon}).
 */
export class FabricaPedidoSalon implements FabricaPedido {
    
    private cliente: Cliente;
    private diaSem: CalculoDia;
    private numeroMesa: number;
    private mediosDePago: IMediosDePago | undefined;

    /**
     * @param cliente Cliente que hace el pedido.
     * @param diaSem Fecha del pedido, que define si tiene descuento por dia.
     * @param numeroMesa Mesa a la que corresponde el pedido.
     * @param mediosDePago Medio de pago, si ya se conoce.
     */
    public constructor(cliente: Cliente, diaSem: CalculoDia, numeroMesa: number, mediosDePago?: IMediosDePago) {
        this.cliente = cliente;
        this.diaSem = diaSem;
        this.numeroMesa = numeroMesa;
        this.mediosDePago = mediosDePago;
    }

    /**
     * @param numero Numero de pedido.
     * @returns Un {@link PedidoSalon} con los datos de la fabrica.
     */
    public crearPedido(numero: number): Pedido {
        return new PedidoSalon(numero, this.cliente, this.diaSem, this.numeroMesa, this.mediosDePago);
    }
}