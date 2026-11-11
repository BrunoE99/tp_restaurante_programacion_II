import { FabricaPedido } from "./fabrica_pedido";
import Cliente from "../../empleados-cliente/cliente";
import { CalculoDia } from "../../calculo_dia/dia_actual";
import IMediosDePago from "../../medios_de_pago/iMediosDePago";
import { Pedido } from "../pedido";
import { PedidoEnvio } from "../pedido_envio";

export class FabricaPedidoEnvio implements FabricaPedido {

    private cliente: Cliente;
    private diaSem: CalculoDia;
    private direccion: string;
    private mediosDePago: IMediosDePago | undefined;

    public constructor(cliente: Cliente, diaSem: CalculoDia, direccion: string, mediosDePago?: IMediosDePago) {
        this.cliente = cliente;
        this.diaSem = diaSem;
        this.direccion = direccion;
        this.mediosDePago = mediosDePago;
    }

    public crearPedido(numero: number): Pedido {
        return new PedidoEnvio(numero, this.cliente, this.diaSem, this.direccion, this.mediosDePago);
    }

}