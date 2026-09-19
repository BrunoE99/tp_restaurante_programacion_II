import { Beneficio } from './Beneficio';

export class BeneficioPorPorcentaje implements Beneficio {

    private porcentaje: number;

    public constructor(porcentaje: number) {
        this.porcentaje = porcentaje;
    }

    public calcularBeneficio(sumaDeProductos: number): number {
        return sumaDeProductos * (1 - this.porcentaje / 100);
    }

}