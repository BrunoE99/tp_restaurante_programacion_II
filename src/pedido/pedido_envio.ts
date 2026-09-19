import { Pedido } from "./pedido";
import { DIA_SEMANA } from "../enums/dia_semana"
import { ESTADO_PEDIDO } from "../enums/estado_pedido"

export class PedidoEnvio extends Pedido {
    
    private direccionDeEntrega: string;
    private costoDeEnvio: number;
    private cadete: Cadete;
    private barrio: string;
    private pedidoEntregado: boolean;

    public constructor(direccion: string, private cadet: Cadete, cliente: Cliente, 
        mediosDePago?: MediosDePago, estadoPed?: ESTADO_PEDIDO, diaSem?: DIA_SEMANA) {
        super(cliente, mediosDePago, estadoPed, diaSem);
        this.direccionDeEntrega = direccion;
        this.costoDeEnvio = 0;
        this.cadete = cadet;
        this.barrio = "";
        this.pedidoEntregado = false;
    }

}