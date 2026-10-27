import { Pedido } from "./pedido";
import { CalculoDia } from "../calculo_dia/dia_actual";
import Cliente from "../empleados-cliente/cliente";
import IMediosDePago from "../medios_de_pago/iMediosDePago";

export class PedidoEnvio extends Pedido {
    
    private direccionDeEntrega: string;
    private costoDeEnvio: number;

    public constructor(direccion: string, cliente: Cliente, diaSem: CalculoDia, mediosDePago?: IMediosDePago) {
        super(cliente, diaSem, mediosDePago);
        this.direccionDeEntrega = direccion;
        this.costoDeEnvio = 0;
    }

}