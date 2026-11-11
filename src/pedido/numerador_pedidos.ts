export class NumeradorPedidos {

    private ultimoNumero: number;

    public constructor() {
        this.ultimoNumero = 0;
    }

    public siguienteNumero(): number {
        this.ultimoNumero++;

        return this.ultimoNumero;
    }

}