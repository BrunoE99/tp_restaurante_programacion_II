export abstract class Pedido {

    private numeroDePedido: number;
    private cliente: Cliente;
    private items: Item[];
    private combos: Combo[];
    private precioTotal: number;
    private medioDePago: MediosDePago;
    // private estadoDelPedido: ESTADO_ITEM;
    // private diaActual: DIA_SEMANA;

    public constructor(private cliente: Cliente, private mediosDePago?: MediosDePago) {
        this.numeroDePedido = 0;
        this.cliente = cliente;
        this.items = [];
        this.combos = [];
        this.precioTotal = 0;
        this.medioDePago = mediosDePago || undefined;
        // this.estadoDelPedido = "BORRADOR";
        // this.diaActual = ;
    }

    private setNumeroDePedido(numero: number): void {
        this.numeroDePedido = numero;
    }

    private getnumeroDePedido(): number {
        return this.numeroDePedido;
    }

    public getMedioDePago(): MediosDePago {
        return this.medioDePago;
    }

    public setMedioDePago(medioPago: mediosDePago): void {
        this.medioDePago = medioPago;
    }

    protected abstract pedir(): void;

    protected abstract entregar(): void;

}