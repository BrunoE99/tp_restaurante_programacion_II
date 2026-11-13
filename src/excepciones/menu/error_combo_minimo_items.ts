import { ErrorRestaurante } from "../error_restaurante";

export class ErrorComboMinimoItems extends ErrorRestaurante {

    public constructor(combo: string, minimoItems: number) {
        super(`El minimo de items para el combo ${combo} son ${minimoItems}.`);
        this.name = "ErrorComboMinimoItems";
    }

}