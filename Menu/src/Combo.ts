import { Item } from "./Item";

export class Combo {
  private nombre: string;
  private items: Item[];
  // private precio: ??

  constructor(nombre: string, items: Item[]) {
    // Hay que matar un panda para que no se acepte < 2 items y, en caso negativo (se mande < 2) lanzar un error
    if(items.length < 2) {
      throw new Error("El minimo de items para un combo son 2");
    }
    this.nombre = nombre;
    this.items = items;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getItems(): Item[]{
    return this.items;
  }

  
}