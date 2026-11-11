import { CATEGORIA } from "../enums/categoria";
import { ItemPedido } from "../pedido/itemPedido";

export default abstract class Estacion {

    private siguiente: Estacion | undefined;
    private items: ItemPedido[];
    private itemsEnPreparacion: ItemPedido[];
    private categorias: CATEGORIA[];

    public constructor (categorias: CATEGORIA[]) {
        this.siguiente = undefined;
        this.items = [];
        this.itemsEnPreparacion = [];
        this.categorias = categorias;
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
            throw new Error (`Ninguna estacion puede preparar: ${item.getNombre()}`);
        }

        this.siguiente.recibir(item);
    }

    public iniciarSiguiente(): ItemPedido {
        const item = this.items.shift();

        if (item === undefined) {
            throw new Error ("No hay items en la cola de la estacion.");
        }

        item.iniciarPreparacion();
        this.itemsEnPreparacion.push(item);
        
        return item;
    }

    public finalizar(item: ItemPedido): void {
        const posicion = this.itemsEnPreparacion.indexOf(item);

        if (posicion < 0) {
            throw new Error("El item no esta en preparacion en esta estacion.");
        }

        item.marcarListo();

        this.itemsEnPreparacion.splice(posicion, 1);
    }

    protected acepta(item: ItemPedido): boolean {
        return this.categorias.includes(item.getCategoria());
    }

}