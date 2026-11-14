import { Categoria } from "../enums/categoria";
import { ErrorEstacionItemNoEnPreparacion } from "../excepciones/estacion/error_estacion_item_no_en_preparacion";
import { ErrorEstacionNoEncontrada } from "../excepciones/estacion/error_estacion_no_encontrada";
import { ErrorEstacionSinItems } from "../excepciones/estacion/error_estacion_sin_items";
import { ItemPedido } from "../pedido/item_pedido";

/**
 * Estacion de trabajo de la cocina que prepara los items de ciertas categorias
 * (por ejemplo, la parrilla prepara solo las carnes).
 * 
 * Las estaciones forman una cadena (patron Chain of Responsibility): cuando una
 * estacion recibe un item, lo encola si acepta su categoria; si no, lo delega en
 * la estacion siguiente. Asi, agregar una estacion nueva no requiere modificar las existentes.
 * 
 * Cada estacion atiende su cola en orden de llegada (FIFO), de forma
 * independiente de las demas. Un item pasa por la estacion en dos pasos:
 * {@link iniciarSiguiente} PENDIENTE -> EN_PREPARACION y
 * {@link finalizar} EN_PREPARACION -> LISTO.
 * 
 * Es abstracta: cada subclase (`Parrilla`, `CocinaFria`, `Barra`, `CocinaDulce`)
 * solo define su nombre y las categorias que acepta.
 */
export default abstract class Estacion {

    private siguiente: Estacion | undefined;
    private items: ItemPedido[];
    private itemsEnPreparacion: ItemPedido[];
    private categorias: Categoria[];
    private readonly nombre: string;

    /**
     * Crea la estacion con su cola vacia y sin estacion siguiente.
     * 
     * @param nombre Nombre con el que se identifica la estacion.
     * @param categorias Categorias de items que la estacion acepta preparar.
     */
    public constructor (nombre: string, categorias: Categoria[]) {
        this.nombre = nombre;
        this.siguiente = undefined;
        this.items = [];
        this.itemsEnPreparacion = [];
        this.categorias = categorias;
    }

    /**
     * @returns El nombre de la estacion.
     */
    public getNombre(): string {
        return this.nombre;
    }

    /**
     * Enlaza esta estacion con la siguiente de la cadena.
     * 
     * Cada estacion conoce solo a su siguiente.
     * 
     * @param estacion Estacion a la que se delegan los items que esta no acepta.
     */
    public setSiguiente(estacion: Estacion): void {
        this.siguiente = estacion;
    }

    /**
     * Evalua si el item corresponde a esta estacion para encolarlo, o lo envia
     * a la siguiente estacion de la cadena.
     * 
     * @param item Item a asignar de un pedido.
     * 
     * @throws {@link ErrorEstacionNoEncontrada} Si el item recorre toda la cadena 
     * y ninguna estacion acepta su categoria.
     */
    public recibir(item: ItemPedido): void {
        if (this.acepta(item)) {
            this.items.push(item);
            return;
        }

        if (this.siguiente === undefined) {
            throw new ErrorEstacionNoEncontrada(item.getNombre(), item.getCategoria());
        }

        this.siguiente.recibir(item);
    }

    /**
     * Indica si la estacion tiene items esperando para prepararse.
     * 
     * @returns `true` si hay al menos un item en la cola; `false` si esta vacia.
     */
    public tieneItemsEnCola(): boolean {
        return this.items.length > 0;
    }

    /**
     * Toma el primer item pendiente de la cola (FIFO) y comienza a prepararlo:
     * pasa de `PENDIENTE` a `EN_PREPARACION`.
     * 
     * @returns El item que comenzo a prepararse
     * @throws {@link ErrorEstacionSinItems} Si la cola esta vacia.
     * @throws {@link ErrorItemPedidoEstadoIncorrecto} Si el item no esta `PENDIENTE`.
     */
    public iniciarSiguiente(): ItemPedido {
        const item = this.items.shift();

        if (item === undefined) {
            throw new ErrorEstacionSinItems(this.nombre);
        }

        item.iniciarPreparacion();
        this.itemsEnPreparacion.push(item);
        
        return item;
    }

    /**
     * Termina la preparacion de un item: lo marca como `LISTO` y lo retira de los items
     * en preparacion de la estacion.
     * 
     * @param item Item que esta `EN_PREPARACION` y se quiere finalizar su preparacion.
     * @throws {@link ErrorEstacionItemNoEnPreparacion} Si el item no esta siendo preparado en esta estacion.
     * @throws {@link ErrorItemPedidoEstadoIncorrecto} Si el item no esta en estado `EN_PREPARACION`.
     */
    public finalizar(item: ItemPedido): void {
        const posicion = this.itemsEnPreparacion.indexOf(item);

        if (posicion < 0) {
            throw new ErrorEstacionItemNoEnPreparacion(item.getNombre(), this.nombre);
        }

        item.marcarListo();

        this.itemsEnPreparacion.splice(posicion, 1);
    }

    /**
     * Decide si la estacion puede preparar el item segun su categoria.
     * Es `protected` para que las subclases puedan sobreescribirlo si necesitan otro criterio de aceptacion.
     * 
     * @param item Item a evaluar su aceptacion.
     * @returns `true` si la categoria del item esta entre las que acepta la estacion; `false` si no esta.
     */
    protected acepta(item: ItemPedido): boolean {
        return this.categorias.includes(item.getCategoria());
    }

}