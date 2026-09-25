import { Pedido } from "./pedido";
import { ESTADO_PEDIDO } from "../enums/estado_pedido"
import { CalculoDia } from "../calculo_dia/dia_actual";

export class PedidoRetiro extends Pedido {
    
    private horarioDeRetiro: number;
    private numeroDeTelefono: number;
    private pedidoRetirado: boolean;

    public constructor(cliente: Cliente, diaSem: CalculoDia, mediosDePago?: MediosDePago,
        estadoPed?: ESTADO_PEDIDO) {
        super(cliente, diaSem, mediosDePago, estadoPed);
        this.horarioDeRetiro = 0;
        this.numeroDeTelefono = 0;
        this.pedidoRetirado = false;
    }

}