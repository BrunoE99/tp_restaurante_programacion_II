export class ErrorEstacionSinItems extends Error {

    public constructor(nombreEstacion: string) {
        super(`No hay items en la cola de ${nombreEstacion}.`);
        this.name = "ErrorEstacionSinItems";
    }

    public getMensaje(): string {
        return this.message;
    }

}