/**
 * Estados por los que pasa cada item de un pedido en la cocina.
 * 
 * El avance es en este orden: `PENDIENTE` -> `EN_PREPARACION` -> `LISTO`. No tiene vuelta atras.
 */
export enum EstadoItem {
    /** El item esta en la cola de su estacion, esperando a ser preparado. */
    PENDIENTE,
    /** La estacion comenzo a prepararlo, ya no puede modificarse ni cancelarse. */
    EN_PREPARACION,
    /** La preparacion finalizo. */
    LISTO
}