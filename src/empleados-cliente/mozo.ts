import Empleado from "./abstractEmpleado";
import Cliente from "./cliente";
import {Pedido} from "../pedido/pedido";
import {GestorPedidos} from "../pedido/gestor_pedidos";
export default class Mozo extends Empleado {
    private gestorDePedidos: GestorPedidos;

    public constructor(clientes: Cliente[], pedidos: Pedido[], gestorDePedidos: GestorPedidos) {
        super(clientes, pedidos);
        this.gestorDePedidos = gestorDePedidos;
    }

}