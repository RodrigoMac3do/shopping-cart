require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Verifica se a função fetchItem é assíncrona', async () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Verifica se a função fetchItem retorna um objeto', async () => {
    const itemId = 'MLB1615760527';
    const res = await fetchItem('MLB1615760527');

    expect(res).toEqual(item);
    expect(res).toHaveProperty('id', itemId);
    expect(res).toHaveProperty('title');
    expect(res).toHaveProperty('price');
    expect(typeof res).toBe('object');
  });

  it('Com parametro inválido retorna um erro com a mensagem "You must provide an url."', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
