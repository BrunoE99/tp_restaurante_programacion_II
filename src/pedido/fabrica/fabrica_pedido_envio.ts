import { FabricaPedido } from "./fabrica_pedido";
import Cliente from "../../empleados-cliente/cliente";
import { CalculoDia } from "../../calculo_dia/dia_actual";
import IMediosDePago from "../../medios_de_pago/iMediosDePago";
import { Pedido } from "../pedido";
import { PedidoEnvio } from "../pedido_envio";

/**
 * Fabrica concreta encargada de crear pedidos con modalidad de envio a domicilio ({@link PedidoEnvio}).
 */
export class FabricaPedidoEnvio implements FabricaPedido {

    private cliente: Cliente;
    private diaSem: CalculoDia;
    private direccion: string;
    private mediosDePago: IMediosDePago | undefined;

    /**
     * @param cliente Cliente que hace el pedido.
     * @param diaSem Fecha del pedido, que define si tiene descuento por dia.
     * @param direccion Direccion de entrega.
     * @param mediosDePago Medio de pago, si ya se conoce.
     */
    public constructor(cliente: Cliente, diaSem: CalculoDia, direccion: string, mediosDePago?: IMediosDePago) {
        this.cliente = cliente;
        this.diaSem = diaSem;
        this.direccion = direccion;
        this.mediosDePago = mediosDePago;
    }

    /**
     * @param numero Numero de pedido.
     * @returns Un {@link PedidoEnvio} con los datos de la fabrica.
     */
    public crearPedido(numero: number): Pedido {
        return new PedidoEnvio(numero, this.cliente, this.diaSem, this.direccion, this.mediosDePago);
    }

}