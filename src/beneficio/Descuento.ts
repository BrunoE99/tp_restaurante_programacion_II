import {Pedido} from '../pedido/pedido' ;

/**
 * Interfaz que define el contrato del patron Strategy para calcular descuentos
 * aplicables a un pedido completo al cobrarlo.
 * 
 * Recibe la instancia completa del pedido para evaluar sus condiciones.
 */
export interface Descuento {
    /**
     * Evalua si el pedido cumple las condiciones y calcula el importe a descontar.
     * 
     * @param pedido Pedido sobre el que se evalua el descuento.
     * @returns Monto a descontar del total del pedido (`0` si no cumple las condiciones).
     */
    calcularDescuento(pedido: Pedido): number;
}
