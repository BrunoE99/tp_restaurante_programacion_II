import { FabricaPedidoSalon } from "../src/pedido/fabrica/fabrica_pedido_salon";
import { FabricaPedidoRetiro } from "../src/pedido/fabrica/fabrica_pedido_retiro";
import { FabricaPedidoEnvio } from "../src/pedido/fabrica/fabrica_pedido_envio";
import { PedidoSalon } from "../src/pedido/pedido_salon";
import { PedidoRetiro } from "../src/pedido/pedido_retiro";
import { PedidoEnvio } from "../src/pedido/pedido_envio";
import Cliente from "../src/empleados-cliente/cliente";
import { CalculoDia } from "../src/calculo_dia/dia_actual";
import Efectivo from "../src/medios_de_pago/efectivo";

describe("Tests de las fabricas de pedidos", () => {

  let cliente: Cliente;
  let dia: CalculoDia;

  beforeEach(() => {
    cliente = new Cliente(1);
    dia = new CalculoDia();
  });

  it("La fabrica de salon debe crear un PedidoSalon con el numero indicado", () => {
    const pedido = new FabricaPedidoSalon(cliente, dia, 4).crearPedido(10);
    expect(pedido).toBeInstanceOf(PedidoSalon);
    expect(pedido.getNumeroDePedido()).toBe(10);
  });

  it("La fabrica de retiro debe crear un PedidoRetiro", () => {
    const pedido = new FabricaPedidoRetiro(cliente, dia, 2130, "1155554444").crearPedido(11);
    expect(pedido).toBeInstanceOf(PedidoRetiro);
    expect(pedido.getNumeroDePedido()).toBe(11);
  });

  it("La fabrica de envio debe crear un PedidoEnvio con el medio de pago recibido", () => {
    const efectivo = new Efectivo();
    const pedido = new FabricaPedidoEnvio(cliente, dia, "Av. Maipu 1200", efectivo).crearPedido(12);
    expect(pedido).toBeInstanceOf(PedidoEnvio);
    expect(pedido.getMedioDePago()).toBe(efectivo);
  });

});
