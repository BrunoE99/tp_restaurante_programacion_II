import { CadenaEstaciones } from "../src/estacion/cadenaEstaciones";
import Parrilla from "../src/estacion/parrilla";
import { ItemPedido } from "../src/pedido/item_pedido";
import { Item } from "../src/menu/item";
import { Categoria } from "../src/enums/categoria";

describe("Tests de la clase CadenaEstaciones", () => {

  let cadena: CadenaEstaciones;

  beforeEach(() => {
    cadena = new CadenaEstaciones();
  });

  it("Debe empezar la cadena por la parrilla", () => {
    expect(cadena.getPrimeraEstacion()).toBeInstanceOf(Parrilla);
  });

  it("Debe tener las cuatro estaciones en orden", () => {
    const nombres = cadena.getEstaciones().map(estacion => estacion.getNombre());
    expect(nombres).toEqual(["Parrilla", "Barra", "Cocina fria", "Cocina dulce"]);
  });

  it("Debe hacer llegar un postre hasta la cocina dulce", () => {
    const flan = new ItemPedido(new Item("Flan", 1800, Categoria.POSTRE), 1);

    cadena.getPrimeraEstacion().recibir(flan);

    const [parrilla, barra, cocinaFria, cocinaDulce] = cadena.getEstaciones();
    expect(parrilla.tieneItemsEnCola()).toBe(false);
    expect(barra.tieneItemsEnCola()).toBe(false);
    expect(cocinaFria.tieneItemsEnCola()).toBe(false);
    expect(cocinaDulce.tieneItemsEnCola()).toBe(true);
  });

});
