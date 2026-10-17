import { BeneficioPorPrecioFijo } from "../src/beneficio/BeneficioPorPrecioFijo";

describe("Tests de la clase BeneficioPorPrecioFijo", () => {

  let comboParrillada: BeneficioPorPrecioFijo;

  beforeEach(() => {
    comboParrillada = new BeneficioPorPrecioFijo(80000);
  });

  it("Debe ser una instancia de BeneficioPorPrecioFijo", () => {
    expect(comboParrillada).toBeInstanceOf(BeneficioPorPrecioFijo);
  });

  it("Debe devolver el precio fijo aunque la suma de productos sea mayor", () => {
    expect(comboParrillada.calcularBeneficio(95000)).toBe(80000);
  });

  it("Debe devolver el precio fijo aunque la suma de productos sea menor", () => {
    expect(comboParrillada.calcularBeneficio(60000)).toBe(80000);
  });

});