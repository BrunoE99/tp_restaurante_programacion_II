import {Pedido} from '../pedido/pedido' ;


export interface Descuento {
    calcularDescuento(pedido: Pedido): number;
}
