import { Combo } from "../src/menu/combo";
import { Item } from "../src/menu/item";
import { Categoria } from "../src/enums/categoria";
import { BeneficioPorPorcentaje } from "../src/beneficio/BeneficioPorPorcentaje";
import { BeneficioPorPrecioFijo } from "../src/beneficio/BeneficioPorPrecioFijo";
import { ErrorComboMinimoItems } from "../src/excepciones/menu/error_combo_minimo_items";

describe("Tests de la clase Combo", () => {

  let hamburguesa: Item;
  let gaseosa: Item;
  let papas: Item;

  beforeEach(() => {
    hamburguesa = new Item("Hamburguesa", 5000, Categoria.CARNE);
    gaseosa = new Item("Gaseosa", 1500, Categoria.BEBIDA);
    papas = new Item("Papas", 2500, Categoria.CARNE);
  });

  it("Debe lanzar error si tiene menos de 2 items", () => {
    expect(() => new Combo("Combo solo", [hamburguesa], new BeneficioPorPorcentaje(10)))
      .toThrow(ErrorComboMinimoItems);
  });

  it("Debe calcular el precio con un beneficio por porcentaje", () => {
    const combo = new Combo("Combo", [hamburguesa, gaseosa, papas], new BeneficioPorPorcentaje(20));
    expect(combo.getPrecio()).toBe(7200);
  });

  it("Debe calcular el precio con un beneficio de precio fijo", () => {
    const combo = new Combo("Combo", [hamburguesa, gaseosa, papas], new BeneficioPorPrecioFijo(7500));
    expect(combo.getPrecio()).toBe(7500);
  });

  it("Debe devolver su nombre y una copia de sus items", () => {
    const combo = new Combo("Combo Hamburguesa", [hamburguesa, gaseosa], new BeneficioPorPorcentaje(10));
    combo.getItems().push(papas);
    expect(combo.getNombre()).toBe("Combo Hamburguesa");
    expect(combo.getItems()).toEqual([hamburguesa, gaseosa]);
  });

});
