/**
 * Genera los numeros de pedido, de forma consecutiva y sin repetir (1, 2, 3, ...).
 * 
 * Es usado por {@link pedido/gestor_pedidos!GestorPedidos} al registrar cada pedido, para que todos tengan un numero unico.
 */
export class NumeradorPedidos {

    private ultimoNumero: number;

    /**
     * Crea el numerador. El primer numero que entrega es `1`.
     */
    public constructor() {
        this.ultimoNumero = 0;
    }

    /**
     * @returns El siguiente numero de pedido.
     */
    public siguienteNumero(): number {
        this.ultimoNumero++;

        return this.ultimoNumero;
    }

}