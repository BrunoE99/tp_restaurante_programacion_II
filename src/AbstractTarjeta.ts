import MediosDePago from './IMediosDePago';
export default abstract class AbstractTarjeta implements MediosDePago {
    private medioDePago: MediosDePago;
    private numeroTarjeta: string;
    private nombreTitular: string;
    private codigoSeguridad: string;
    private fechaVencimiento: string;
    private saldo: number;

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

    public abstract pagoCompletado(): void;

}