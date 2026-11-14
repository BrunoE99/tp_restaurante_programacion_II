import { BeneficioPorPorcentaje } from "../src/beneficio/BeneficioPorPorcentaje";

describe("Tests de la clase BeneficioPorPorcentaje", () => {

  let instance: BeneficioPorPorcentaje;

  beforeEach(() => {
    instance = new BeneficioPorPorcentaje(20);
  });

  it("Debe ser una instancia de BeneficioPorPorcentaje", () => {
    expect(instance).toBeInstanceOf(BeneficioPorPorcentaje);
  });

  it("Debe descontar el porcentaje sobre la suma de productos", () => {
    expect(instance.calcularBeneficio(1000)).toBe(800);
  });

  it("Debe devolver el total sin descuento si el porcentaje es cero", () => {
    const sinDescuento = new BeneficioPorPorcentaje(0);
    expect(sinDescuento.calcularBeneficio(1000)).toBe(1000);
  });

});