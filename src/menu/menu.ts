import { Item } from "./item";
import { Combo } from "./combo";

export class Menu {

    private items: Item[];
    private combos: Combo[];

    public constructor() {
        this.items = []; // Vacios p/ que se construya de 0
        this.combos = [];
    }

    public agregarItem(item: Item): void {
        this.items.push(item);
    }

    public eliminarItem(item: Item): void {
        const index: number = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    public consultarItems(): Item[] {
        return this.items;
    }

    public agregarCombo(combo: Combo): void {
        this.combos.push(combo);
    }

    public eliminarCombo(combo: Combo): void {
        const index: number = this.combos.indexOf(combo);
        if (index !== -1) {
            this.combos.splice(index, 1);
        }
    }

    public consultarCombos(): Combo[] {
        return this.combos;
    }

}