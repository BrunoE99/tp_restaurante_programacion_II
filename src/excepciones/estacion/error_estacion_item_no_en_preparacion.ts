import { ErrorRestaurante } from "../error_restaurante";

export class ErrorEstacionItemNoEnPreparacion extends ErrorRestaurante {

    public constructor(nombreItem: string, nombreEstacion: string) {
        super(`El item ${nombreItem} no esta en preparacion en la estacion: ${nombreEstacion}.`);
        this.name = "ErrorEstacionItemNoEnPreparacion";
    }

}