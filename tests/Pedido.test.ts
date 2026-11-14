import { PedidoSalon } from "../src/pedido/pedido_salon";
import Cliente from "../src/empleados-cliente/cliente";
import { CalculoDia } from "../src/calculo_dia/dia_actual";
import { Item } from "../src/menu/item";
import { Combo } from "../src/menu/combo";
import { Categoria } from "../src/enums/categoria";
import { DiaSemana } from "../src/enums/dia_semana";
import { EstadoPedido } from "../src/enums/estado_pedido";
import { BeneficioPorPorcentaje } from "../src/beneficio/BeneficioPorPorcentaje";
import Efectivo from "../src/medios_de_pago/efectivo";
import { ErrorPedidoSinAccionesParaDeshacer } from "../src/excepciones/pedido/error_pedido_sin_acciones_para_deshacer";
import { ErrorPedidoSinProductos } from "../src/excepciones/pedido/error_pedido_sin_productos";
import { ErrorPedidoEstadoIncorrecto } from "../src/excepciones/pedido/error_pedido_estado";
import { ErrorPedidoItemsNoListos } from "../src/excepciones/pedido/error_pedido_items_no_listos";
import { ErrorPedidoNoExisteMedioDePago } from "../src/excepciones/pedido/error_pedido_no_existe_medio_pago";
import { ErrorPedidoYaFacturado } from "../src/excepciones/pedido/error_pedido_ya_facturado";

