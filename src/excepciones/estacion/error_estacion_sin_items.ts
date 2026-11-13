import { ErrorRestaurante } from "../error_restaurante";

export class ErrorEstacionSinItems extends ErrorRestaurante {

    public constructor(nombreEstacion: string) {
        super(`No hay items en la cola de ${nombreEstacion}.`);
        this.name = "ErrorEstacionSinItems";
    }

}