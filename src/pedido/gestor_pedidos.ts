import IMediosDePago from "../medios_de_pago/iMediosDePago";
import Estacion from "../estacion/estacion";
import { Pedido } from "./pedido";
import Producto from "../menu/producto";
import { NumeradorPedidos } from "./numerador_pedidos";
import { FabricaPedido } from "./fabrica/fabrica_pedido";
import { ErrorPedidoNoExiste } from "../excepciones/pedido/error_pedido_no_existe";
import { SelectorDeDescuento } from "../beneficio/SelectorDeDescuento";
import { Factura } from "./factura";

export class GestorPedidos {

    private pedidosEnCurso: Map<number, Pedido>;
    private historialDePedidos: Map<number, Pedido>;
    private primeraEstacion: Estacion;
    private numerador: NumeradorPedidos;
    private selectorDeDescuento: SelectorDeDescuento;
    private facturas: Map<number, Factura>;

    public constructor(primeraEstacion: Estacion, selectorDeDescuento: SelectorDeDescuento) {
        this.pedidosEnCurso = new Map<number, Pedido>();
        this.historialDePedidos = new Map<number, Pedido>();
        this.primeraEstacion = primeraEstacion;
        this.numerador = new NumeradorPedidos();
        this.selectorDeDescuento = selectorDeDescuento;
        this.facturas = new Map<number, Factura>();
    }

    public registrarPedido(fabrica: FabricaPedido): number {
        const numero = this.numerador.siguienteNumero();
        const pedido = fabrica.crearPedido(numero);

        this.pedidosEnCurso.set(numero, pedido);

        return numero;
    }

    public getPedidoEnCurso(numero: number): Pedido {
        return this.buscarPedidoEnCurso(numero);
    }

    public pedidoPago(numero: number, medioPago: IMediosDePago): void {
        this.buscarPedidoEnCurso(numero).setMedioDePago(medioPago);
    }

    public getHistorial(): Pedido[] {
        const pedidosCompleto: Pedido[] = Array.from(this.historialDePedidos.values());

        return pedidosCompleto;
    }

    public consultarHistorialPedido(numPedido: number): Pedido {
        const pedidoConsultado = this.historialDePedidos.get(numPedido);

        if (pedidoConsultado === undefined) {
            throw new ErrorPedidoNoExiste(numPedido);
        }

        return pedidoConsultado;
    }

     public consultarFactura(numPedido: number): Factura {
        const factura = this.facturas.get(numPedido);

        if (factura === undefined) {
            throw new ErrorPedidoNoExiste(numPedido);
        }

        return factura;
    }

    public agregarProducto(numero: number, producto: Producto): void {
        this.buscarPedidoEnCurso(numero).agregarProducto(producto);
    }

    public eliminarProducto(numero: number, producto: Producto): void {
        this.buscarPedidoEnCurso(numero).eliminarProducto(producto);
    }

    public confirmarPedido(numero: number): void {
        const pedido = this.buscarPedidoEnCurso(numero);

        pedido.confirmarPedido();
        this.asignarAEstaciones(pedido);
    }

    public facturarPedido(numero: number): Factura {
        const pedido = this.buscarPedidoEnCurso(numero);

        pedido.facturarPedido();
        const factura = new Factura(pedido, this.selectorDeDescuento.obtenerMejorDescuento(pedido));
        this.facturas.set(numero, factura);
        this.historialDePedidos.set(numero, pedido);
        this.pedidosEnCurso.delete(numero);
        return factura;
    }

    private buscarPedidoEnCurso(numPedido: number): Pedido {
        const pedido = this.pedidosEnCurso.get(numPedido);

        if (pedido === undefined) {
            throw new ErrorPedidoNoExiste(numPedido);
        }

        return pedido;
    }

    private asignarAEstaciones(pedido: Pedido): void {
        for (const item of pedido.getItemsAPreparar()) {
            this.primeraEstacion.recibir(item);
        }
    }

}