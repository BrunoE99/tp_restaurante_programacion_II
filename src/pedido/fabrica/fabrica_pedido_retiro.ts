import { FabricaPedido } from "./fabrica_pedido";
import Cliente from "../../empleados-cliente/cliente";
import { CalculoDia } from "../../calculo_dia/dia_actual";
import IMediosDePago from "../../medios_de_pago/iMediosDePago";
import { Pedido } from "../pedido";
import { PedidoRetiro } from "../pedido_retiro";

/**
 * Fabrica concreta encargada de crear pedidos con modalidad de retiro ({@link PedidoRetiro}).
 */
export class FabricaPedidoRetiro implements FabricaPedido {
    
    private cliente: Cliente;
    private diaSem: CalculoDia;
    private horarioRetiro: number;
    private numeroTel: string;
    private mediosDePago: IMediosDePago | undefined;

    /**
     * @param cliente Cliente que hace el pedido.
     * @param diaSem Fecha del pedido, que define si tiene descuento por dia.
     * @param horarioRetiro Horario acordado para el retiro, en formato HHMM (ejemplo: `2030` = `20:30`).
     * @param numeroTel Telefono de contacto del cliente.
     * @param mediosDePago Medio de pago, si ya se conoce.
     */
    public constructor(cliente: Cliente, diaSem: CalculoDia, horarioRetiro: number, numeroTel: string,
        mediosDePago?: IMediosDePago) {
        this.cliente = cliente;
        this.diaSem = diaSem;
        this.horarioRetiro = horarioRetiro;
        this.numeroTel = numeroTel;
        this.mediosDePago = mediosDePago;
    }

    /**
     * @param numero Numero de pedido.
     * @returns Un {@link PedidoRetiro} con los datos de la fabrica.
     */
    public crearPedido(numero: number): Pedido {
        return new PedidoRetiro(numero, this.cliente, this.diaSem, this.horarioRetiro, this.numeroTel,
            this.mediosDePago);
    }

}