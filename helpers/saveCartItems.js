const saveCartItems = (name) => localStorage.setItem('cartItems', name);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
