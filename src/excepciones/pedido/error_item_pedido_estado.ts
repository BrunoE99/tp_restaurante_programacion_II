import { ESTADO_ITEM } from "../../enums/estado_item";

export class ErrorItemPedidoEstadoIncorrecto extends Error {

    public constructor(itemNombre: string, estadoEsperado: ESTADO_ITEM) {
        super(`El item ${itemNombre} no se encuentra en el estado: ${ESTADO_ITEM[estadoEsperado]}`);
        this.name = "ErrorItemPedidoEstadoIncorrecto";
    }

    public getMensaje(): string {
        return this.message;
    }

}