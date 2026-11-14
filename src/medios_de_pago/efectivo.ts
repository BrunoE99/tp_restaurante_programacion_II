import MediosDePago from './iMediosDePago';

/**
 * Pago con efectivo.
 * 
 * Es el unico medio que califica para el descuento por efectivo.
 */
export default class Efectivo implements MediosDePago {
    private readonly mensajePago = 'Pago en efectivo completado con éxito.';
    private readonly calificaDescuentoEfectivo = true;
    
    /**
     * Informa por consola que el pago con efectivo se completo.
     */
    public pagoCompletado(): void {
        console.log(this.mensajePago);
    }

    /**
     * @returns Siempre `true`, el pago con efectivo es el unico que califica para el descuento por efectivo.
     */
    public aplicaDescuentoEfectivo(): boolean {
        return this.calificaDescuentoEfectivo;
    }
}   