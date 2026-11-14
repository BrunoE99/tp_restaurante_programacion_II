import { Categoria } from "../enums/categoria"
import Producto from "./producto";

/**
 * Producto individual del menu, con su precio y su categoria.
 * 
 * Actua como una hoja (Leaf) dentro del patron Composite definido por Producto.
 */
export class Item implements Producto {
    private nombre: string;
    private precio: number;
    private categoria: Categoria;

    /**
     * @param nombre Nombre del item en el menu.
     * @param precio Precio unitario del item.
     * @param categoria {@link Categoria} del item.
     */
    public constructor(nombre: string, precio: number, categoria: Categoria) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }

    /**
     * @returns El nombre del item.
     */
    public getNombre(): string {
        return this.nombre;
    }

    /**
     * @returns El precio unitario del item.
     */
    public getPrecio(): number {
        return this.precio;
    }

    /**
     * @returns La categoria del item.
     */
    public getCategoria(): Categoria {
        return this.categoria;
    }

    /**
     * Un item individual no se desarma, se devuelve a si mismo para que `Pedido` trate
     * igual a items y combos.
     * 
     * @returns Una lista con este item como unico elemento.
     */
    public getItems(): Item[] {
        return [this];
    }
}