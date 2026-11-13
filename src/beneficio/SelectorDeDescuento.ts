import {Descuento} from "./Descuento";
import  {Pedido} from "../pedido/pedido";

export class SelectorDeDescuento {

    private descuentos: Descuento[];

    public constructor(descuentos: Descuento[]) {
        this.descuentos = descuentos;
    }

    public obtenerMejorDescuento(pedido: Pedido): number {
        return this.descuentos.reduce((mejorDescuento, descuentoActual) => Math.max(mejorDescuento, descuentoActual.calcularDescuento(pedido)), 0);
    }

    public calcularTotalACobrar(pedido: Pedido): number {
        return pedido.getPrecioTotal() - this.obtenerMejorDescuento(pedido);
    }    
}