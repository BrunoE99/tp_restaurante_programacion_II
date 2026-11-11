
// function main():void {
//   console.log("Hola mundo!");
// } 

// main();

import { Item } from "./menu/item";
import { Combo } from "./menu/combo";
import { Menu } from "./menu/menu";
import { CATEGORIA } from "./enums/categoria";

// Crear Items
const hamburguesa = new Item(
  "Hamburguesa", 5000, CATEGORIA.CARNE
);

const ensaladaCesar = new Item(
  "Ensalada cesar", 2000, CATEGORIA.ENSALADA
);

const gaseosa = new Item(
  "Gaseosa", 1500, CATEGORIA.BEBIDA
);

// Crear Combo
const comboHamburguesa = new Combo(
  "Combo de Hamburguesa", [hamburguesa, ensaladaCesar, gaseosa]
);

// Crear Menu 
const menu = new Menu();

// Agregar Items al Menu 
menu.agregarItem(hamburguesa);
menu.agregarItem(ensaladaCesar);
menu.agregarItem(gaseosa);

// Agregar Combo al Menu
menu.agregarCombo(comboHamburguesa);

// Consultar Items 
console.log("Items del Menu: ");
console.log(menu.consultarItems());