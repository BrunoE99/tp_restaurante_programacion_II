import Estacion from "./estacion";
import Parrilla from "./parrilla";
import Barra from "./barra";
import CocinaFria from "./cocinaFria";
import CocinaDulce from "./cocinaDulce";

/**
 * Arma la cadena de estaciones de la cocina.
 * 
 * Crea una instancia de cada estacion y las enlaza en un orden especifico, formando la cadena de responsabilidad:
 * `Parrilla` -> `Barra` -> `CocinaFria` -> `CocinaDulce`.
 * 
 * Los items se entregan a la primera estacion y cada una los acepta o los envia a la siguiente.
 * 
 * El `GestorPedidos` solo conoce la primera estacion de la cadena {@link getPrimeraEstacion}.
 * 
 * Para sumar una nueva estacion: se crea su subclase y se agrega a la cadena.
 * 
 * @example
 * const cadena = new CadenaEstaciones();
 * const gestor = new GestorPedidos(cadena.getPrimeraEstacion());
 */
export class CadenaEstaciones {

    private primeraEstacion: Estacion;
    private estaciones: Estacion[];

    /**
     * Crea las estaciones y las enlaza.
     */
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

    /**
     * Devuelve la primera estacion de la cadena, utilizada por `GestorPedidos` para enviar los items
     * de un pedido confirmado.
     * 
     * @returns La primera estacion de la cadena.
     */
    public getPrimeraEstacion(): Estacion {
        return this.primeraEstacion;
    }

    /**
     * Devuelve una copia del listado de todas las estaciones de la cadena, para evitar
     * que se modifique la coleccion interna desde afuera.
     * 
     * @returns Copia de la lista de estaciones.
     */
    public getEstaciones(): Estacion[] {
        return [...this.estaciones];
    }

}