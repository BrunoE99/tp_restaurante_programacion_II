import { Pedido } from "../pedido";

/**
 * Interfaz que define el contrato del patron Factory Method para la creacion de Pedidos.
 * 
 * Cada fabrica recibe en su constructor los datos de su modalidad, 
 * haciendo que el {@link pedido/gestor_pedidos!GestorPedidos}
 * registre cualquier modalidad sin conocerla.
 */
export interface FabricaPedido {
    /**
     * Crea y devuelve un pedido con el numero asignado por el gestor.
     * 
     * @param numero Numero de pedido.
     * @returns Pedido nuevo de la modalidad de la fabrica, en estado `EN_CONSTRUCCION`.
     */
    crearPedido(numero: number): Pedido;
}