import MediosDePago from './IMediosDePago';
export default class Efectivo implements MediosDePago {
    public pagoCompletado(): void {
        console.log('Pago en efectivo completado con éxito.');
    }
}   