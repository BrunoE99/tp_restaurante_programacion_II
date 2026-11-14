import Cliente from "../src/empleados-cliente/cliente";
import Mozo from "../src/empleados-cliente/mozo";
import Cadete from "../src/empleados-cliente/cadete";
import MediosDePago from "../src/medios_de_pago/iMediosDePago";
import { GestorPedidos } from "../src/pedido/gestor_pedidos";
import { CadenaEstaciones } from "../src/estacion/cadenaEstaciones";
import { SelectorDeDescuento } from "../src/beneficio/SelectorDeDescuento";
import { PedidoSalon } from "../src/pedido/pedido_salon";
import { CalculoDia } from "../src/calculo_dia/dia_actual";

describe("Tests de Cliente y empleados", () => {

  let cliente: Cliente;
  let medioDePago: MediosDePago;

  beforeEach(() => {
    cliente = new Cliente(3);
    // Mock object del medio de pago para verificar que se le avise del pago
    medioDePago = { pagoCompletado: jest.fn(), aplicaDescuentoEfectivo: jest.fn() };
  });

  describe("Cliente", () => {

    it("Debe permitir consultar y cambiar la mesa asignada", () => {
      expect(cliente.getMesaAsignada()).toBe(3);
      cliente.setMesaAsignada(8);
      expect(cliente.getMesaAsignada()).toBe(8);
    });

    it("Debe completar el pago con el medio de pago elegido", () => {
      cliente.pagarPedido(medioDePago);
      expect(medioDePago.pagoCompletado).toHaveBeenCalledTimes(1);
    });

    it("Debe poder pedir sin lanzar errores", () => {
      expect(() => cliente.pedirPedido()).not.toThrow();
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

    it("El mozo debe cobrarle al cliente con el medio de pago elegido", () => {
      mozo.cobrarPedido(cliente, medioDePago);
      expect(medioDePago.pagoCompletado).toHaveBeenCalledTimes(1);
    });

    it("El cadete tambien debe poder cobrar", () => {
      const cadete = new Cadete([], []);
      cadete.cobrarPedido(cliente, medioDePago);
      expect(medioDePago.pagoCompletado).toHaveBeenCalledTimes(1);
    });

  });

});
