import { CATEGORIA } from "../enums/categoria";
import { ESTADO_ITEM } from "../enums/estado_item";
import { Item } from "../menu/item";

export class ItemPedido {

    private item: Item;
    private estado: ESTADO_ITEM;

    public constructor (itemC: Item) {
        this.item = itemC;
        this.estado = ESTADO_ITEM.PENDIENTE;
    }

    public getItem(): Item {
        return this.item;
    }

    public getNombre(): string {
        return this.item.getNombre();
    }

    public getCategoria(): CATEGORIA {
        return this.item.getCategoria();
    }

    public getEstado(): ESTADO_ITEM {
        return this.estado;
    }

    public estaListo(): boolean {
        return this.estado === ESTADO_ITEM.LISTO;
    }

    public iniciarPreparacion(): void {
        if (this.estado !== ESTADO_ITEM.PENDIENTE) {
            throw new Error (`${this.getNombre()} no esta pendiente.`);
        }

        this.estado = ESTADO_ITEM.EN_PREPARACION;
    }

    public marcarListo(): void {
        if (this.estado !== ESTADO_ITEM.EN_PREPARACION) {
            throw new Error(`${this.getNombre()} no esta en preaparacion.`);
        }

        this.estado = ESTADO_ITEM.LISTO;
    }
}