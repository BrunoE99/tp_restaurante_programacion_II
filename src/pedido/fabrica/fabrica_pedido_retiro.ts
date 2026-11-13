import { FabricaPedido } from "./fabrica_pedido";
import Cliente from "../../empleados-cliente/cliente";
import { CalculoDia } from "../../calculo_dia/dia_actual";
import IMediosDePago from "../../medios_de_pago/iMediosDePago";
import { Pedido } from "../pedido";
import { PedidoRetiro } from "../pedido_retiro";

export class FabricaPedidoRetiro implements FabricaPedido {
    
    private cliente: Cliente;
    private diaSem: CalculoDia;
    private horarioRetiro: number;
    private numeroTel: string;
    private mediosDePago: IMediosDePago | undefined;

    public constructor(cliente: Cliente, diaSem: CalculoDia, horarioRetiro: number, numeroTel: string,
        mediosDePago?: IMediosDePago) {
        this.cliente = cliente;
        this.diaSem = diaSem;
        this.horarioRetiro = horarioRetiro;
        this.numeroTel = numeroTel;
        this.mediosDePago = mediosDePago;
    }

    public crearPedido(numero: number): Pedido {
        return new PedidoRetiro(numero, this.cliente, this.diaSem, this.horarioRetiro, this.numeroTel,
            this.mediosDePago);
    }

}