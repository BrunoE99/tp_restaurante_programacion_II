import Empleado from "./abstractEmpleado";
import Cliente from "./cliente";
import Pedido from "./pedido";
import GestorDePedidos from "./GestorDePedidos";
export default class Mozo extends Empleado {
    private gestorDePedidos: GestorDePedidos;

    public constructor(clientes: Cliente[], pedidos: Pedido[], gestorDePedidos: GestorDePedidos) {
        super(clientes, pedidos);
        this.gestorDePedidos = gestorDePedidos;
    }

}