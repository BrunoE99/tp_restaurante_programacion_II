import Parrilla from "../src/estacion/parrilla";
import Barra from "../src/estacion/barra";
import CocinaFria from "../src/estacion/cocinaFria";
import CocinaDulce from "../src/estacion/cocinaDulce";
import { ItemPedido } from "../src/pedido/item_pedido";
import { Item } from "../src/menu/item";
import { Categoria } from "../src/enums/categoria";
import { EstadoItem } from "../src/enums/estado_item";
import { ErrorEstacionNoEncontrada } from "../src/excepciones/estacion/error_estacion_no_encontrada";
import { ErrorEstacionSinItems } from "../src/excepciones/estacion/error_estacion_sin_items";
import { ErrorEstacionItemNoEnPreparacion } from "../src/excepciones/estacion/error_estacion_item_no_en_preparacion";

describe("Tests de la clase Estacion", () => {

  let parrilla: Parrilla;
  let barra: Barra;
  let bife: ItemPedido;
  let hamburguesa: ItemPedido;
  let gaseosa: ItemPedido;

  beforeEach(() => {
    parrilla = new Parrilla();
    barra = new Barra();
    parrilla.setSiguiente(barra);

    bife = new ItemPedido(new Item("Bife", 9000, Categoria.CARNE), 1);
    hamburguesa = new ItemPedido(new Item("Hamburguesa", 5000, Categoria.CARNE), 2);
    gaseosa = new ItemPedido(new Item("Gaseosa", 1500, Categoria.BEBIDA), 1);
  });

  it("Debe tener el nombre de cada estacion", () => {
    expect(parrilla.getNombre()).toBe("Parrilla");
    expect(barra.getNombre()).toBe("Barra");
    expect(new CocinaFria().getNombre()).toBe("Cocina fria");
    expect(new CocinaDulce().getNombre()).toBe("Cocina dulce");
  });

  it("Debe quedarse con los items de su categoria", () => {
    parrilla.recibir(bife);
    expect(parrilla.tieneItemsEnCola()).toBe(true);
    expect(barra.tieneItemsEnCola()).toBe(false);
  });

  it("Debe pasarle a la siguiente estacion lo que no puede preparar", () => {
    parrilla.recibir(gaseosa);
    expect(parrilla.tieneItemsEnCola()).toBe(false);
    expect(barra.tieneItemsEnCola()).toBe(true);
  });

  it("Debe lanzar error si ninguna estacion de la cadena puede preparar el item", () => {
    const flan = new ItemPedido(new Item("Flan", 1800, Categoria.POSTRE), 1);
    expect(() => parrilla.recibir(flan)).toThrow(ErrorEstacionNoEncontrada);
  });

  it("Debe preparar los items en el orden en que llegaron", () => {
    parrilla.recibir(bife);
    parrilla.recibir(hamburguesa);

    const primero = parrilla.iniciarSiguiente();
    const segundo = parrilla.iniciarSiguiente();

    expect(primero).toBe(bife);
    expect(segundo).toBe(hamburguesa);
    expect(primero.getEstado()).toBe(EstadoItem.EN_PREPARACION);
  });

  it("Debe lanzar error si no hay items para preparar", () => {
    expect(() => parrilla.iniciarSiguiente()).toThrow(ErrorEstacionSinItems);
  });

  it("Debe marcar listo un item al finalizarlo", () => {
    parrilla.recibir(bife);
    const item = parrilla.iniciarSiguiente();

    parrilla.finalizar(item);

    expect(item.estaListo()).toBe(true);
  });

  it("No debe finalizar un item que no esta en preparacion en esa estacion", () => {
    parrilla.recibir(bife);
    expect(() => parrilla.finalizar(bife)).toThrow(ErrorEstacionItemNoEnPreparacion);
  });

});
