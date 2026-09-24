import  Estacion  from "./estacion";
import ESTADO_ITEM from "./estado_item";
export default class Barra extends Estacion{

public preparar(item:Item):Item{
    if(this.itemValido(item,"BEBIDA")==false){
    return null;
    } else{   
    item.estado = ESTADO_ITEM.EN_PREPARACION;
    console.log("item en preparacion en cocina dulce");
    item.estado = ESTADO_ITEM.LISTO;
    console.log("item listo en cocina dulce");
    return item;
    }
}

}