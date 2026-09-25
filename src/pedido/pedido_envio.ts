import { Pedido } from "./pedido";
import { ESTADO_PEDIDO } from "../enums/estado_pedido"
import { CalculoDia } from "../calculo_dia/dia_actual";

export class PedidoEnvio extends Pedido {
    
    private direccionDeEntrega: string;
    private costoDeEnvio: number;
    private cadete: Cadete;
    private barrio: string;
    private pedidoEntregado: boolean;

    public constructor(direccion: string, cadet: Cadete, cliente: Cliente, diaSem: CalculoDia,
        mediosDePago?: MediosDePago, estadoPed?: ESTADO_PEDIDO) {
        super(cliente, diaSem, mediosDePago, estadoPed);
        this.direccionDeEntrega = direccion;
        this.costoDeEnvio = 0;
        this.cadete = cadet;
        this.barrio = "";
        this.pedidoEntregado = false;
    }

}