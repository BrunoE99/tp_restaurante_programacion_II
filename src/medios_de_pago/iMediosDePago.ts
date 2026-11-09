export default interface MediosDePago {
    pagoCompletado(): void;
    aplicaDescuentoEfectivo(): boolean;
}