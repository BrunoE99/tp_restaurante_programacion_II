/**
 * Interfaz que define el contrato del patron Strategy para los distintos medios de pago.
 * 
 * Cada medio de pago responde si califica para el descuendo por efectivo o no.
 */
export default interface MediosDePago {
    /**
     * Informa que el pago con este medio se completo.
     */
    pagoCompletado(): void;

    /**
     * @returns `true` si corresponde aplicar el descuento en efectivo; `false` si no.
     */
    aplicaDescuentoEfectivo(): boolean;
}