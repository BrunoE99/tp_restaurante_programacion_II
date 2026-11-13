import Estacion from "./estacion";
import Parrilla from "./parrilla";
import Barra from "./barra";
import CocinaFria from "./cocinaFria";
import CocinaDulce from "./cocinaDulce";

export class CadenaEstaciones {

    private primeraEstacion: Estacion;
    private estaciones: Estacion[];

    public constructor() {
        const parrilla = new Parrilla();
        const barra = new Barra();
        const cocinaFria = new CocinaFria();
        const cocinaDulce = new CocinaDulce();

        parrilla.setSiguiente(barra);
        barra.setSiguiente(cocinaFria);
        cocinaFria.setSiguiente(cocinaDulce);

        this.primeraEstacion = parrilla;
        this.estaciones = [parrilla, barra, cocinaFria, cocinaDulce];
    }

    public getPrimeraEstacion(): Estacion {
        return this.primeraEstacion;
    }

    public getEstaciones(): Estacion[] {
        return [...this.estaciones];
    }

}