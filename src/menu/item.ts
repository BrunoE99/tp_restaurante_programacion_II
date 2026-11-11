import { CATEGORIA } from "../enums/categoria"
import Producto from "./producto";

export class Item implements Producto {
    private nombre: string;
    private precio: number;
    private categoria: CATEGORIA;

    public constructor(nombre: string, precio: number, categoria: CATEGORIA) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getPrecio(): number {
        return this.precio;
    }

    public getCategoria(): CATEGORIA {
        return this.categoria;
    }

    public getItems(): Item[] {
        return [this];
    }
}