/**
 * Função para recuperar itens do carrinho salvos no Local Storage.
 *
 * @returns {Array} Um array de itens do carrinho recuperados do Local Storage.
 *
 * @example
 * const savedItems = getSavedCartItems();
 * console.log(savedItems); // Array de itens do carrinho recuperados.
 */
const getSavedCartItems = () =>
  JSON.parse(localStorage.getItem('cartItems')) || [];

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
