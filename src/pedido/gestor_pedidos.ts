import IMediosDePago from "../medios_de_pago/iMediosDePago";
import Estacion from "../estacion/estacion";
import { Pedido } from "./pedido";
import Producto from "../menu/producto";
import { NumeradorPedidos } from "./numerador_pedidos";
import { FabricaPedido } from "./fabrica/fabrica_pedido";
import { ErrorPedidoNoExiste } from "../excepciones/pedido/error_pedido_no_existe";
import { SelectorDeDescuento } from "../beneficio/SelectorDeDescuento";
import { Factura } from "./factura";

/**
 * Punto de entrada para operar con los pedidos.
 * 
 * Gestiona el registro de pedidos mediante fabricas {@link FabricaPedido}, la identificacion por numeros
 * {@link NumeradorPedidos}, la edicion de productos, el envio de items a la cadena de estaciones,
 * la aplicacion del mejor descuento disponible y la emision de la factura.
 * 
 * Mantiene separados los pedidos activos `pedidosEnCurso` de los ya cerrados y facturados `historialDePedidos`. 
 */
export class GestorPedidos {

    private pedidosEnCurso: Map<number, Pedido>;
    private historialDePedidos: Map<number, Pedido>;
    private primeraEstacion: Estacion;
    private numerador: NumeradorPedidos;
    private selectorDeDescuento: SelectorDeDescuento;
    private facturas: Map<number, Factura>;

    /**
     * @param primeraEstacion Primera estacion de la cadena de estaciones de cocina {@link CadenaEstaciones}.
     * @param selectorDeDescuento Evaluador de promociones al momento de facturar {@link SelectorDeDescuento}.
     */
    public constructor(primeraEstacion: Estacion, selectorDeDescuento: SelectorDeDescuento) {
        this.pedidosEnCurso = new Map<number, Pedido>();
        this.historialDePedidos = new Map<number, Pedido>();
        this.primeraEstacion = primeraEstacion;
        this.numerador = new NumeradorPedidos();
        this.selectorDeDescuento = selectorDeDescuento;
        this.facturas = new Map<number, Factura>();
    }

    /**
     * Crea y registra un nuevo pedido utilizando la fabrica que recibe y asignandole el numero siguiente.
     * 
     * @param fabrica Fabrica de la modalidad: salon, delivery o take-away.
     * @returns Numero unico asignado al pedido.
     */
    public registrarPedido(fabrica: FabricaPedido): number {
        const numero = this.numerador.siguienteNumero();
        const pedido = fabrica.crearPedido(numero);

        this.pedidosEnCurso.set(numero, pedido);

        return numero;
    }

    /**
     * @param numero Numero del pedido.
     * @returns El pedido en curso con ese numero.
     * @throws {@link ErrorPedidoNoExiste} Si no existe un pedido en curso con ese numero.
     */
    public getPedidoEnCurso(numero: number): Pedido {
        return this.buscarPedidoEnCurso(numero);
    }

    /**
     * Asigna el medio de pago a un pedido en curso.
     * 
     * @param numero Numero del pedido.
     * @param medioPago Medio de pago con el que el cliente pagara.
     * @throws {@link ErrorPedidoNoExiste} Si no hay un pedido en curso con ese numero.
     */
    public pedidoPago(numero: number, medioPago: IMediosDePago): void {
        this.buscarPedidoEnCurso(numero).setMedioDePago(medioPago);
    }

    /**
     * @returns Nuevo array con las instancias de Pedido almacenadas en `historialDePedidos`.
     */
    public getHistorial(): Pedido[] {
        const pedidosCompleto: Pedido[] = Array.from(this.historialDePedidos.values());

        return pedidosCompleto;
    }

    /**
     * Busca un pedido finalizado dentro del historial por su numero.
     * 
     * @param numPedido Numero del pedido.
     * @returns El pedido facturado con ese numero.
     * @throws {@link ErrorPedidoNoExiste} Si el numero no corresponde a ningun pedido en el historial.
     */
    public consultarHistorialPedido(numPedido: number): Pedido {
        const pedidoConsultado = this.historialDePedidos.get(numPedido);

        if (pedidoConsultado === undefined) {
            throw new ErrorPedidoNoExiste(numPedido);
        }

        return pedidoConsultado;
    }

