/**
 * Função para buscar produtos em uma API externa com base em um termo de pesquisa.
 *
 * @param {string} product - O termo de pesquisa para produtos.
 * @returns {Promise<object>} Um objeto contendo os resultados da pesquisa.
 * @throws {Error} Lança um erro se a requisição falhar ou se o termo de pesquisa for inválido.
 *
 * @example
 * const products = await fetchProducts('computador');
 * console.log(products.results); // Array de produtos encontrados.
 */
const fetchProducts = async (product) => {
  try {
    const res = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=${product}`,
    );

    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
