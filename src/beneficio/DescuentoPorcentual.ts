import {Descuento} from "./Descuento";
import  {Pedido} from "../pedido/pedido";
export abstract class DescuentoPorcentual implements Descuento {
    private porcentaje: number;

    public constructor(porcentaje: number) {
        this.porcentaje = porcentaje;
    }

    public calcularDescuento (pedido: Pedido): number { 
    if (!this.aplica(pedido)) {
        return 0;
    }
    return pedido.getPrecioTotal() * (this.porcentaje / 100);
    }
    
    protected abstract aplica (pedido: Pedido): boolean;

}