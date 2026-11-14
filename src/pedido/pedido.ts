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

/**
 * Clase base abstracta para un pedido. Pasa por tres estados, siempre en orden:
 * `EN_CONSTRUCCION` donde se agregan y quitan productos, se puede deshacer la ultima modificacion;
 * `CONFIRMADO` donde los productos se desarman en items y se envian a la cadena de estaciones;
 * `FACTURADO` donde todos los items estan listos y el pedido se cobro.
 * 
 * Cada modalidad concreta (`PedidoSalon`, `PedidoRetiro`, `PedidoEnvio`) agrega sus datos particulares.
 * 
 */
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

    /**
     * Crea un nuevo pedido sin productos cargados y precio 0.
     * 
     * @param numero Numero de pedido.
     * @param client Cliente que hace el pedido.
     * @param diaSem Fecha del pedido, que define si tiene descuento por dia.
     * @param mediosDePago Medio de pago, si ya se conoce.
     */
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

    /**
     * @returns El numero del pedido.
     */
    public getNumeroDePedido(): number {
        return this.numeroDePedido;
    }

    /**
     * @returns El medio de pago, o `undefined` si todavia no se definio.
     */
    public getMedioDePago(): IMediosDePago | undefined {
        return this.medioDePago;
    }

    /**
     * Asigna o cambia el medio de pago. Se puede hacer en estado: `EN_CONSTRUCCION` y `CONFIRMADO`.
     * 
     * @param medioPago Medio de pago elegido por el cliente.

     */
    public setMedioDePago(medioPago: IMediosDePago): void {
        this.validarPedidoNoFacturado();
        this.medioDePago = medioPago;
    }

    /**
     * @returns El estado actual del pedido.
     */
    public getEstadoPedido(): EstadoPedido {
        return this.estadoDelPedido;
    }

    /**
     * @returns El dia de semana en el que se creo el pedido.
     */
    public getDiaActual(): DiaSemana {
        return this.diaActual;
    }

    /**
     * @returns Importe total del pedido: la suma de todos sus productos (sin descuentos).
     */
    public getPrecioTotal(): number {
        return this.precioTotal;
    }

    /**
     * @returns Una copia de los productos del pedido; modificarla no altera el pedido.
     */
    public getProductos(): Producto[] {
        return [...this.productos];
    }
    
    /**
     * @returns `true` si existe al menos un {@link ItemPedido} y todos se encuentran en estado `LISTO`;
     * `false` si el pedido no fue confirmado o tiene items pendientes.
     */
    public todosItemsListos(): boolean {

        return this.itemsPedidos.length > 0 && this.itemsPedidos.every(itemPedido => itemPedido.estaListo());

    }
    /**
     * @returns Una copia de los items a preparar.
     */

    public getItemsAPreparar(): ItemPedido[] {

        return [...this.itemsPedidos];

    }

    /**
     * Guarda una copia de los productos actuales en el historial.
     */
    private guardarEstado(): void {
         
        this.historial.push([...this.productos]);

    }

    /**
     * Agrega un producto, item o combo, al pedido y recalcula el precio.
     * 
     * @param producto Producto a agregar.

     */
    public agregarProducto(producto: Producto): void {

        this.validarPedidoEnConstruccion();
        this.guardarEstado();   
        this.productos.push(producto);
        this.calcularPrecio();

    }

    /**
     * Elimina un producto del pedido y recalcula el precio. Si el producto no esta en el pedido, no lo modifica.
     * 
     * @param producto Producto a eliminar.

     */
    public eliminarProducto(producto: Producto): void {

        this.validarPedidoEnConstruccion();

        this.guardarEstado();

        const posicion: number = this.productos.indexOf(producto);

        if (posicion >= 0) {
            this.productos.splice(posicion, 1);
        }

        this.calcularPrecio();
    }

    /**
     * Deshace la ultima modificacion (agregar o quitar un producto), restaurando la lista anterior
     * y recalculando el precio total.
     * Se puede llamar varias veces seguidas para retroceder paso a paso.
     * 


     */
    public deshacerUltimaAccion(): void {

        this.validarPedidoEnConstruccion();

        if (this.historial.length > 0) {
            this.productos = this.historial.pop()!;
            this.calcularPrecio();
        } else {
            throw new ErrorPedidoSinAccionesParaDeshacer(this.numeroDePedido);
        }
    }

    /**
     * Recalcula el precio total sumando los precios individuales de todos los productos.
     */
    protected calcularPrecio(): void {

        const valorInicial = 0;

        this.precioTotal = this.productos.reduce((acumulador, producto) => 
            acumulador + producto.getPrecio(), valorInicial);
    }

    /**
     * Confirma el pedido, descompone cada producto en sus items individuales para crear los {@link ItemPedido}
     * que envia a la cadena de estaciones y cambia el estado a `CONFIRMADO`.
     * 


     */
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

    /**
     * Valida que el pedido este `EN_CONSTRUCCION`.
     * 

     */
    private validarPedidoEnConstruccion(): void {
        if (this.estadoDelPedido !== EstadoPedido.EN_CONSTRUCCION) {
            throw new ErrorPedidoEstadoIncorrecto(this.numeroDePedido, EstadoPedido.EN_CONSTRUCCION);
        }
    }

    /**
     * Valida que el pedido no este `FACTURADO`.
     * 

     */
    private validarPedidoNoFacturado(): void {
        if (this.estadoDelPedido === EstadoPedido.FACTURADO) {
            throw new ErrorPedidoYaFacturado(this.numeroDePedido);
        }
    }

    /**
     * Valida que el pedido este en `CONFIRMADO`, que todos los items esten `LISTO` y que el pedido
     * tenga un medio de pago asignado; para luego facturar el pedido (`CONFIRMADO` -> `FACTURADO`).
     * 



     */
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