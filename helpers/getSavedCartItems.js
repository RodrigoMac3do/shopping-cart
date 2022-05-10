const itensDoCarrinho = document.querySelector('.cart__items');
const getSavedCartItems = () => {
  itensDoCarrinho.innerHTML = localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
