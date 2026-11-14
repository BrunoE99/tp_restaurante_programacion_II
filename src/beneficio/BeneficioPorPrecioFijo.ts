import { Beneficio } from './Beneficio';

/**
 * Estrategia que fija un precio cerrado fijo, independientemente de la suma de los productos.
 */
export class BeneficioPorPrecioFijo implements Beneficio {

    private precioFijo: number;

    /**
     * @param precioFijo Precio final fijo del combo. 
     */
    public constructor(precioFijo: number) {
        this.precioFijo = precioFijo;
    }

    /**
     * Devuelve el precio fijo, ignorando la suma de los productos.
     * 
     * @returns El precio fijo del combo.
     */
    public calcularBeneficio(): number {
        return this.precioFijo;
    }

}