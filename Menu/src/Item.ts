import {CATEGORIA} from "./Categoria"

export class Item {
  private nombre: string;
  private precio: number;
  private categoria: CATEGORIA;

  constructor(nombre: string, precio: number, categoria: CATEGORIA) {
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
}