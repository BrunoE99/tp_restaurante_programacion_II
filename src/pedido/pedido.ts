import { DIA_SEMANA } from "../enums/dia_semana"
import { ESTADO_PEDIDO } from "../enums/estado_pedido"

export abstract class Pedido { 

    private numeroDePedido: number;
    private cliente: Cliente;
    private items: Item[];
    private combos: Combo[];
    private precioTotal: number;
    private medioDePago: MediosDePago;
    private estadoDelPedido: ESTADO_PEDIDO;
    private diaActual: DIA_SEMANA;

    public constructor(private client: Cliente, private mediosDePago?: MediosDePago, 
        estadoPed?: ESTADO_PEDIDO, diaSem?: DIA_SEMANA) {
        this.numeroDePedido = 0;
        this.cliente = client;
        this.items = [];
        this.combos = [];
        this.precioTotal = 0;
        this.medioDePago = mediosDePago ?? undefined;
        this.estadoDelPedido = estadoPed ?? ESTADO_PEDIDO.EN_CONSTRUCCION;
        this.diaActual = diaSem ?? this.getDiaActual();
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

    private getDiaActual(): DIA_SEMANA {
        const fecha = new Date();
        const numeroDia = fecha.getDay();
        return numeroDia;
    }

    protected abstract pedir(): void;

    protected abstract entregar(): void;

}