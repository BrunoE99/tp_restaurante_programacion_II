import { ItemPedido } from "../src/pedido/item_pedido";
import { Item } from "../src/menu/item";
import { Categoria } from "../src/enums/categoria";
import { EstadoItem } from "../src/enums/estado_item";
import { ErrorItemPedidoEstadoIncorrecto } from "../src/excepciones/pedido/error_item_pedido_estado";

describe("Tests de la clase ItemPedido", () => {

  let bife: Item;
  let itemPedido: ItemPedido;

  beforeEach(() => {
    bife = new Item("Bife", 9000, Categoria.CARNE);
    itemPedido = new ItemPedido(bife, 3);
  });

  it("Debe arrancar pendiente y con los datos del item", () => {
    expect(itemPedido.getEstado()).toBe(EstadoItem.PENDIENTE);
    expect(itemPedido.getItem()).toBe(bife);
    expect(itemPedido.getNombre()).toBe("Bife");
    expect(itemPedido.getCategoria()).toBe(Categoria.CARNE);
    expect(itemPedido.getNumeroPedido()).toBe(3);
    expect(itemPedido.estaListo()).toBe(false);
  });

  it("Debe pasar de pendiente a en preparacion y despues a listo", () => {
    itemPedido.iniciarPreparacion();
    expect(itemPedido.getEstado()).toBe(EstadoItem.EN_PREPARACION);

    itemPedido.marcarListo();
    expect(itemPedido.getEstado()).toBe(EstadoItem.LISTO);
    expect(itemPedido.estaListo()).toBe(true);
  });

  it("No debe iniciar la preparacion de un item que ya esta en preparacion", () => {
    itemPedido.iniciarPreparacion();
    expect(() => itemPedido.iniciarPreparacion()).toThrow(ErrorItemPedidoEstadoIncorrecto);
  });

  it("No debe marcar listo un item que no esta en preparacion", () => {
    expect(() => itemPedido.marcarListo()).toThrow(ErrorItemPedidoEstadoIncorrecto);
  });

});
