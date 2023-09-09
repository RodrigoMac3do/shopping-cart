const fetchItem = async (id) => {
  if (!id) return new Error('You must provide an url');

  try {
    const res = await fetch(`https://api.mercadolibre.com/items/${id}`);

    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
