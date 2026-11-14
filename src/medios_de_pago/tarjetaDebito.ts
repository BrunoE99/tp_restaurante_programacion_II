import MediosDePago from './iMediosDePago';
import AbstractTarjeta from './abstractTarjeta';

/**
 * Pago con trajeta de debito.
 * Los datos y la regla del descuento la hereda de {@link AbstractTarjeta}.
 */
export default class TarjetaDebito extends AbstractTarjeta {
    /**
     * 
     * @param medioDePago Medio de pago asociado.
     * @param numeroTarjeta Numero de la tarjeta.
     * @param nombreTitular Nombre del titular.
     * @param codigoSeguridad Codigo de seguridad (CVV/CVC).
     * @param fechaVencimiento Fecha de vencimiento.
     * @param saldo Saldo o limite disponible.
     */
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

    /**
     * Informa por consola que el pago con tarjeta de credito se completo.
     */
    public pagoCompletado(): void {
        console.log('Pago con tarjeta de débito completado con éxito.');
    }
    }