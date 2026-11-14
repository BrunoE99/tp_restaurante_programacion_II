import { Beneficio } from "../beneficio/Beneficio";
import { ErrorComboMinimoItems } from "../excepciones/menu/error_combo_minimo_items";
import { Item } from "./item";
import Producto from "./producto";

/**
 * Agrupacion de dos o mas items que se vende a un precio especial.
 * 
 * El precio se calcula con un beneficio propio de cada combo (patron Strategy).
 * 
 * @example
 * const hamburguesa = new Item("Hamburguesa", 8000, Categoria.CARNE);
 * const bebida = new Item("Gaseosa", 2000, Categoria.BEBIDA);
 * const combo = new Combo("Combo Clásico", [hamburguesa, bebida], new BeneficioPorPorcentaje(10));
 */
export class Combo implements Producto {
    /**
     * Cantidad minima de items que debe tener un combo.
     */
    private readonly minimoItems = 2;

    private nombre: string;
    private items: Item[];
    private beneficio: Beneficio;

    /**
     * @param nombre Nombre del combo en el menu.
     * @param items Items que forman el combo (minimo 2)
     * @param beneficio Beneficio utilizado para calcular el precio especial del combo.
     * @throws Lanza {@link ErrorComboMinimoItems} Si la cantidad de items recibida es menor al `minimoItems`.
     */
    public constructor(nombre: string, items: Item[], beneficio: Beneficio) {
        if (items.length < this.minimoItems) {
            throw new ErrorComboMinimoItems(nombre, this.minimoItems);
        }

        this.nombre = nombre;
        this.items = items;
        this.beneficio = beneficio;
    }

    /**
     * @returns El nombre del combo.
     */
    public getNombre(): string {
        return this.nombre;
    }

    /**
     * @returns Una copia de la lista de items del combo, modificarla no altera el combo.
     */
    public getItems(): Item[] {
        return [...this.items];
    }

    /**
     * @returns La suma de los precios individuales de los items, sin beneficio.
     */
    private getPrecioTotalItems(): number {
        const valorInicial = 0;
        return this.items.reduce((acumulador, valorAct) => acumulador + valorAct.getPrecio(), valorInicial);
    }

    /**
     * @returns El precio del combo con su beneficio aplicado.
     */
    public getPrecio(): number {
        return this.beneficio.calcularBeneficio(this.getPrecioTotalItems());
    }
    
}