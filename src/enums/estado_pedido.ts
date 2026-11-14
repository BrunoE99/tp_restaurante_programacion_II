/**
 * Estados por los que pasa cada pedido.
 * 
 * El avance es en este orden: `EN_CONSTRUCCION` -> `CONFIRMADO` -> `FACTURADO`.
 */
export enum EstadoPedido {
    /** El pedido se esta armando, se pueden agregar y quitar productos. */
    EN_CONSTRUCCION,
    /** El pedido fue enviado a cocina, ya no admite correcciones de productos. */
    CONFIRMADO,
    /** Todos sus items estan listos, se cobro y se agrego al historial. */
    FACTURADO
}