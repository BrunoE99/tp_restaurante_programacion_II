import Cliente from "./cliente";
import Pedido from "./pedido";
import iMedioDePago from "./iMedioDePago";

export default abstract class Empleado {
    private clientes: Cliente[];
    private pedidos: Pedido[];

    public constructor(clientes: Cliente[], pedidos: Pedido[]) {
        this.clientes = clientes;
        this.pedidos = pedidos;
    }

   public setClientes(clientes: Cliente[]): void {
        this.clientes = clientes;
    }

    public getClientes(): Cliente[] {
        return this.clientes;
    }

    public setPedidos(pedidos: Pedido[]): void {
        this.pedidos = pedidos;
    }

    public getPedidos(): Pedido[] {
        return this.pedidos;
    }               

    public cobrarPedido(cliente: Cliente, medioDePago: iMedioDePago): void {
        cliente.pagarPedido(medioDePago);
    }
}