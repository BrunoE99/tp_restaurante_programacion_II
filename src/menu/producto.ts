import { Item } from "./item";

export default interface Producto {
    getPrecio(): number;
    getItems(): Item[];
    getNombre(): string;
}