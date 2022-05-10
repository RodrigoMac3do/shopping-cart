const saveCartItems = (itensDoCarrinho) => {
  localStorage.setItem('cartItems', itensDoCarrinho);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
