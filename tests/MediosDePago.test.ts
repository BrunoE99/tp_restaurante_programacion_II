import Efectivo from "../src/medios_de_pago/efectivo";
import BilleteraVirtual from "../src/medios_de_pago/billeteraVirtual";
import TarjetaCredito from "../src/medios_de_pago/tarjetaCredito";
import TarjetaDebito from "../src/medios_de_pago/tarjetaDebito";

describe("Tests de los medios de pago", () => {

  let credito: TarjetaCredito;
  let debito: TarjetaDebito;

  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => undefined);
    credito = new TarjetaCredito(new Efectivo(), "4509123412341234", "Juan Perez", "123", "12/28", 50000);
    debito = new TarjetaDebito(new Efectivo(), "5031123412341234", "Juan Perez", "456", "10/27", 30000);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Solo el efectivo debe aplicar el descuento por efectivo", () => {
    expect(new Efectivo().aplicaDescuentoEfectivo()).toBe(true);
    expect(new BilleteraVirtual().aplicaDescuentoEfectivo()).toBe(false);
    expect(credito.aplicaDescuentoEfectivo()).toBe(false);
    expect(debito.aplicaDescuentoEfectivo()).toBe(false);
  });

  it("Cada medio de pago debe informar que el pago se completo", () => {
    new Efectivo().pagoCompletado();
    new BilleteraVirtual().pagoCompletado();
    credito.pagoCompletado();
    debito.pagoCompletado();

    expect(console.log).toHaveBeenCalledTimes(4);
    expect(console.log).toHaveBeenCalledWith("Pago en efectivo completado con éxito.");
  });

});
