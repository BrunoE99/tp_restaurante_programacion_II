export class ErrorComboMinimoItems extends Error {

    public constructor(combo: string, minimoItems: number) {
        super(`El minimo de items para el combo ${combo} son ${minimoItems}.`);
        this.name = "ErrorComboMinimoItems";
    }

    public getMensaje(): string {
        return this.message;
    }

}