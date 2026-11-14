/** 
 * Clase base de todas las excepciones del restaurante.
 * 
 * Permite distinguir los errores propios del negocio de los errores nativos de JS mediante un unico `instanceof`.
 * Es abstracta: nunca se instancia ni se lanza directamente, sino a traves de sus clases concretas.
 * 
 * @example
 * try {
 *  gestor.confirmarPedido(numero);
 * } catch (error) {
 *  if (error instanceof ErrorRestaurante) {
 *      console.error(error.getMensaje());
 *  } else {
 *      throw error;
 *  }
 * }
*/
export abstract class ErrorRestaurante extends Error {

    /**
     * Devuelve el mensaje descriptivo de la excepcion.
     * 
     * @returns El mismo texto que `message`, armado por la excepcion concreta al construirse. 
     */
    public getMensaje(): string {
        return this.message;
    }

}
