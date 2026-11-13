import { Categoria } from "../../enums/categoria";
import { ErrorRestaurante } from "../error_restaurante";

export class ErrorEstacionNoEncontrada extends ErrorRestaurante {

    public constructor(nombreItem: string, categoria: Categoria) {
        super(`Ninguna estacion puede preparar la categoria ${Categoria[categoria]} (item: ${nombreItem}).`);
        this.name = "ErrorEstacionNoEncontrada";
    }

}