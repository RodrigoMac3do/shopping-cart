// const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');
const getSavedCartItems = require('../helpers/getSavedCartItems');

// localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // Antes de cada teste, limpe o Local Storage para evitar conflitos entre os testes.
  beforeEach(() => {
      localStorage.clear();
  });

  it('Deve salvar um array vazio no Local Storage quando nenhum item é fornecido', () => {
    saveCartItems([]);

    const cartItems = getSavedCartItems();

    expect(cartItems).toEqual([]);
  });

  it('Deve salvar e recuperar itens do carrinho corretamente', () => {
    const cartItems = [
      { id: 'MLB12345', title: 'Produto 1', price: 19.99 },
      { id: 'MLB67890', title: 'Produto 2', price: 29.99 },
    ];

    saveCartItems(cartItems);

    const cartItemsFromLocalStorage = getSavedCartItems();

     expect(cartItemsFromLocalStorage).toEqual(cartItems);
  });
});
