export abstract class ErrorRestaurante extends Error {

    public getMensaje(): string {
        return this.message;
    }

}
