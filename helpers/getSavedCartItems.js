// const itensDoCarrinho = document.querySelector('.cart__items');
const getSavedCartItems = () => {
 return itensDoCarrinho = localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
