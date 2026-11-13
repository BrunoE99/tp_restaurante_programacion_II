export class ErrorEstacionItemNoEnPreparacion extends Error {

    public constructor(nombreItem: string, nombreEstacion: string) {
        super(`El item ${nombreItem} no esta en preparacion en la estacion: ${nombreEstacion}.`);
        this.name = "ErrorEstacionItemNoEnPreparacion";
    }

    public getMensaje(): string {
        return this.message;
    }

}