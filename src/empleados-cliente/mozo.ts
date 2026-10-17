import Empleado from "./abstractEmpleado";
import Cliente from "./cliente";
import Pedido from "../pedido/pedido";
import GestorDePedidos from "../pedido/gestor_pedidos";
export default class Mozo extends Empleado {
    private gestorDePedidos: GestorDePedidos;

    public constructor(clientes: Cliente[], pedidos: Pedido[], gestorDePedidos: GestorDePedidos) {
        super(clientes, pedidos);
        this.gestorDePedidos = gestorDePedidos;
    }

}