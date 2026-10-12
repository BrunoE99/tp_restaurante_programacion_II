import { DIA_SEMANA } from "../enums/dia_semana"
import { ESTADO_ITEM } from "../enums/estado_item";
import { ESTADO_PEDIDO } from "../enums/estado_pedido"
import { CalculoDia } from "../calculo_dia/dia_actual"

export abstract class Pedido { 

    private numeroDePedido: number;
    private cliente: Cliente;
    private items: Item[];
    private combos: Combo[];
    private precioTotal: number;
    private medioDePago: MediosDePago | undefined;
    private estadoDelPedido: ESTADO_PEDIDO;
    private diaActual: DIA_SEMANA;

    public constructor(client: Cliente, diaSem: CalculoDia, mediosDePago?: MediosDePago) {
        this.numeroDePedido = 0;
        this.cliente = client;
        this.items = [];
        this.combos = [];
        this.precioTotal = 0;
        this.medioDePago = mediosDePago;
        this.estadoDelPedido = ESTADO_PEDIDO.EN_CONSTRUCCION;
        this.diaActual = diaSem.calculoDia();
    }
    
    protected abstract pedir(): void;

    protected abstract entregar(): void;

    protected setNumeroDePedido(numero: number): void {
        this.numeroDePedido = numero;
    }

    public getNumeroDePedido(): number {
        return this.numeroDePedido;
    }

    public getMedioDePago(): MediosDePago | undefined {
        return this.medioDePago;
    }

    public setMedioDePago(medioPago: MediosDePago): void {
        this.medioDePago = medioPago;
    }

    public getEstadoPedido(): ESTADO_PEDIDO {
        return this.estadoDelPedido;
    }

    public getDiaActual(): DIA_SEMANA {
        return this.diaActual;
    }

    public getPrecioTotal(): number {
        return this.precioTotal;
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
        this.validarPedidoEnConstruccion();
        this.items.push(item);
        this.calcularPrecio();
    }

    public eliminarItem(item: Item): void {
        this.validarPedidoEnConstruccion();
        const posicion: number = this.items.findIndex((itemArray) => itemArray === item);

        if (posicion >= 0) {
            this.items.splice(posicion, 1);
        }

        this.calcularPrecio();
    }

    public agregarCombo(combo: Combo): void {
        this.validarPedidoEnConstruccion();
        this.combos.push(combo);
        this.calcularPrecio();
    }

    public eliminarCombo(combo: Combo): void {
        this.validarPedidoEnConstruccion();
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

    public confirmarPedido(): void {
        this.validarPedidoEnConstruccion();
        if (this.items.length === 0 && this.combos.length === 0) {
            throw new Error("El pedido no tiene items ni combos a confirmar");
        }

        this.estadoDelPedido = ESTADO_PEDIDO.CONFIRMADO;
    }

    private validarPedidoEnConstruccion(): void {
        if (this.estadoDelPedido !== ESTADO_PEDIDO.EN_CONSTRUCCION) {
            throw new Error("El pedido no esta en construccion");
        }
    }

    public facturarPedido(): void {
        if (this.estadoDelPedido !== ESTADO_PEDIDO.CONFIRMADO) {
            throw new Error("El pedido no se encuentra confirmado.");
        }
        if (this.estadoItems() !== ESTADO_ITEM.LISTO) {
            throw new Error("Los items y/o combos no estan listos.")
        }
        if (this.medioDePago === undefined) {
            throw new Error("No existe el medio de pago");
        }

        this.estadoDelPedido = ESTADO_PEDIDO.FACTURADO;
    }

}