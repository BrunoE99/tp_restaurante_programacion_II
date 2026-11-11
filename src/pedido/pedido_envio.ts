import { Pedido } from "./pedido";
import { CalculoDia } from "../calculo_dia/dia_actual";
import Cliente from "../empleados-cliente/cliente";
import IMediosDePago from "../medios_de_pago/iMediosDePago";

export class PedidoEnvio extends Pedido {
    
    private direccionDeEntrega: string;
    private costoDeEnvio: number;

    public constructor(numero: number, cliente: Cliente, diaSem: CalculoDia, direccion: string,
        mediosDePago?: IMediosDePago) {
        super(numero, cliente, diaSem, mediosDePago);
        this.direccionDeEntrega = direccion;
        this.costoDeEnvio = 0;
    }

}