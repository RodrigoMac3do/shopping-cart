// const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');
const saveCartItems = require('../helpers/saveCartItems');

// localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // Antes de cada teste, limpe o Local Storage para evitar conflitos entre os testes.
  beforeEach(() => {
    localStorage.clear();
  });

  it('Deve retornar um array vazio se não houver itens no localStorage', () => {
    const storedCartItems = getSavedCartItems();

    expect(storedCartItems).toEqual([]);
  });

  it('Deve retornar os itens do carrinho do localStorage', () => {
    const mockCartItems = [{ id: 1, name: 'Item 1', price: 10 }];

    localStorage.setItem('cartItems', JSON.stringify(mockCartItems));

    const cartItems = getSavedCartItems();

    expect(cartItems).toEqual(mockCartItems);
  });

  it('Deve salvar os itens do carrinho no localStorage', () => {
    const mockCartItems = [{ id: 1, name: 'Item 1', price: 10 }];

    saveCartItems(mockCartItems);

    const storedCartItems = getSavedCartItems();

    expect(storedCartItems).toEqual(mockCartItems);
  });
});
