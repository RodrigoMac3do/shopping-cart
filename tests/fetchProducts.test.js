require("../mocks/fetchSimulator");
const { fetchProducts } = require("../helpers/fetchProducts");
const computadorSearch = require("../mocks/search");

describe("1 - Teste a função fecthProducts", () => {
  it("Teste se fetchProducts é uma função", () => {
    expect(typeof fetchProducts).toBe("function");
  });
  it('Com o argumento "computador" e teste se fetch foi chamada', () => {
    fetchProducts("computador");
    expect(fetch).toHaveBeenCalled();
  });
  it('Com o argumento "computador" deve retornar "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    fetchProducts("computador");
    expect(fetch).toHaveBeenCalledWith(
      "https://api.mercadolibre.com/sites/MLB/search?q=computador"
    );
  });
  it('O retorno da função com argumento "computador" retorna um objeto', async () => {
    const resultado = await fetchProducts("computador");
    expect(resultado).toEqual(computadorSearch);
  });
  it('Sem parametro retorna um erro com a mensagem "You must provide an url."', async () => {
    const resultado = await fetchProducts();
    expect(resultado).toEqual(new Error("You must provide an url"));
  });
});

console.log(computadorSearch);
