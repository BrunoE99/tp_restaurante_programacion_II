import { Beneficio } from "../beneficio/Beneficio";
import { Item } from "./item";
import Producto from "./producto";

export class Combo implements Producto {
    private nombre: string;
    private items: Item[];
    private beneficio: Beneficio;

    public constructor(nombre: string, items: Item[], beneficio: Beneficio) {
        // Hay que matar un panda para que no se acepte < 2 items y, en caso negativo (se mande < 2) lanzar un error
        if (items.length < 2) {
            throw new Error("El minimo de items para un combo son 2");
        }
        this.nombre = nombre;
        this.items = items;
        this.beneficio = beneficio;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getItems(): Item[] {
        return [...this.items];
    }

    private getPrecioTotalItems(): number {
        const valorInicial = 0;
        return this.items.reduce((acumulador, valorAct) => acumulador + valorAct.getPrecio(), valorInicial);
    }

    public getPrecio(): number {
        return this.beneficio.calcularBeneficio(this.getPrecioTotalItems());
    }
    
}