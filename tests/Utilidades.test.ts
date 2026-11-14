import { CalculoDia } from "../src/calculo_dia/dia_actual";
import { NumeradorPedidos } from "../src/pedido/numerador_pedidos";
import { DiaSemana } from "../src/enums/dia_semana";
import { ErrorPedidoNoExiste } from "../src/excepciones/pedido/error_pedido_no_existe";
import { ErrorRestaurante } from "../src/excepciones/error_restaurante";

describe("Tests de CalculoDia", () => {

  it("Debe devolver el dia de la semana de la fecha recibida", () => {
    expect(new CalculoDia(new Date(2026, 10, 9)).calculoDia()).toBe(DiaSemana.LUNES);
    expect(new CalculoDia(new Date(2026, 10, 15)).calculoDia()).toBe(DiaSemana.DOMINGO);
  });

  it("Debe usar la fecha de hoy si no recibe ninguna", () => {
    expect(new CalculoDia().calculoDia()).toBe(new Date().getDay());
  });

});

describe("Tests de NumeradorPedidos", () => {

  it("Debe devolver numeros consecutivos empezando en 1", () => {
    const numerador = new NumeradorPedidos();
    expect(numerador.siguienteNumero()).toBe(1);
    expect(numerador.siguienteNumero()).toBe(2);
    expect(numerador.siguienteNumero()).toBe(3);
  });

});

describe("Tests de las excepciones propias", () => {

  it("Deben heredar de ErrorRestaurante y devolver su mensaje", () => {
    const error = new ErrorPedidoNoExiste(5);
    expect(error).toBeInstanceOf(ErrorRestaurante);
    expect(error.getMensaje()).toBe("El pedido 5 no existe.");
    expect(error.name).toBe("ErrorPedidoNoExiste");
  });

});
