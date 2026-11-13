import { Pedido } from "../pedido";

export interface FabricaPedido {
    crearPedido(numero: number): Pedido;
}