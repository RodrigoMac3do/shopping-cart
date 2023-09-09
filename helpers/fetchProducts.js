const fetchProducts = async (product) => {
  if (!product) return new Error('You must provide an url');

  try {
    const res = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=${product}`,
    );

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