    /**
     * @param numPedido Numero del pedido.
     * @returns La factura generada al facturar el pedido.
     * @throws {@link ErrorPedidoNoExiste} Si ese numero de pedido no tiene factura asociada.
     */
    public consultarFactura(numPedido: number): Factura {
        const factura = this.facturas.get(numPedido);

        if (factura === undefined) {
            throw new ErrorPedidoNoExiste(numPedido);
        }

        return factura;
    }

    /**
     * Agrega un producto a un pedido en construccion.
     * 
     * @param numero Numero del pedido.
     * @param producto Producto, item o combo, a agregar.
     * @throws {@link ErrorPedidoNoExiste} Si no hay pedido en curso con ese numero.
     * @throws {@link ErrorPedidoEstadoIncorrecto} Si el pedido ya no esta `EN_CONSTRUCCION`.
     */
    public agregarProducto(numero: number, producto: Producto): void {
        this.buscarPedidoEnCurso(numero).agregarProducto(producto);
    }

    /**
     * Elimina un producto de un pedido en construccion.
     * 
     * @param numero Numero del pedido.
     * @param producto Producto, item o combo, a eliminar.
     * @throws {@link ErrorPedidoNoExiste} Si no hay pedido en curso con ese numero.
     * @throws {@link ErrorPedidoEstadoIncorrecto} Si el pedido ya no esta `EN_CONSTRUCCION`.
     */
    public eliminarProducto(numero: number, producto: Producto): void {
        this.buscarPedidoEnCurso(numero).eliminarProducto(producto);
    }

    /**
     * Confirma un pedido en curso y envia sus items individuales a la primera estacion de la cadena.
     * 
     * @param numero Numero de pedido.
     * @throws {@link ErrorPedidoNoExiste} Si no hay pedido en curso con ese numero.
     * @throws {@link ErrorPedidoEstadoIncorrecto} Si el pedido ya no esta `EN_CONSTRUCCION`.
     * @throws {@link ErrorPedidoSinProductos} Si el pedido no tiene productos.
     * @throws {@link ErrorEstacionNoEncontrada} Si algun item no tiene estacion que lo prepare.
     */
    public confirmarPedido(numero: number): void {
        const pedido = this.buscarPedidoEnCurso(numero);

        pedido.confirmarPedido();
        this.asignarAEstaciones(pedido);
    }

    /**
     * Cierra y factura un pedido: lo pasa a `FACTURADO`, aplica el mayor descuento posible,
     * crea la factura y lo mueve al historial.
     * 
     * @param numero Numero del pedido.
     * @returns La factura generada.
     * @throws {@link ErrorPedidoNoExiste} Si no hay pedido en curso con ese numero.
     * @throws {@link ErrorPedidoEstadoIncorrecto} Si el pedido ya no esta `EN_CONSTRUCCION`.
     * @throws {@link ErrorPedidoItemsNoListos} Si algun item todavia no esta `LISTO`.
     * @throws {@link ErrorPedidoNoExisteMedioDePago} Si no existe medio de pago.
     */
    public facturarPedido(numero: number): Factura {
        const pedido = this.buscarPedidoEnCurso(numero);

        pedido.facturarPedido();
        const factura = new Factura(pedido, this.selectorDeDescuento.obtenerMejorDescuento(pedido));
        this.facturas.set(numero, factura);
        this.historialDePedidos.set(numero, pedido);
        this.pedidosEnCurso.delete(numero);
        return factura;
    }

    /**
     * Busca un pedido con su numero.
     * 
     * @param numPedido Numero de pedido a buscar.
     * @returns Pedido encontrado con el numero correspondiente.
     * @throws {@link ErrorPedidoNoExiste} Si no hay pedido en curso con ese numero.
     */
    private buscarPedidoEnCurso(numPedido: number): Pedido {
        const pedido = this.pedidosEnCurso.get(numPedido);

        if (pedido === undefined) {
            throw new ErrorPedidoNoExiste(numPedido);
        }

        return pedido;
    }

    /**
     * Entrega cada item del pedido a la primera estacion de la cadena.
     * 
     * @param pedido Pedido completo.
     */
    private asignarAEstaciones(pedido: Pedido): void {
        for (const item of pedido.getItemsAPreparar()) {
            this.primeraEstacion.recibir(item);
        }
    }

}