import { Categoria } from "../enums/categoria";
import { EstadoItem } from "../enums/estado_item";
import { ErrorItemPedidoEstadoIncorrecto } from "../excepciones/pedido/error_item_pedido_estado";
import { Item } from "../menu/item";

export class ItemPedido {

    private item: Item;
    private estado: EstadoItem;
    private readonly numeroPedido: number;

    public constructor (itemC: Item, numeroPedido: number) {
        this.item = itemC;
        this.estado = EstadoItem.PENDIENTE;
        this.numeroPedido = numeroPedido;
    }

    public getItem(): Item {
        return this.item;
    }

    public getNombre(): string {
        return this.item.getNombre();
    }

    public getCategoria(): Categoria {
        return this.item.getCategoria();
    }

    public getEstado(): EstadoItem {
        return this.estado;
    }

    public getNumeroPedido(): number {
        return this.numeroPedido;
    }

    public estaListo(): boolean {
        return this.estado === EstadoItem.LISTO;
    }

    public iniciarPreparacion(): void {
        if (this.estado !== EstadoItem.PENDIENTE) {
            throw new ErrorItemPedidoEstadoIncorrecto(this.numeroPedido, this.getNombre(), EstadoItem.PENDIENTE);
        }

        this.estado = EstadoItem.EN_PREPARACION;
    }

    public marcarListo(): void {
        if (this.estado !== EstadoItem.EN_PREPARACION) {
            throw new ErrorItemPedidoEstadoIncorrecto(this.numeroPedido, this.getNombre(), EstadoItem.EN_PREPARACION);
        }

        this.estado = EstadoItem.LISTO;
    }
}