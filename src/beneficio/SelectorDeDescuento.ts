import {Descuento} from "./Descuento";
import  {Pedido} from "../pedido/pedido";

/**
 * Elige el descuento mas beneficioso para el cliente entre los disponibles.
 * 
 * Aplica solo la promocion que genere el mayor ahorro (la mas beneficiosa). Nunca se acumulan.
 */
export class SelectorDeDescuento {

    private descuentos: Descuento[];

    /**
     * @param descuentos Lista de descuentos disponibles a evaluar.
     */
    public constructor(descuentos: Descuento[]) {
        this.descuentos = descuentos;
    }

    /**
     * Evalua todos los descuentos y devuelve el mayor aplicable al pedido.
     * 
     * @param pedido Pedido sobre el cual se evaluan los descuentos.
     * @returns El mayor monto a descontar; o `0` si ninguno aplica o si la lista esta vacia.
     */
    public obtenerMejorDescuento(pedido: Pedido): number {
        return this.descuentos.reduce((mejorDescuento, descuentoActual) =>
             Math.max(mejorDescuento, descuentoActual.calcularDescuento(pedido)), 0);
    }

    /**
     * Calcula el importe final que debe abonar el cliente tras restar el mejor descuento.
     * 
     * @param pedido Pedido a cobrar.
     * @returns El precio total del pedido menos el valor del mejor descuento.
     */
    public calcularTotalACobrar(pedido: Pedido): number {
        return pedido.getPrecioTotal() - this.obtenerMejorDescuento(pedido);
    }    
}