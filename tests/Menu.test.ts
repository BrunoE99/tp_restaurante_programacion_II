import { Menu } from "../src/menu/menu";
import { Item } from "../src/menu/item";
import { Combo } from "../src/menu/combo";
import { Categoria } from "../src/enums/categoria";
import { BeneficioPorPorcentaje } from "../src/beneficio/BeneficioPorPorcentaje";

describe("Tests de la clase Menu", () => {

  let menu: Menu;
  let hamburguesa: Item;
  let gaseosa: Item;
  let combo: Combo;

  beforeEach(() => {
    menu = new Menu();
    hamburguesa = new Item("Hamburguesa", 5000, Categoria.CARNE);
    gaseosa = new Item("Gaseosa", 1500, Categoria.BEBIDA);
    combo = new Combo("Combo Hamburguesa", [hamburguesa, gaseosa], new BeneficioPorPorcentaje(10));
  });

  it("Debe arrancar vacio", () => {
    expect(menu.consultarItems()).toEqual([]);
    expect(menu.consultarCombos()).toEqual([]);
  });

  it("Debe agregar y eliminar items", () => {
    menu.agregarItem(hamburguesa);
    menu.agregarItem(gaseosa);
    menu.eliminarItem(hamburguesa);
    expect(menu.consultarItems()).toEqual([gaseosa]);
  });

  it("Debe agregar y eliminar combos", () => {
    menu.agregarCombo(combo);
    expect(menu.consultarCombos()).toEqual([combo]);
    menu.eliminarCombo(combo);
    expect(menu.consultarCombos()).toEqual([]);
  });

  it("No debe cambiar nada si se elimina algo que no esta en el menu", () => {
    menu.agregarItem(hamburguesa);
    menu.eliminarItem(gaseosa);
    menu.eliminarCombo(combo);
    expect(menu.consultarItems()).toEqual([hamburguesa]);
    expect(menu.consultarCombos()).toEqual([]);
  });

});
