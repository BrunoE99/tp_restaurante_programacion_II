import MediosDePago from './iMediosDePago';

/**
 * Pago con billetera virtual.
 */
export default class BilleteraVirtual implements MediosDePago {
    /**
     * Informa por consola que el pago con billetera virutal se completo.
     */
    public pagoCompletado(): void {
        console.log('Pago con billetera virtual completado con éxito.');
    }

    /**
     * @returns Siempre `false`, los pagos con billetera virtual no aplican para el descuento en efectivo.
     */
    public aplicaDescuentoEfectivo(): boolean {
        return false;
    }
}   