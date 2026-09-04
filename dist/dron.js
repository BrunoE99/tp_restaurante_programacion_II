"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dron = void 0;
const constants_1 = require("./constants");
class Dron {
    velocidadBase;
    alturaBase;
    camaraVigilancia;
    herramienta;
    constructor(herramienta, camaraVigilancia) {
        this.velocidadBase = constants_1.VELOCIDAD_BASE;
        this.alturaBase = constants_1.ALTURA_BASE;
        this.camaraVigilancia = camaraVigilancia;
        this.herramienta = herramienta;
    }
    getVelocidad() {
        return this.velocidadBase - (this.herramienta.penalizacionVelocidadPorPeso() * this.velocidadBase);
    }
    getAltura() {
        return this.alturaBase - (this.herramienta.penalizacionAlturaPorPeso() * this.alturaBase);
    }
    getCamaraVigilancia() {
        return this.camaraVigilancia.getNombre();
    }
    getHerramienta() {
        return this.herramienta.getNombre();
    }
    setVelocidad(velocidad) {
        this.velocidadBase = velocidad;
    }
    setAltura(altura) {
        this.alturaBase = altura;
    }
    setCamaraVigilancia(camara) {
        this.camaraVigilancia = camara;
    }
    setHerramienta(herramienta) {
        this.herramienta = herramienta;
    }
}
exports.Dron = Dron;
//# sourceMappingURL=dron.js.map