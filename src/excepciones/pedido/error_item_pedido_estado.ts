import { EstadoItem } from "../../enums/estado_item";

export class ErrorItemPedidoEstadoIncorrecto extends Error {

    public constructor(itemNombre: string, estadoEsperado: EstadoItem) {
        super(`El item ${itemNombre} no se encuentra en el estado: ${EstadoItem[estadoEsperado]}`);
        this.name = "ErrorItemPedidoEstadoIncorrecto";
    }

    public getMensaje(): string {
        return this.message;
    }

}