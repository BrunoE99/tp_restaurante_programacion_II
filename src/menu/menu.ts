import { Item } from "./item";
import { Combo } from "./combo";

/**
 * Representa la carta del restaurante: los items individuales y los combos que se ofrecen.
 */
export class Menu {

    private items: Item[];
    private combos: Combo[];

    /**
     * Inicializa un menu vacio.
     */
    public constructor() {
        this.items = [];
        this.combos = [];
    }

    /**
     * Agrega un item individual al menu.
     * 
     * @param item Item a agregar.
     */
    public agregarItem(item: Item): void {
        this.items.push(item);
    }

    /**
     * Elimina un item del menu. Si no esta, no hace nada.
     * 
     * @param item Item a eliminar.
     */
    public eliminarItem(item: Item): void {
        const index: number = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    /**
     * @returns Coleccion de items individuales del menu.
     */
    public consultarItems(): Item[] {
        return this.items;
    }

    /**
     * Agrega un combo al menu.
     * 
     * @param combo Combo a agregar.
     */
    public agregarCombo(combo: Combo): void {
        this.combos.push(combo);
    }

    /**
     * Elimina un combo del menu. Si no esta, no hace nada.
     * 
     * @param combo Combo a eliminar.
     */
    public eliminarCombo(combo: Combo): void {
        const index: number = this.combos.indexOf(combo);
        if (index !== -1) {
            this.combos.splice(index, 1);
        }
    }

    /**
     * @returns Coleccion de combos del menu.
     */
    public consultarCombos(): Combo[] {
        return this.combos;
    }

}