import { Pedido } from "./pedido";

export class PedidoEnvio extends Pedido {
    
    private direccionDeEntrega: string;
    private costoDeEnvio: number;
    private cadete: Cadete;
    private barrio: string;
    private pedidoEntregado: boolean;

    public constructor(private cadet: Cadete, private cliente: Cliente, private mediosDePago?: MediosDePago) {
        super(cliente);
        this.costoDeEnvio = 0;
        this.cadete = cadet;
        this.barrio = "";
        this.pedidoEntregado = false;
    }

}