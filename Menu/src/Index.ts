import { Item } from "./Item";
import { Combo } from "./Combo";
import { Menu } from "./Menu";
import { CATEGORIA } from "./Categoria";

// Crear Items
let hamburguesa = new Item (
  "Hamburguesa", 5000, CATEGORIA.PLATO_PRINCIPAL
);

let papas_fritas = new Item (
  "Papas Fritas", 2000, CATEGORIA.ENTRADA
);

let gaseosa = new Item (
  "Gaseosa", 1500, CATEGORIA.BEBIDA
);

// Crear Combo
let combo_hamburguesa = new Combo (
  "Combo de Hamburguesa", [hamburguesa, papas_fritas, gaseosa]
);

// Crear Menu 
let menu = new Menu();

// Agregar Items al Menu 
menu.agregarItem(hamburguesa);
menu.agregarItem(papas_fritas);
menu.agregarItem(gaseosa);

// Agregar Combo al Menu
menu.agregarCombo(combo_hamburguesa);

// Consultar Items 
console.log("Items del Menu: ");
console.log(menu.consultarItems());