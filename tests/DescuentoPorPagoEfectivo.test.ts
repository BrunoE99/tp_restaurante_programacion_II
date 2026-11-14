import { DescuentoPorPagoEfectivo } from "../src/beneficio/DescuentoPorPagoEfectivo";
import { PedidoSalon } from "../src/pedido/pedido_salon";
import Cliente from "../src/empleados-cliente/cliente";
import { CalculoDia } from "../src/calculo_dia/dia_actual";
import { Item } from "../src/menu/item";
import { Categoria } from "../src/enums/categoria";
import Efectivo from "../src/medios_de_pago/efectivo";
import BilleteraVirtual from "../src/medios_de_pago/billeteraVirtual";

describe("Tests de la clase DescuentoPorPagoEfectivo", () => {

  let descuento: DescuentoPorPagoEfectivo;
  let pedido: PedidoSalon;

  beforeEach(() => {
    descuento = new DescuentoPorPagoEfectivo();
    pedido = new PedidoSalon(1, new Cliente(1), new CalculoDia(), 5);
    pedido.agregarProducto(new Item("Bife", 10000, Categoria.CARNE));
  });

  it("Debe devolver 0 si el pedido no tiene medio de pago", () => {
    expect(descuento.calcularDescuento(pedido)).toBe(0);
  });

  it("Debe devolver 0 si el medio de pago no es efectivo", () => {
    pedido.setMedioDePago(new BilleteraVirtual());
    expect(descuento.calcularDescuento(pedido)).toBe(0);
  });

  it("Debe devolver el 10% del total si se paga en efectivo", () => {
    pedido.setMedioDePago(new Efectivo());
    expect(descuento.calcularDescuento(pedido)).toBe(1000);
  });

  it("Debe usar el porcentaje recibido por constructor", () => {
    const descuentoDel20 = new DescuentoPorPagoEfectivo(20);
    pedido.setMedioDePago(new Efectivo());
    expect(descuentoDel20.calcularDescuento(pedido)).toBe(2000);
  });

});
