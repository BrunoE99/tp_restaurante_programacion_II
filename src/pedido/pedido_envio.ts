import { Pedido } from "./pedido";
import { CalculoDia } from "../calculo_dia/dia_actual";
import Cliente from "../empleados-cliente/cliente";
import IMediosDePago from "../medios_de_pago/iMediosDePago";

/**
 * Pedido realizado para envio. Relacionado con una direccion de entrega y un costo.
 */
export class PedidoEnvio extends Pedido {
    
    private direccionDeEntrega: string;
    private costoDeEnvio: number;

    /**
     * @param numero Numero de pedido.
     * @param cliente Cliente que hace el pedido.
     * @param diaSem Fecha del pedido, que define si tiene descuento por dia.
     * @param direccion Direccion de entrega.
     * @param mediosDePago Medio de pago, si ya se conoce.
     */
    public constructor(numero: number, cliente: Cliente, diaSem: CalculoDia, direccion: string,
        mediosDePago?: IMediosDePago) {
        super(numero, cliente, diaSem, mediosDePago);
        this.direccionDeEntrega = direccion;
        this.costoDeEnvio = 0;
    }

}