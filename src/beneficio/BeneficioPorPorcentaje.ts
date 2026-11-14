import { Beneficio } from './Beneficio';

/**
 * Estrategia que aplica un descuento porcentual sobre el total de los productos del combo.
 */
export class BeneficioPorPorcentaje implements Beneficio {

    private porcentaje: number;

    /**
     * @param porcentaje Porcentaje de descuento a aplicar, en escala de 0 a 100.
     */
    public constructor(porcentaje: number) {
        this.porcentaje = porcentaje;
    }

    /**
     * Calcula el importe final tras descontar el porcentaje recibido.
     * 
     * @param sumaDeProductos Suma de los precios individuales de los productos del combo.
     * @returns El monto final con el descuento porcentual ya aplicado.
     */
    public calcularBeneficio(sumaDeProductos: number): number {
        return sumaDeProductos * (1 - this.porcentaje / 100);
    }

}