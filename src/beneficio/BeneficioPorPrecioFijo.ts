import { Beneficio } from './Beneficio';

export class BeneficioPorPrecioFijo implements Beneficio {

    private precioFijo: number;

    public constructor(precioFijo: number) {
        this.precioFijo = precioFijo;
    }

    public calcularBeneficio(): number {
        return this.precioFijo;
    }

}