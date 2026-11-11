import { DIA_SEMANA } from "../enums/dia_semana"
import { ESTADO_ITEM } from "../enums/estado_item";
import { ESTADO_PEDIDO } from "../enums/estado_pedido"
import { CalculoDia } from "../calculo_dia/dia_actual"
import Cliente from "../empleados-cliente/cliente";
import { ItemPedido } from "./item_pedido";
import Producto from "../menu/producto";
import IMediosDePago from "../medios_de_pago/iMediosDePago";

export abstract class Pedido { 

    private readonly numeroDePedido: number;
    private cliente: Cliente;
    private productos: Producto[];
    private precioTotal: number;
    private medioDePago: IMediosDePago | undefined;
    private estadoDelPedido: ESTADO_PEDIDO;
    private diaActual: DIA_SEMANA;
    private itemsPedidos: ItemPedido[];

    public constructor(numero: number, client: Cliente, diaSem: CalculoDia, mediosDePago?: IMediosDePago) {
        this.numeroDePedido = numero;
        this.cliente = client;
        this.productos = [];
        this.itemsPedidos = [];
        this.precioTotal = 0;
        this.medioDePago = mediosDePago;
        this.estadoDelPedido = ESTADO_PEDIDO.EN_CONSTRUCCION;
        this.diaActual = diaSem.calculoDia();
    }

    public getNumeroDePedido(): number {
        return this.numeroDePedido;
    }

    public getMedioDePago(): IMediosDePago | undefined {
        return this.medioDePago;
    }

    public setMedioDePago(medioPago: IMediosDePago): void {
        this.validarPedidoNoFacturado();
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

        if (this.itemsPedidos.length === 0) {
            return ESTADO_ITEM.PENDIENTE;
        }

        return Math.min(...this.itemsPedidos.map(itemPedido => itemPedido.getEstado())) as ESTADO_ITEM;
    }

    public getItemsAPreparar(): ItemPedido[] {

        return [...this.itemsPedidos];

    }

    public agregarProducto(producto: Producto): void {

        this.validarPedidoEnConstruccion();
        this.productos.push(producto);
        this.calcularPrecio();

    }

    public eliminarProducto(producto: Producto): void {

        this.validarPedidoEnConstruccion();

        const posicion: number = this.productos.indexOf(producto);

        if (posicion >= 0) {
            this.productos.splice(posicion, 1);
        }

        this.calcularPrecio();
    }

    protected calcularPrecio(): void {

        const valorInicial = 0;

        this.precioTotal = this.productos.reduce((acumulador, producto) => 
            acumulador + producto.getPrecio(), valorInicial);
    }

    public confirmarPedido(): void {

        this.validarPedidoEnConstruccion();

        if (this.productos.length === 0) {
            throw new Error("El pedido no tiene items ni combos a confirmar");
        }

        this.itemsPedidos = [];

        for (const producto of this.productos) {
            for (const item of producto.getItems()) {
                this.itemsPedidos.push(new ItemPedido(item));
            }
        }

        this.estadoDelPedido = ESTADO_PEDIDO.CONFIRMADO;
    }

    private validarPedidoEnConstruccion(): void {
        if (this.estadoDelPedido !== ESTADO_PEDIDO.EN_CONSTRUCCION) {
            throw new Error("El pedido no esta en construccion");
        }
    }

    private validarPedidoNoFacturado(): void {
        if (this.estadoDelPedido === ESTADO_PEDIDO.FACTURADO) {
            throw new Error("El pedido esta facturado, no se puede cambiar el metodo de pago.");
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