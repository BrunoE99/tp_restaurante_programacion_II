/**
 * Interfaz que define el contrato del patron Strategy para calcular el precio especial de un combo.
 */
export interface Beneficio {
    /**
     * Calcula el precio final del combo a partir de la suma de sus productos.
     * 
     * @param sumaDeProductos Suma de los precios individuales de los productos del combo.
     * @returns El monto final con el beneficio ya aplicado (no el monto descontado).
     */
    calcularBeneficio(sumaDeProductos: number): number;
}