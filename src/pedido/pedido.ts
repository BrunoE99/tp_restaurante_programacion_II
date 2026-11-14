import { DiaSemana } from "../enums/dia_semana"
import { EstadoPedido } from "../enums/estado_pedido"
import { CalculoDia } from "../calculo_dia/dia_actual"
import Cliente from "../empleados-cliente/cliente";
import { ItemPedido } from "./item_pedido";
import Producto from "../menu/producto";
import IMediosDePago from "../medios_de_pago/iMediosDePago";
import { ErrorPedidoEstadoIncorrecto } from "../excepciones/pedido/error_pedido_estado";
import { ErrorPedidoYaFacturado } from "../excepciones/pedido/error_pedido_ya_facturado";
import { ErrorPedidoSinProductos } from "../excepciones/pedido/error_pedido_sin_productos";
import { ErrorPedidoItemsNoListos } from "../excepciones/pedido/error_pedido_items_no_listos";
import { ErrorPedidoNoExisteMedioDePago } from "../excepciones/pedido/error_pedido_no_existe_medio_pago";
import { ErrorPedidoSinAccionesParaDeshacer } from "../excepciones/pedido/error_pedido_sin_acciones_para_deshacer";

export abstract class Pedido { 

    private readonly numeroDePedido: number;
    private cliente: Cliente;
    private productos: Producto[];
    private historial: Producto[][];
    private precioTotal: number;
    private medioDePago: IMediosDePago | undefined;
    private estadoDelPedido: EstadoPedido;
    private diaActual: DiaSemana;
    private itemsPedidos: ItemPedido[];

    public constructor(numero: number, client: Cliente, diaSem: CalculoDia, mediosDePago?: IMediosDePago) {
        this.numeroDePedido = numero;
        this.cliente = client;
        this.productos = [];
        this.historial = [];
        this.itemsPedidos = [];
        this.precioTotal = 0;
        this.medioDePago = mediosDePago;
        this.estadoDelPedido = EstadoPedido.EN_CONSTRUCCION;
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

    public getEstadoPedido(): EstadoPedido {
        return this.estadoDelPedido;
    }

    public getDiaActual(): DiaSemana {
        return this.diaActual;
    }

    public getPrecioTotal(): number {
        return this.precioTotal;
    }

    public getProductos(): Producto[] {
        return [...this.productos];
    }
    
    public todosItemsListos(): boolean {

        return this.itemsPedidos.length > 0 && this.itemsPedidos.every(itemPedido => itemPedido.estaListo());

    }

    public getItemsAPreparar(): ItemPedido[] {

        return [...this.itemsPedidos];

    }

    private guardarEstado(): void {
         
        this.historial.push([...this.productos]);

    }

    public agregarProducto(producto: Producto): void {

        this.validarPedidoEnConstruccion();
        this.guardarEstado();   
        this.productos.push(producto);
        this.calcularPrecio();

    }

    public eliminarProducto(producto: Producto): void {

        this.validarPedidoEnConstruccion();

        this.guardarEstado();

        const posicion: number = this.productos.indexOf(producto);

        if (posicion >= 0) {
            this.productos.splice(posicion, 1);
        }

        this.calcularPrecio();
    }

    public deshacerUltimaAccion(): void {

        this.validarPedidoEnConstruccion();

        if (this.historial.length > 0) {
            this.productos = this.historial.pop()!;
            this.calcularPrecio();
        } else {
            throw new ErrorPedidoSinAccionesParaDeshacer(this.numeroDePedido);
        }
    }

    protected calcularPrecio(): void {

        const valorInicial = 0;

        this.precioTotal = this.productos.reduce((acumulador, producto) => 
            acumulador + producto.getPrecio(), valorInicial);
    }

    public confirmarPedido(): void {

        this.validarPedidoEnConstruccion();

        if (this.productos.length === 0) {
            throw new ErrorPedidoSinProductos(this.numeroDePedido);
        }

        this.itemsPedidos = [];

        for (const producto of this.productos) {
            for (const item of producto.getItems()) {
                this.itemsPedidos.push(new ItemPedido(item, this.numeroDePedido));
            }
        }

        this.estadoDelPedido = EstadoPedido.CONFIRMADO;
    }

    private validarPedidoEnConstruccion(): void {
        if (this.estadoDelPedido !== EstadoPedido.EN_CONSTRUCCION) {
            throw new ErrorPedidoEstadoIncorrecto(this.numeroDePedido, EstadoPedido.EN_CONSTRUCCION);
        }
    }

    private validarPedidoNoFacturado(): void {
        if (this.estadoDelPedido === EstadoPedido.FACTURADO) {
            throw new ErrorPedidoYaFacturado(this.numeroDePedido);
        }
    }

    public facturarPedido(): void {
        if (this.estadoDelPedido !== EstadoPedido.CONFIRMADO) {
            throw new ErrorPedidoEstadoIncorrecto(this.numeroDePedido, EstadoPedido.CONFIRMADO);
        }
        if (!this.todosItemsListos()) {
            throw new ErrorPedidoItemsNoListos(this.numeroDePedido);
        }
        if (this.medioDePago === undefined) {
            throw new ErrorPedidoNoExisteMedioDePago(this.numeroDePedido);
        }

        this.estadoDelPedido = EstadoPedido.FACTURADO;
    }

}