describe("Tests de la clase Pedido", () => {

  let pedido: PedidoSalon;
  let hamburguesa: Item;
  let gaseosa: Item;

  function prepararTodosLosItems(): void {
    for (const itemPedido of pedido.getItemsAPreparar()) {
      itemPedido.iniciarPreparacion();
      itemPedido.marcarListo();
    }
  }

  beforeEach(() => {
    pedido = new PedidoSalon(1, new Cliente(1), new CalculoDia(new Date(2026, 10, 9)), 5);
    hamburguesa = new Item("Hamburguesa", 5000, Categoria.CARNE);
    gaseosa = new Item("Gaseosa", 1500, Categoria.BEBIDA);
  });

  describe("Datos del pedido", () => {

    it("Debe arrancar en construccion, sin productos y con precio 0", () => {
      expect(pedido.getNumeroDePedido()).toBe(1);
      expect(pedido.getEstadoPedido()).toBe(EstadoPedido.EN_CONSTRUCCION);
      expect(pedido.getProductos()).toEqual([]);
      expect(pedido.getPrecioTotal()).toBe(0);
      expect(pedido.getMedioDePago()).toBeUndefined();
    });

    it("Debe guardar el dia de la semana en que se creo", () => {
      expect(pedido.getDiaActual()).toBe(DiaSemana.LUNES);
    });

    it("Debe permitir elegir el medio de pago", () => {
      const efectivo = new Efectivo();
      pedido.setMedioDePago(efectivo);
      expect(pedido.getMedioDePago()).toBe(efectivo);
    });

  });

  describe("Agregar y quitar productos", () => {

    it("Debe sumar el precio de los productos agregados", () => {
      pedido.agregarProducto(hamburguesa);
      pedido.agregarProducto(gaseosa);
      expect(pedido.getProductos()).toEqual([hamburguesa, gaseosa]);
      expect(pedido.getPrecioTotal()).toBe(6500);
    });

    it("Debe contemplar el beneficio de un combo en el precio", () => {
      const combo = new Combo("Combo", [hamburguesa, gaseosa], new BeneficioPorPorcentaje(10));
      pedido.agregarProducto(combo);
      expect(pedido.getPrecioTotal()).toBe(5850);
    });

    it("Debe eliminar un producto y recalcular el precio", () => {
      pedido.agregarProducto(hamburguesa);
      pedido.agregarProducto(gaseosa);
      pedido.eliminarProducto(hamburguesa);
      expect(pedido.getProductos()).toEqual([gaseosa]);
      expect(pedido.getPrecioTotal()).toBe(1500);
    });

    it("No debe cambiar nada si se elimina un producto que no esta", () => {
      pedido.agregarProducto(hamburguesa);
      pedido.eliminarProducto(gaseosa);
      expect(pedido.getProductos()).toEqual([hamburguesa]);
    });

    it("Debe devolver una copia de los productos", () => {
      pedido.agregarProducto(hamburguesa);
      pedido.getProductos().push(gaseosa);
      expect(pedido.getProductos()).toEqual([hamburguesa]);
    });

  });

  describe("Deshacer la ultima accion", () => {

    it("Debe deshacer el ultimo producto agregado", () => {
      pedido.agregarProducto(hamburguesa);
      pedido.agregarProducto(gaseosa);
      pedido.deshacerUltimaAccion();
      expect(pedido.getProductos()).toEqual([hamburguesa]);
      expect(pedido.getPrecioTotal()).toBe(5000);
    });

    it("Debe recuperar un producto eliminado", () => {
      pedido.agregarProducto(hamburguesa);
      pedido.eliminarProducto(hamburguesa);
      pedido.deshacerUltimaAccion();
      expect(pedido.getProductos()).toEqual([hamburguesa]);
    });

    it("Debe poder deshacer varias veces seguidas hasta el pedido vacio", () => {
      pedido.agregarProducto(hamburguesa);
      pedido.agregarProducto(gaseosa);
      pedido.deshacerUltimaAccion();
      pedido.deshacerUltimaAccion();
      expect(pedido.getProductos()).toEqual([]);
      expect(pedido.getPrecioTotal()).toBe(0);
    });

    it("Debe lanzar error si no hay acciones para deshacer", () => {
      expect(() => pedido.deshacerUltimaAccion()).toThrow(ErrorPedidoSinAccionesParaDeshacer);
    });

  });

  describe("Confirmar pedido", () => {

    it("Debe lanzar error si se confirma sin productos", () => {
      expect(() => pedido.confirmarPedido()).toThrow(ErrorPedidoSinProductos);
    });

    it("Debe generar un item a preparar por cada item, incluidos los del combo", () => {
      const flan = new Item("Flan", 1800, Categoria.POSTRE);
      pedido.agregarProducto(new Combo("Combo", [hamburguesa, gaseosa], new BeneficioPorPorcentaje(10)));
      pedido.agregarProducto(flan);

      pedido.confirmarPedido();

      const nombres = pedido.getItemsAPreparar().map(itemPedido => itemPedido.getNombre());
      expect(nombres).toEqual(["Hamburguesa", "Gaseosa", "Flan"]);
      expect(pedido.getEstadoPedido()).toBe(EstadoPedido.CONFIRMADO);
    });

    it("No debe permitir modificar ni deshacer despues de confirmar", () => {
      pedido.agregarProducto(hamburguesa);
      pedido.confirmarPedido();

      expect(() => pedido.agregarProducto(gaseosa)).toThrow(ErrorPedidoEstadoIncorrecto);
      expect(() => pedido.eliminarProducto(hamburguesa)).toThrow(ErrorPedidoEstadoIncorrecto);
      expect(() => pedido.deshacerUltimaAccion()).toThrow(ErrorPedidoEstadoIncorrecto);
      expect(() => pedido.confirmarPedido()).toThrow(ErrorPedidoEstadoIncorrecto);
    });

  });

  describe("Facturar pedido", () => {

    beforeEach(() => {
      pedido.agregarProducto(hamburguesa);
    });

    it("Debe lanzar error si el pedido no esta confirmado", () => {
      expect(() => pedido.facturarPedido()).toThrow(ErrorPedidoEstadoIncorrecto);
    });

    it("No debe facturar si los items no estan listos", () => {
      pedido.setMedioDePago(new Efectivo());
      pedido.confirmarPedido();
      expect(pedido.todosItemsListos()).toBe(false);
      expect(() => pedido.facturarPedido()).toThrow(ErrorPedidoItemsNoListos);
    });

    it("Debe lanzar error si no hay medio de pago", () => {
      pedido.confirmarPedido();
      prepararTodosLosItems();
      expect(() => pedido.facturarPedido()).toThrow(ErrorPedidoNoExisteMedioDePago);
    });

    it("Debe quedar facturado si esta confirmado, listo y con medio de pago", () => {
      pedido.setMedioDePago(new Efectivo());
      pedido.confirmarPedido();
      prepararTodosLosItems();

      pedido.facturarPedido();

      expect(pedido.todosItemsListos()).toBe(true);
      expect(pedido.getEstadoPedido()).toBe(EstadoPedido.FACTURADO);
    });

    it("No debe permitir cambiar el medio de pago de un pedido facturado", () => {
      pedido.setMedioDePago(new Efectivo());
      pedido.confirmarPedido();
      prepararTodosLosItems();
      pedido.facturarPedido();

      expect(() => pedido.setMedioDePago(new Efectivo())).toThrow(ErrorPedidoYaFacturado);
    });

  });

});
