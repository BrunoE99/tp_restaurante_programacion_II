export default abstract class Estacion{

protected itemValido(item:Item,comparacion:string):boolean{
    return item.tipo==comparacion;
}

public abstract preparar(item:Item):Item;

}