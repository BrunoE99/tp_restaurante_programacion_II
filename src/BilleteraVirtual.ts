import MediosDePago from './IMediosDePago';
export default class BilleteraVirtual implements MediosDePago {
    public pagoCompletado(): void {
        console.log('Pago con billetera virtual completado con éxito.');
    }
}   