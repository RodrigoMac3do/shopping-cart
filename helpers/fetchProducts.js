const fetchProducts = async (produto) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
    const resposta = await fetch(url);
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    return erro;
  }
};
// console.log(fetchProducts('computador'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}