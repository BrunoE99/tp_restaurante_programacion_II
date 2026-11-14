import MediosDePago from './iMediosDePago';

/**
 * Clase base abstracta para los medios de pago con tarjeta.
 * 
 * Guarda los datos comunes de la tarjeta y define que ninguna califica para el
 * descuento en efectivo.
 */
export default abstract class AbstractTarjeta implements MediosDePago {
    private medioDePago: MediosDePago;
    private numeroTarjeta: string;
    private nombreTitular: string;
    private codigoSeguridad: string;
    private fechaVencimiento: string;
    private saldo: number;
    private readonly calificaDescuentoEfectivo = false;

    /**
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
        this.medioDePago = medioDePago;
        this.numeroTarjeta = numeroTarjeta;
        this.nombreTitular = nombreTitular;
        this.codigoSeguridad = codigoSeguridad;
        this.fechaVencimiento = fechaVencimiento;
        this.saldo = saldo;
    }

    /**
     * Procesa y confirma el pago segun las reglas de cada tipo de tarjeta.
     */
    public abstract pagoCompletado(): void;

    /**
     * @returns Siempre `false`, los pagos con tarjeta no aplican para el descuento en efectivo.
     */
    public aplicaDescuentoEfectivo(): boolean {
        return this.calificaDescuentoEfectivo;
    }

}