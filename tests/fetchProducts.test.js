require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifica se a função fetchProducts é assíncrona', async () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Verifica se a função fetchProducts retorna um objeto', async () => {
    const res = await fetchProducts('computador');

    expect(typeof res).toBe('object');
    expect(res).toHaveProperty('site_id');
    expect(res).toHaveProperty('results');
    expect(res).toEqual(computadorSearch);
    expect(Array.isArray(res.results)).toBe(true);
  });

  it('Com parametro inválido retorna um erro com a mensagem "You must provide an url."', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
