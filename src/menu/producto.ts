import { Item } from "./item";

/**
 * Interfaz que define el contrato base del patron Composite para cualquier elemento
 * del menu: item o combo.
 * 
 * Permite que `Pedido` o las estaciones operen sobre items y combos sin distinguirlos.
 */
export default interface Producto {
    /**
     * Calcula y devuelve el precio final del producto.
     * 
     * @returns Precio de venta del producto: precio unitario en caso de {@link Item}
     * o importe con beneficio en caso de {@link menu/combo!Combo}.
     */
    getPrecio(): number;

    /**
     * Devuelve los items individuales que componen al producto.
     * Se usa al confirmar el pedido para mandar cada item a su estacion.
     * 
     * @returns Coleccion de items que integran al producto. Un item devuelve una lista con si mismo;
     * un combo, una lista con los items que lo integran.
     */
    getItems(): Item[];

    /**
     * @returns El nombre del producto.
     */
    getNombre(): string;
}