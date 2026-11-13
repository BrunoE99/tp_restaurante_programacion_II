import { Categoria } from "../enums/categoria";
import { ErrorEstacionItemNoEnPreparacion } from "../excepciones/estacion/error_estacion_item_no_en_preparacion";
import { ErrorEstacionNoEncontrada } from "../excepciones/estacion/error_estacion_no_encontrada";
import { ErrorEstacionSinItems } from "../excepciones/estacion/error_estacion_sin_items";
import { ItemPedido } from "../pedido/item_pedido";

export default abstract class Estacion {

    private siguiente: Estacion | undefined;
    private items: ItemPedido[];
    private itemsEnPreparacion: ItemPedido[];
    private categorias: Categoria[];
    private readonly nombre: string;

    public constructor (nombre: string, categorias: Categoria[]) {
        this.nombre = nombre;
        this.siguiente = undefined;
        this.items = [];
        this.itemsEnPreparacion = [];
        this.categorias = categorias;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setSiguiente(estacion: Estacion): void {
        this.siguiente = estacion;
    }

    public recibir(item: ItemPedido): void {
        if (this.acepta(item)) {
            this.items.push(item);
            return;
        }

        if (this.siguiente === undefined) {
            throw new ErrorEstacionNoEncontrada(item.getNombre(), item.getCategoria());
        }

        this.siguiente.recibir(item);
    }

    public tieneItemsEnCola(): boolean {
        return this.items.length > 0;
    }

    public iniciarSiguiente(): ItemPedido {
        const item = this.items.shift();

        if (item === undefined) {
            throw new ErrorEstacionSinItems(this.nombre);
        }

        item.iniciarPreparacion();
        this.itemsEnPreparacion.push(item);
        
        return item;
    }

    public finalizar(item: ItemPedido): void {
        const posicion = this.itemsEnPreparacion.indexOf(item);

        if (posicion < 0) {
            throw new ErrorEstacionItemNoEnPreparacion(item.getNombre(), this.nombre);
        }

        item.marcarListo();

        this.itemsEnPreparacion.splice(posicion, 1);
    }

    protected acepta(item: ItemPedido): boolean {
        return this.categorias.includes(item.getCategoria());
    }

}