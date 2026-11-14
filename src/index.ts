import { Item } from "./menu/item";
import { Combo } from "./menu/combo";
import { Menu } from "./menu/menu";
import { Categoria } from "./enums/categoria";
import { BeneficioPorPorcentaje } from "./beneficio/BeneficioPorPorcentaje";
import Cliente from "./empleados-cliente/cliente";
import { CalculoDia } from "./calculo_dia/dia_actual";
import Efectivo from "./medios_de_pago/efectivo";
import { GestorPedidos } from "./pedido/gestor_pedidos";
import { FabricaPedidoSalon } from "./pedido/fabrica/fabrica_pedido_salon";
import { CadenaEstaciones } from "./estacion/cadenaEstaciones";
import { ErrorRestaurante } from "./excepciones/error_restaurante";
import { FabricaPedido } from "./pedido/fabrica/fabrica_pedido";
import Producto from "./menu/producto";
import { FabricaPedidoRetiro } from "./pedido/fabrica/fabrica_pedido_retiro";
import BilleteraVirtual from "./medios_de_pago/billeteraVirtual";
import { FabricaPedidoEnvio } from "./pedido/fabrica/fabrica_pedido_envio";
import { DescuentoPorDiaDeSemana } from "./beneficio/DescuentoPorDiaDeSemana";
import { SelectorDeDescuento } from "./beneficio/SelectorDeDescuento";
import { DescuentoPorPagoEfectivo } from "./beneficio/DescuentoPorPagoEfectivo";

// Creacion de items y combos
const hamburguesa = new Item("Hamburguesa", 5000, Categoria.CARNE);
const bife = new Item("Bife de chorizo", 9000, Categoria.CARNE);
const ensaladaCesar = new Item("Ensalada cesar", 2000, Categoria.ENSALADA);
const gaseosa = new Item("Gaseosa", 1500, Categoria.BEBIDA);
const flan = new Item("Flan", 1800, Categoria.POSTRE);

const comboHamburguesa = new Combo(
  "Combo Hamburguesa", [hamburguesa, ensaladaCesar, gaseosa], new BeneficioPorPorcentaje(10));

const comboParrillero = new Combo(
    "Combo Parrillero", [bife, gaseosa, flan], new BeneficioPorPorcentaje(12));

const itemsDeLaCarta = [hamburguesa, bife, ensaladaCesar, gaseosa, flan];

// Creacion de funciones para que el try/catch sea mas legible
function armarMenu(): Menu {
  const menu = new Menu();

  for (const item of itemsDeLaCarta) {
    menu.agregarItem(item);
  }

  menu.agregarCombo(comboHamburguesa);
  menu.agregarCombo(comboParrillero);

  return menu;
}

function registrarPedido(gestor: GestorPedidos, fabrica: FabricaPedido, productos: Producto[]): number {
  const numero = gestor.registrarPedido(fabrica);

  for (const producto of productos) {
    gestor.agregarProducto(numero, producto);
  }

  gestor.confirmarPedido(numero);

  return numero;
}

function prepararEnCocina(cadena: CadenaEstaciones): void {
  for (const estacion of cadena.getEstaciones()) {
    while (estacion.tieneItemsEnCola()) {
      const item = estacion.iniciarSiguiente();
      console.log(`[${estacion.getNombre()}] Pedido ${item.getNumeroPedido()}: ${item.getNombre()}`);
      estacion.finalizar(item);
    }
  }
}

function facturar(gestor: GestorPedidos, numeros: number[]): void {
  for (const numero of numeros) {
    gestor.facturarPedido(numero);
  }
}

function mostrarHistorial(gestor: GestorPedidos): void {
  console.log("Historial de pedidos:");

  for (const pedido of gestor.getHistorial()) {
    gestor.consultarFactura(pedido.getNumeroDePedido()).mostrarFactura();
  }
}

// Funcion para manejar los errores
function manejarError(error: unknown): void {
  if (error instanceof ErrorRestaurante) {
    console.error(error.getMensaje());
  } else {
    throw error;
  }
}

// Ejecucion con try...catch
try {
  const menu = armarMenu();
  const cadena = new CadenaEstaciones();
  const selector = new SelectorDeDescuento([ new DescuentoPorPagoEfectivo(), new DescuentoPorDiaDeSemana() ]);
  const gestor = new GestorPedidos(cadena.getPrimeraEstacion(), selector);

  const [comboHamburguesa, comboParrillero] = menu.consultarCombos();
  const cliente = new Cliente(5);
  const calculoDia = new CalculoDia();

  const salon = registrarPedido(gestor, new FabricaPedidoSalon(cliente, calculoDia, 5), [comboHamburguesa, flan]);
  const retiro = registrarPedido(gestor,
    new FabricaPedidoRetiro(cliente, calculoDia, 2030, "1155556666", new BilleteraVirtual()), [comboParrillero]);
  const envio = registrarPedido(gestor,
    new FabricaPedidoEnvio(cliente, calculoDia, "Belgrano 1234", new Efectivo()), [ensaladaCesar, gaseosa]);

  prepararEnCocina(cadena);
  gestor.pedidoPago(salon, new Efectivo());
  facturar(gestor, [salon, retiro, envio]);
  mostrarHistorial(gestor);

} catch (error) {
  manejarError(error);
}