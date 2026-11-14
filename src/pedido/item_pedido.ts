import { Categoria } from "../enums/categoria";
import { EstadoItem } from "../enums/estado_item";
import { ErrorItemPedidoEstadoIncorrecto } from "../excepciones/pedido/error_item_pedido_estado";
import { Item } from "../menu/item";

/**
 * Item individual dentro de Pedido que se prepara en las estaciones.
 * 
 * Separa lo pedido del producto de la carta: el {@link Item} del menu no tiene estado y
 * se comparte entre pedidos; cada `ItemPedido` lleva su propio estado de preparacion:
 * `PENDIENTE` -> `EN_PREPARACION` -> `LISTO` y el numero de pedido al que pertenece.
 */
export class ItemPedido {

    private item: Item;
    private estado: EstadoItem;
    private readonly numeroPedido: number;

    /**
     * Crea el ItemPedido con estado `PENDIENTE`.
     * 
     * @param itemC Item del menu a preparar.
     * @param numeroPedido Numero del pedido al que pertenece el item.
     */
    public constructor (itemC: Item, numeroPedido: number) {
        this.item = itemC;
        this.estado = EstadoItem.PENDIENTE;
        this.numeroPedido = numeroPedido;
    }

    /**
     * @returns El item del menu que se pidio.
     */
    public getItem(): Item {
        return this.item;
    }

    /**
     * @returns El nombre del item.
     */
    public getNombre(): string {
        return this.item.getNombre();
    }

    /**
     * @returns La categoria del item, que define en que estacion se prepara.
     */
    public getCategoria(): Categoria {
        return this.item.getCategoria();
    }

    /**
     * @returns El estado actual del item.
     */
    public getEstado(): EstadoItem {
        return this.estado;
    }

    /**
     * @returns El numero del pedido al que pertenece el item.
     */
    public getNumeroPedido(): number {
        return this.numeroPedido;
    }

    /**
     * @returns `true` si el item ya esta `LISTO`, `false` si no.
     */
    public estaListo(): boolean {
        return this.estado === EstadoItem.LISTO;
    }

    /**
     * Inicia la preparacion del item: `PENDIENTE` -> `EN_PREPARACION`.
     * 
     * @throws Lanza {@link excepciones/pedido/error_item_pedido_estado!ErrorItemPedidoEstadoIncorrecto} Si el item no esta en `PENDIENTE`.
     */
    public iniciarPreparacion(): void {
        if (this.estado !== EstadoItem.PENDIENTE) {
            throw new ErrorItemPedidoEstadoIncorrecto(this.numeroPedido, this.getNombre(), EstadoItem.PENDIENTE);
        }

        this.estado = EstadoItem.EN_PREPARACION;
    }

    /**
     * Finaliza la preparacion del item: `EN_PREPARACION` -> `LISTO`.
     * 
     * @throws Lanza {@link excepciones/pedido/error_item_pedido_estado!ErrorItemPedidoEstadoIncorrecto} Si el item no esta en `EN_PREPARACION`.
     */
    public marcarListo(): void {
        if (this.estado !== EstadoItem.EN_PREPARACION) {
            throw new ErrorItemPedidoEstadoIncorrecto(this.numeroPedido, this.getNombre(), EstadoItem.EN_PREPARACION);
        }

        this.estado = EstadoItem.LISTO;
    }
}