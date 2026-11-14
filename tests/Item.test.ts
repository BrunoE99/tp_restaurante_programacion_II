import { Item } from "../src/menu/item";
import { Categoria } from "../src/enums/categoria";

describe("Tests de la clase Item", () => {

  let flan: Item;

  beforeEach(() => {
    flan = new Item("Flan", 1800, Categoria.POSTRE);
  });

  it("Debe devolver sus datos", () => {
    expect(flan.getNombre()).toBe("Flan");
    expect(flan.getPrecio()).toBe(1800);
    expect(flan.getCategoria()).toBe(Categoria.POSTRE);
  });

  it("Debe devolverse a si mismo como unico item", () => {
    expect(flan.getItems()).toEqual([flan]);
  });

});
