const fetchItem = async (id) => {
  try {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const resposta = await fetch(url);
  const dados = await resposta.json();
  return dados;
  } catch (erro) {
    return erro;
  }
};

fetchItem('MLB1615760527');
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
