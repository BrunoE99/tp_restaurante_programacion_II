import { Beneficio } from "../beneficio/Beneficio";
import { ErrorComboMinimoItems } from "../excepciones/menu/error_combo_minimo_items";
import { Item } from "./item";
import Producto from "./producto";

export class Combo implements Producto {
    private readonly minimoItems = 2;

    private nombre: string;
    private items: Item[];
    private beneficio: Beneficio;

    public constructor(nombre: string, items: Item[], beneficio: Beneficio) {
        if (items.length < this.minimoItems) {
            throw new ErrorComboMinimoItems(nombre, this.minimoItems);
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