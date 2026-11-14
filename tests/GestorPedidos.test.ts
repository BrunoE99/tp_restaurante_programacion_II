import { GestorPedidos } from "../src/pedido/gestor_pedidos";
import { CadenaEstaciones } from "../src/estacion/cadenaEstaciones";
import { SelectorDeDescuento } from "../src/beneficio/SelectorDeDescuento";
import { DescuentoPorPagoEfectivo } from "../src/beneficio/DescuentoPorPagoEfectivo";
import { FabricaPedidoSalon } from "../src/pedido/fabrica/fabrica_pedido_salon";
import Cliente from "../src/empleados-cliente/cliente";
import { CalculoDia } from "../src/calculo_dia/dia_actual";
import { Item } from "../src/menu/item";
import { Categoria } from "../src/enums/categoria";
import { EstadoPedido } from "../src/enums/estado_pedido";
import Efectivo from "../src/medios_de_pago/efectivo";
import { ErrorPedidoNoExiste } from "../src/excepciones/pedido/error_pedido_no_existe";

describe("Tests de la clase GestorPedidos", () => {

  let cadena: CadenaEstaciones;
  let gestor: GestorPedidos;
  let fabrica: FabricaPedidoSalon;
  let bife: Item;
  let gaseosa: Item;

  function prepararTodo(): void {
    for (const estacion of cadena.getEstaciones()) {
      while (estacion.tieneItemsEnCola()) {
        estacion.finalizar(estacion.iniciarSiguiente());
      }
    }
  }

  beforeEach(() => {
    cadena = new CadenaEstaciones();
    gestor = new GestorPedidos(cadena.getPrimeraEstacion(), new SelectorDeDescuento([new DescuentoPorPagoEfectivo()]));
    fabrica = new FabricaPedidoSalon(new Cliente(1), new CalculoDia(), 4);
    bife = new Item("Bife", 9000, Categoria.CARNE);
    gaseosa = new Item("Gaseosa", 1000, Categoria.BEBIDA);
  });

  it("Debe numerar los pedidos registrados de forma consecutiva", () => {
    expect(gestor.registrarPedido(fabrica)).toBe(1);
    expect(gestor.registrarPedido(fabrica)).toBe(2);
  });

  it("Debe devolver el pedido en curso por su numero", () => {
    const numero = gestor.registrarPedido(fabrica);
    expect(gestor.getPedidoEnCurso(numero).getNumeroDePedido()).toBe(numero);
  });

  it("Debe lanzar error si el pedido no existe", () => {
    expect(() => gestor.getPedidoEnCurso(99)).toThrow(ErrorPedidoNoExiste);
    expect(() => gestor.consultarHistorialPedido(99)).toThrow(ErrorPedidoNoExiste);
    expect(() => gestor.consultarFactura(99)).toThrow(ErrorPedidoNoExiste);
  });

  it("Debe agregar y quitar productos de un pedido en curso", () => {
    const numero = gestor.registrarPedido(fabrica);

    gestor.agregarProducto(numero, bife);
    gestor.agregarProducto(numero, gaseosa);
    gestor.eliminarProducto(numero, bife);

    expect(gestor.getPedidoEnCurso(numero).getProductos()).toEqual([gaseosa]);
  });

  it("Debe asignar el medio de pago al pedido", () => {
    const numero = gestor.registrarPedido(fabrica);
    const efectivo = new Efectivo();

    gestor.pedidoPago(numero, efectivo);

    expect(gestor.getPedidoEnCurso(numero).getMedioDePago()).toBe(efectivo);
  });

  it("Debe mandar los items a las estaciones al confirmar", () => {
    const numero = gestor.registrarPedido(fabrica);
    gestor.agregarProducto(numero, bife);
    gestor.agregarProducto(numero, gaseosa);

    gestor.confirmarPedido(numero);

    const [parrilla, barra] = cadena.getEstaciones();
    expect(parrilla.tieneItemsEnCola()).toBe(true);
    expect(barra.tieneItemsEnCola()).toBe(true);
  });

  it("Debe facturar con el mejor descuento y pasar el pedido al historial", () => {
    const numero = gestor.registrarPedido(fabrica);
    gestor.agregarProducto(numero, bife);
    gestor.agregarProducto(numero, gaseosa);
    gestor.pedidoPago(numero, new Efectivo());
    gestor.confirmarPedido(numero);
    prepararTodo();

    const factura = gestor.facturarPedido(numero);

    expect(factura.getSubtotal()).toBe(10000);
    expect(factura.getDescuento()).toBe(1000);
    expect(factura.getTotal()).toBe(9000);
    expect(gestor.consultarFactura(numero)).toBe(factura);
    expect(gestor.consultarHistorialPedido(numero).getEstadoPedido()).toBe(EstadoPedido.FACTURADO);
    expect(gestor.getHistorial()).toHaveLength(1);
    expect(() => gestor.getPedidoEnCurso(numero)).toThrow(ErrorPedidoNoExiste);
  });

});
