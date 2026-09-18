import { Pedido } from "./pedido";

export class PedidoRetiro extends Pedido {
    
    private horarioDeRetiro: number;
    private numeroDeTelefono: number;
    private pedidoRetirado: boolean;

    public constructor(private cliente: Cliente, private mediosDePago?: MediosDePago) {
        super(cliente)
        this.horarioDeRetiro = 0;
        this.numeroDeTelefono = 0;
        this.pedidoRetirado = false;
    }

}