import { Pedido } from "./pedido";

export class PedidoSalon extends Pedido {

    private mozo: Mozo;
    private numeroDeMesa: number;
    private pedidoMesaCerrada: boolean;

    public constructor(private m: Mozo, private cliente: Cliente, private mediosDePago?: MediosDePago) {
        super(cliente);
        this.mozo = m;
        this.numeroDeMesa = 0;
        this.pedidoMesaCerrada = false;
    }

}