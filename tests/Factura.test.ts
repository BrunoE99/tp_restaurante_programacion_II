import { Factura } from "../src/pedido/factura";
import { PedidoSalon } from "../src/pedido/pedido_salon";
import Cliente from "../src/empleados-cliente/cliente";
import { CalculoDia } from "../src/calculo_dia/dia_actual";
import { Item } from "../src/menu/item";
import { Categoria } from "../src/enums/categoria";

describe("Tests de la clase Factura", () => {

  let pedido: PedidoSalon;
  let factura: Factura;

  beforeEach(() => {
    pedido = new PedidoSalon(7, new Cliente(1), new CalculoDia(), 5);
    pedido.agregarProducto(new Item("Hamburguesa", 5000, Categoria.CARNE));
    pedido.agregarProducto(new Item("Gaseosa", 1500, Categoria.BEBIDA));
    factura = new Factura(pedido, 650);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Debe tomar el numero de pedido", () => {
    expect(factura.getNumeroDePedido()).toBe(7);
  });

  it("Debe tener una linea por cada producto con su nombre y precio", () => {
    expect(factura.getLineas()).toEqual([
      { nombreProducto: "Hamburguesa", precioProducto: 5000 },
      { nombreProducto: "Gaseosa", precioProducto: 1500 }
    ]);
  });

  it("Debe calcular el total restando el descuento al subtotal", () => {
    expect(factura.getSubtotal()).toBe(6500);
    expect(factura.getDescuento()).toBe(650);
    expect(factura.getTotal()).toBe(5850);
  });

  it("Debe mostrar el detalle de la factura por consola", () => {
    const consola = jest.spyOn(console, "log").mockImplementation(() => undefined);

    factura.mostrarFactura();

    expect(consola).toHaveBeenCalledWith("Factura del pedido 7:");
    expect(consola).toHaveBeenCalledWith("Hamburguesa: $5000.00");
    expect(consola).toHaveBeenCalledWith("Total: $5850.00");
  });

});
