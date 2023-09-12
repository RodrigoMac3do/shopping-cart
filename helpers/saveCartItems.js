/**
 * Função para salvar itens do carrinho no Local Storage.
 *
 * @param {Array} produtos - Um array de objetos representando os itens do carrinho a serem salvos.
 *
 * @example
 * const cartItems = [
 *   { id: 'MLB12345', title: 'Produto 1', price: 19.99 },
 *   { id: 'MLB67890', title: 'Produto 2', price: 29.99 }
 * ];
 * saveCartItems(cartItems);
 * // Os itens do carrinho são salvos no Local Storage.
 */
const saveCartItems = (produtos) =>
  localStorage.setItem('cartItems', JSON.stringify(produtos));

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
