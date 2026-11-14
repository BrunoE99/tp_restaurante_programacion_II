export default class Cliente {
    private mesaAsignada: number;

    public constructor(mesaAsignada: number) {
        this.mesaAsignada = mesaAsignada;
    }

    public getMesaAsignada(): number {
        return this.mesaAsignada;
    }

    public setMesaAsignada(mesaAsignada: number): void {
        this.mesaAsignada = mesaAsignada;
    }
}