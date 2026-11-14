import { SelectorDeDescuento } from "../src/beneficio/SelectorDeDescuento";
import { Descuento } from "../src/beneficio/Descuento";
import { DescuentoPorPagoEfectivo } from "../src/beneficio/DescuentoPorPagoEfectivo";
import { DescuentoPorDiaDeSemana } from "../src/beneficio/DescuentoPorDiaDeSemana";
import { PedidoSalon } from "../src/pedido/pedido_salon";
import Cliente from "../src/empleados-cliente/cliente";
import { CalculoDia } from "../src/calculo_dia/dia_actual";
import { Item } from "../src/menu/item";
import { Categoria } from "../src/enums/categoria";
import Efectivo from "../src/medios_de_pago/efectivo";

describe("Tests de la clase SelectorDeDescuento", () => {

  const LUNES = new Date(2026, 10, 9);
  const MARTES = new Date(2026, 10, 10);

  let pedido: PedidoSalon;

  // Mock object: un descuento que siempre devuelve el monto que le indicamos
  function descuentoFijo(monto: number): Descuento {
    return { calcularDescuento: () => monto };
  }

  function crearPedidoEnEfectivo(fecha: Date): PedidoSalon {
    const nuevoPedido = new PedidoSalon(1, new Cliente(1), new CalculoDia(fecha), 5, new Efectivo());
    nuevoPedido.agregarProducto(new Item("Bife", 10000, Categoria.CARNE));
    return nuevoPedido;
  }

  beforeEach(() => {
    pedido = crearPedidoEnEfectivo(MARTES);
  });

  it("Debe devolver 0 si no hay descuentos cargados", () => {
    const selector = new SelectorDeDescuento([]);
    expect(selector.obtenerMejorDescuento(pedido)).toBe(0);
  });

  it("Debe elegir el descuento mas grande sin combinarlos", () => {
    const selector = new SelectorDeDescuento([descuentoFijo(300), descuentoFijo(900), descuentoFijo(500)]);
    expect(selector.obtenerMejorDescuento(pedido)).toBe(900);
  });

  it("Debe calcular el total a cobrar restando el mejor descuento", () => {
    const selector = new SelectorDeDescuento([descuentoFijo(300), descuentoFijo(900)]);
    expect(selector.calcularTotalACobrar(pedido)).toBe(9100);
  });

  it("Debe aplicar el descuento del lunes si es mayor que el de efectivo", () => {
    const selector = new SelectorDeDescuento([new DescuentoPorPagoEfectivo(), new DescuentoPorDiaDeSemana()]);
    const pedidoLunes = crearPedidoEnEfectivo(LUNES);
    expect(selector.obtenerMejorDescuento(pedidoLunes)).toBe(1500);
    expect(selector.calcularTotalACobrar(pedidoLunes)).toBe(8500);
  });

  it("Debe aplicar solo el de efectivo si no es el dia del descuento", () => {
    const selector = new SelectorDeDescuento([new DescuentoPorPagoEfectivo(), new DescuentoPorDiaDeSemana()]);
    expect(selector.obtenerMejorDescuento(pedido)).toBe(1000);
  });

});
