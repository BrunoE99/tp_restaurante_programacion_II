import { CATEGORIA } from "../../enums/categoria";

export class ErrorEstacionNoEncontrada extends Error {

    public constructor(nombreItem: string, categoria: CATEGORIA) {
        super(`Ninguna estacion puede preparar la categoria ${CATEGORIA[categoria]} (item: ${nombreItem}).`);
        this.name = "ErrorEstacionNoEncontrada";
    }

    public getMensaje(): string {
        return this.message;
    }

}