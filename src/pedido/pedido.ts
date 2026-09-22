import { DIA_SEMANA } from "../enums/dia_semana"
import { ESTADO_ITEM } from "../enums/estado_item";
import { ESTADO_PEDIDO } from "../enums/estado_pedido"

export abstract class Pedido { 

    private numeroDePedido: number;
    private cliente: Cliente;
    private items: Item[]; // lista enlazada
    private combos: Combo[]; // lista enlazada
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
        this.diaActual = diaSem ?? this.calculoDiaActual();
    }

    protected setNumeroDePedido(numero: number): void {
        this.numeroDePedido = numero;
    }

    public getNumeroDePedido(): number {
        return this.numeroDePedido;
    }

    public getMedioDePago(): MediosDePago {
        return this.medioDePago;
    }

    public setMedioDePago(medioPago: mediosDePago): void {
        this.medioDePago = medioPago;
    }

    public getEstadoPedido(): ESTADO_PEDIDO {
        return this.estadoDelPedido;
    }

    public setEstadoPedido(estado: ESTADO_PEDIDO): void {
        this.estadoDelPedido = estado;
    }

    private calculoDiaActual(): DIA_SEMANA {
        const fecha = new Date();
        const numeroDia = fecha.getDay();
        return numeroDia;
    }

    protected abstract pedir(): void;

    protected abstract entregar(): void;

    public estadoItems(): ESTADO_ITEM {
        // verificar lista enlazada de Items/Combos para verificar el estado
        return ESTADO_ITEM.EN_PREPARACION;
    }

    public agregarItem(item: Item): void {
        // tiene que cambiarse a lista enlazada
        this.items.push(item);
    }

    public eliminarItem(item: Item): void {
        // eliminar de la lista
    }

    public agregarCombo(combo: Combo): void {
        // tiene que cambiarse a lista enlazada
        this.combos.push(combo);
    }

    public eliminarCombo(combo: Combo): void {
        // eliminar de la lista
    }

}