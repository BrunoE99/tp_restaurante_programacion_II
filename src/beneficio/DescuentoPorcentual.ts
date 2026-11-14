import {Descuento} from "./Descuento";
import  {Pedido} from "../pedido/pedido";

/**
 * Base del patron Template Method de los descuentos que restan un porcentaje
 * del total del pedido.
 * 
 * {@link calcularDescuento} define el algoritmo general del calculo sobre el total del
 * pedido y delega en {@link aplica} la condicion particular que cada subclase evalua. 
 */
export abstract class DescuentoPorcentual implements Descuento {
    private porcentaje: number;

    /**
     * @param porcentaje Porcentaje de descuento a aplicar, en escala de 0 a 100.
     */
    public constructor(porcentaje: number) {
        this.porcentaje = porcentaje;
    }

    /**
     * @returns El porcentaje de descuento, en escala de 0 a 100.
     */
    protected getPorcentaje(): number {
        return this.porcentaje;
    }

    /**
     * Calcula el importe a descontar si el pedido cumple la condicion definida por la subclase.
     * 
     * @param pedido Pedido sobre el cual se evalua el descuento.
     * @returns Monto a descontar del total del pedido, o `0` si aplica devuelve `false`.
     */
    public calcularDescuento (pedido: Pedido): number { 
    if (!this.aplica(pedido)) {
        return 0;
    }
    return pedido.getPrecioTotal() * (this.porcentaje / 100);
    }
    
    /**
     * Evalua si el pedido cumple con los requisitos necesarios para acceder al descuento.
     * 
     * @param pedido Pedido a evaluar.
     * @returns `true` si el descuento es aplicable; `false` si no.
     */
    protected abstract aplica (pedido: Pedido): boolean;

}