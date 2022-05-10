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

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
