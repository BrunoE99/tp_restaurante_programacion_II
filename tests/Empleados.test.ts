import Cliente from "../src/empleados-cliente/cliente";
import Mozo from "../src/empleados-cliente/mozo";
import { GestorPedidos } from "../src/pedido/gestor_pedidos";
import { CadenaEstaciones } from "../src/estacion/cadenaEstaciones";
import { SelectorDeDescuento } from "../src/beneficio/SelectorDeDescuento";
import { PedidoSalon } from "../src/pedido/pedido_salon";
import { CalculoDia } from "../src/calculo_dia/dia_actual";

describe("Tests de Cliente y empleados", () => {

  let cliente: Cliente;

  beforeEach(() => {
    cliente = new Cliente(3);
  });

  describe("Cliente", () => {

    it("Debe permitir consultar y cambiar la mesa asignada", () => {
      expect(cliente.getMesaAsignada()).toBe(3);
      cliente.setMesaAsignada(8);
      expect(cliente.getMesaAsignada()).toBe(8);
    });

  });

  describe("Mozo y Cadete", () => {

    let mozo: Mozo;

    beforeEach(() => {
      const gestor = new GestorPedidos(new CadenaEstaciones().getPrimeraEstacion(), new SelectorDeDescuento([]));
      mozo = new Mozo([cliente], [], gestor);
    });

    it("El mozo debe guardar sus clientes y pedidos", () => {
      const pedido = new PedidoSalon(1, cliente, new CalculoDia(), 3);
      const otroCliente = new Cliente(5);

      mozo.setPedidos([pedido]);
      mozo.setClientes([cliente, otroCliente]);

      expect(mozo.getPedidos()).toEqual([pedido]);
      expect(mozo.getClientes()).toEqual([cliente, otroCliente]);
    });

  });

});
