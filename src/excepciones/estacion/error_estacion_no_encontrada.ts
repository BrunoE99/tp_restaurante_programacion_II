import { Categoria } from "../../enums/categoria";

export class ErrorEstacionNoEncontrada extends Error {

    public constructor(nombreItem: string, categoria: Categoria) {
        super(`Ninguna estacion puede preparar la categoria ${Categoria[categoria]} (item: ${nombreItem}).`);
        this.name = "ErrorEstacionNoEncontrada";
    }

    public getMensaje(): string {
        return this.message;
    }

}