import { Pedido } from "./pedido";
import { DIA_SEMANA } from "../enums/dia_semana"
import { ESTADO_PEDIDO } from "../enums/estado_pedido"

export class PedidoRetiro extends Pedido {
    
    private horarioDeRetiro: number;
    private numeroDeTelefono: number;
    private pedidoRetirado: boolean;

    public constructor(cliente: Cliente, mediosDePago?: MediosDePago,
        estadoPed?: ESTADO_PEDIDO, diaSem?: DIA_SEMANA
    ) {
        super(cliente, mediosDePago, estadoPed, diaSem);
        this.horarioDeRetiro = 0;
        this.numeroDeTelefono = 0;
        this.pedidoRetirado = false;
    }

}