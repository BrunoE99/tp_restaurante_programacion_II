import { DescuentoPorDiaDeSemana } from "../src/beneficio/DescuentoPorDiaDeSemana";
import { PedidoSalon } from "../src/pedido/pedido_salon";
import Cliente from "../src/empleados-cliente/cliente";
import { CalculoDia } from "../src/calculo_dia/dia_actual";
import { Item } from "../src/menu/item";
import { Categoria } from "../src/enums/categoria";
import { DiaSemana } from "../src/enums/dia_semana";

describe("Tests de la clase DescuentoPorDiaDeSemana", () => {

  // 9/11/2026 fue lunes y 10/11/2026 martes (los meses en Date arrancan en 0)
  const LUNES = new Date(2026, 10, 9);
  const MARTES = new Date(2026, 10, 10);

  let descuento: DescuentoPorDiaDeSemana;

  function crearPedido(fecha: Date): PedidoSalon {
    const pedido = new PedidoSalon(1, new Cliente(1), new CalculoDia(fecha), 5);
    pedido.agregarProducto(new Item("Bife", 10000, Categoria.CARNE));
    return pedido;
  }

  beforeEach(() => {
    descuento = new DescuentoPorDiaDeSemana();
  });

  it("Debe aplicar el 15% por defecto si el pedido es de un lunes", () => {
    expect(descuento.calcularDescuento(crearPedido(LUNES))).toBe(1500);
  });

  it("Debe devolver 0 si el pedido no es del dia del descuento", () => {
    expect(descuento.calcularDescuento(crearPedido(MARTES))).toBe(0);
  });

  it("Debe respetar el dia y el porcentaje recibidos por constructor", () => {
    const descuentoMartes = new DescuentoPorDiaDeSemana(DiaSemana.MARTES, 20);
    expect(descuentoMartes.calcularDescuento(crearPedido(MARTES))).toBe(2000);
    expect(descuentoMartes.calcularDescuento(crearPedido(LUNES))).toBe(0);
  });

});
