import { DIA_SEMANA } from "../enums/dia_semana"
import { ESTADO_ITEM } from "../enums/estado_item";
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
        this.diaActual = diaSem ?? this.calculoDiaActual();
    }
    
    protected abstract pedir(): void;

    protected abstract entregar(): void;

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

    public getDiaActual(): DIA_SEMANA {
        return this.diaActual;
    }

    private calculoDiaActual(): DIA_SEMANA {
        const fecha = new Date();
        const numeroDia = fecha.getDay();
        return numeroDia;
    }
    
    public estadoItems(): ESTADO_ITEM {

        if (this.items.length === 0 && this.combos.length === 0) {
            return ESTADO_ITEM.PENDIENTE;
        }

        const estadosItems = this.items.map(item => item.getEstadoItem());
        const estadosCombos = this.combos.map(combo => combo.getEstadoCombo());

        return Math.min(...estadosItems, ...estadosCombos) as ESTADO_ITEM;
    }

    public agregarItem(item: Item): void {
        this.items.push(item);
        this.calcularPrecio();
    }

    public eliminarItem(item: Item): void {
        const posicion: number = this.items.findIndex((itemArray) => itemArray === item);

        if (posicion >= 0) {
            this.items.splice(posicion, 1);
        }

        this.calcularPrecio();
    }

    public agregarCombo(combo: Combo): void {
        this.combos.push(combo);
        this.calcularPrecio();
    }

    public eliminarCombo(combo: Combo): void {
        const posicion: number = this.combos.findIndex((comboArray) => comboArray === combo);

        if (posicion >= 0) {
            this.combos.splice(posicion, 1);
        }

        this.calcularPrecio();
    }

    protected calcularPrecio(): void {
        const valorInicialItems = 0;
        const precioItems: number = this.items.reduce((acumulador, valorAct) => acumulador + 
        valorAct.getPrecioIndividual(), valorInicialItems);

        const valorInicialCombos = 0;
        const precioCombos: number = this.combos.reduce((acumulador, valorAct) => acumulador + 
        valorAct.getPrecioCombo(), valorInicialCombos);

        this.precioTotal = precioItems + precioCombos;
    }

}