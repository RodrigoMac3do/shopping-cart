require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  beforeEach(async ()=>{
    return result = await fetchItem('MLB1615760527');
  })
  it('Com o argumento "MLB1615760527" teste se fetch foi chamada', () => {
    expect(fetch).toHaveBeenCalled();
  });
  it('Com o argumento "MLB1615760527" deve retornar o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('O retorno da função com argumento "MLB1615760527" retorna um objeto', () => {
    expect(result).toEqual(item);
  });
  it('Sem parametro retorna um erro com a mensagem "You must provide an url."', async () => {
    const resultado = await fetchItem();
    expect(resultado).toEqual(new Error("You must provide an url"));
  });
});
