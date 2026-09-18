import MediosDePago from './IMediosDePago';
import AbstractTarjeta from './AbstractTarjeta';
export default class TarjetaDebito extends AbstractTarjeta {
    public constructor(
        medioDePago: MediosDePago,
         numeroTarjeta: string,
          nombreTitular: string,
           codigoSeguridad: string,
            fechaVencimiento: string,
             saldo: number
            ) {
        super(medioDePago, numeroTarjeta, nombreTitular, codigoSeguridad, fechaVencimiento, saldo);
    }

    public pagoCompletado(): void {
        console.log('Pago con tarjeta de débito completado con éxito.');
    }
}