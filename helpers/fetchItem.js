/**
 * Função fetchItem
 *
 * Esta função faz uma requisição à API do Mercado Livre para obter informações sobre um item com base no ID fornecido.
 *
 * @param {string} id - O ID do item que você deseja obter informações.
 * @returns {Promise} Uma Promise que resolve com os dados do item se a requisição for bem-sucedida. Caso contrário, lança um erro com a mensagem "You must provide an url".
 * @throws {Error} Lança um erro com a mensagem "You must provide an url" se o ID não for fornecido ou se a requisição falhar.
 */
const fetchItem = async (id) => {
  try {
    const res = await fetch(`https://api.mercadolibre.com/items/${id}`);

    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
