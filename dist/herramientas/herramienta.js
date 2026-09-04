"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Herramienta = void 0;
const constants_1 = require("../constants");
const constants_2 = require("../constants");
class Herramienta {
    nombre;
    peso;
    constructor(nombre, peso) {
        this.nombre = nombre;
        this.peso = peso;
    }
    penalizacionVelocidadPorPeso() {
        const resto = (this.peso / constants_1.PESO_EXCEDENTE) - constants_1.PESO_MAXIMO;
        const reduccion = constants_2.REDUCCION_VELOCIDAD_PORCENTAJE * resto;
        return (reduccion / constants_1.NUMERO_100_REGLA_DE_TRES);
    }
    penalizacionAlturaPorPeso() {
        const resto = (this.peso / constants_1.PESO_EXCEDENTE) - constants_1.PESO_MAXIMO;
        const reduccion = constants_2.REDUCCION_ALTURA_PORCENTAJE * resto;
        return (reduccion / constants_1.NUMERO_100_REGLA_DE_TRES);
    }
    getNombre() {
        return this.nombre;
    }
    getPeso() {
        return this.peso;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    setPeso(peso) {
        this.peso = peso;
    }
}
exports.Herramienta = Herramienta;
//# sourceMappingURL=herramienta.js.map