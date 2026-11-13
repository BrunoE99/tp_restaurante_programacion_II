import { FabricaPedido } from "./fabrica_pedido";
import Cliente from "../../empleados-cliente/cliente";
import { CalculoDia } from "../../calculo_dia/dia_actual";
import IMediosDePago from "../../medios_de_pago/iMediosDePago";
import { Pedido } from "../pedido";
import { PedidoSalon } from "../pedido_salon";

export class FabricaPedidoSalon implements FabricaPedido {
    
    private cliente: Cliente;
    private diaSem: CalculoDia;
    private numeroMesa: number;
    private mediosDePago: IMediosDePago | undefined;

    public constructor(cliente: Cliente, diaSem: CalculoDia, numeroMesa: number, mediosDePago?: IMediosDePago) {
        this.cliente = cliente;
        this.diaSem = diaSem;
        this.numeroMesa = numeroMesa;
        this.mediosDePago = mediosDePago;
    }

    public crearPedido(numero: number): Pedido {
        return new PedidoSalon(numero, this.cliente, this.diaSem, this.numeroMesa, this.mediosDePago);
    }
}