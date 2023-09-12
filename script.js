/* eslint-disable max-lines */
const items = document.querySelector('.items');

const getItemsLocalStorage = getSavedCartItems();
const sectionItems = document.querySelector('.items');
const buttons = document.querySelectorAll('.item__add');
const empty = document.querySelector('button.empty-cart');
const values = document.querySelector('p.total-price');

const cartItems = document.querySelector('.cart__items');
const getCartList = () => document.querySelectorAll('.cart__items li');

/**
 * Função que cria um elemento de carregamento.
 * @returns {HTMLSpanElement} Um elemento HTML <span> com a classe "loading" e o texto "carregando...".
 */
const loading = () => {
  // Cria um elemento <span> com classe "loading"
  const loadingSpan = Object.assign(document.createElement('span'), {
    className: 'loading',
  });

  // Define o texto interno do elemento como "carregando..."
  loadingSpan.innerHTML = 'carregando...';

  // Retorna o elemento criado
  return loadingSpan;
};

/**
 * Cria e retorna um elemento HTML <img> para exibir uma imagem de produto.
 * @param {string} imageSource - A URL da imagem a ser exibida no elemento <img>.
 * @returns {HTMLImageElement} Um elemento HTML <img> com a classe "item__image" e a imagem especificada na URL.
 */
const createProductImageElement = (imageSource) => {
  // Cria um elemento <img> com classe "item__image"
  const img = Object.assign(document.createElement('img'), {
    className: 'item__image',
  });

  // Define a fonte da imagem com a URL fornecida
  img.src = imageSource;

  // Retorna o elemento <img> criado
  return img;
};

/**
 * Cria e retorna um elemento HTML personalizado com a tag, classe e texto especificados.
 * @param {string} element - A tag HTML do elemento a ser criado (por exemplo, 'div', 'p', 'span', etc.).
 * @param {string} className - A classe CSS a ser atribuída ao elemento criado.
 * @param {string} innerText - O texto a ser exibido dentro do elemento criado.
 * @returns {HTMLElement} Um elemento HTML criado com a tag, classe e texto especificados.
 */
const createCustomElement = (element, className, innerText) => {
  // Cria um elemento HTML com a tag especificada
  const htmlElement = Object.assign(document.createElement(`${element}`), {
    className: `${className}`,
  });

  // Define o texto interno do elemento com o valor especificado
  htmlElement.innerText = innerText;

  // Retorna o elemento HTML personalizado criado
  return htmlElement;
};

/**
 * Obtém o SKU de um item de produto a partir de um elemento HTML que representa o item.
 * @param {HTMLElement} item - O elemento HTML que representa um item de produto, geralmente obtido com `document.querySelector` ou similar.
 * @returns {string} O SKU (unidade de manutenção de estoque) do item de produto.
 */
const getSkuFromProductItem = (item) =>
  item.querySelector('span.item__sku').innerText;

/**
 * Calcula o preço total dos itens no carrinho de compras e exibe o resultado na interface do usuário.
 */
const calculatePrice = () => {
  // Obtém os itens do carrinho armazenados localmente
  const iii = getSavedCartItems();

  // Calcula a soma dos preços dos itens multiplicados por 100 para evitar problemas com casas decimais
  const sumValue = iii
    .map((item) => item.salePrice * 100)
    .reduce((acc, curr) => acc + curr, 0);

  // Exibe o preço total dividido por 100 para restaurar o formato decimal
  values.innerText = sumValue / 100;
};

/**
 * Manipula o evento de clique em um item do carrinho de compras, removendo o item do carrinho e atualizando o preço total.
 * @param {Event} event - O evento de clique que desencadeou a ação.
 */
const cartItemClickListener = (event) => {
  // Extrai o SKU do item com base no texto interno do elemento clicado
  const sku = event.target.innerText.split(' ')[1];

  // Obtém os itens do carrinho armazenados localmente
  // const getItemsLocalStorage = getSavedCartItems();

  // Filtra os itens do carrinho para remover o item correspondente ao SKU
  const filtered = getItemsLocalStorage.filter((item) => item.sku !== sku);

  // Remove o elemento HTML correspondente ao item clicado da interface do usuário
  event.target.remove();

  // Salva os itens atualizados no carrinho armazenados localmente
  saveCartItems(filtered);

  // Recalcula e atualiza o preço total dos itens no carrinho
  calculatePrice();
};

/**
 * Cria e retorna um elemento de item de carrinho de compras com informações de SKU, nome e preço.
 * @param {Object} data - Um objeto contendo informações do item, incluindo SKU (unidade de manutenção de estoque), nome e preço de venda.
 * @param {string} data.sku - O SKU do item.
 * @param {string} data.name - O nome do item.
 * @param {number} data.salePrice - O preço de venda do item.
 * @returns {HTMLLIElement} Um elemento HTML <li> que representa um item de carrinho de compras com informações formatadas.
 */
const createCartItemElement = ({ sku, name, salePrice }) => {
  // Cria um elemento HTML <li> com classe "cart__item"
  const li = Object.assign(document.createElement('li'), {
    className: 'cart__item',
  });

  // Define o texto interno do elemento com informações formatadas do item
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;

  // Adiciona um ouvinte de evento de clique para manipular a remoção do item do carrinho
  li.addEventListener('click', cartItemClickListener);

  // Retorna o elemento de item de carrinho de compras criado
  return li;
};

/**
 * Adiciona um item ao carrinho de compras e atualiza o carrinho e os valores relacionados.
 *
 * @param {Event} item - O evento de clique que acionou a função, contendo informações sobre o item a ser adicionado.
 */
const addItemCart = async (item) => {
  const itemId = getSkuFromProductItem(item.target.parentElement);

  const { id: sku, title: name, price: salePrice } = await fetchItem(itemId);

  const produto = createCartItemElement({ sku, name, salePrice });

  cartItems.appendChild(produto);

  getItemsLocalStorage.push({ sku, name, salePrice });

  saveCartItems(getItemsLocalStorage);

  calculatePrice();
};

/**
 * Cria um elemento de item de produto para exibição em uma página da web.
 *
 * @param {Object} data - Um objeto contendo informações sobre o produto.
 * @param {string} data.sku - O código SKU do produto.
 * @param {string} data.name - O nome do produto.
 * @param {string} data.image - O caminho da imagem do produto.
 * @returns {HTMLElement} - Um elemento HTML <section> representando o item de produto.
 */
const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section
    .appendChild(
      createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
    )
    .addEventListener('click', addItemCart);

  return section;
};

/**
 * Função assíncrona para buscar e exibir produtos em uma página da web.
 *
 * @param {string} product - O termo de pesquisa para os produtos desejados.
 */
const getProducts = async (product) => {
  sectionItems.appendChild(loading());

  const { results } = await fetchProducts(product);

  sectionItems.removeChild(sectionItems.lastChild);

  results.forEach((item) => {
    const productItem = createProductItemElement({
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    });
    items.appendChild(productItem);
  });
};

/**
 * Função para adicionar um event listener a todos os botões "Adicionar ao carrinho!"
 * que são criados dentro da função getProducts.
 */
const eventListener = () => {
  buttons.forEach((button) => {
    button.addEventListener('click', cartItemClickListener);
  });
};

/**
 * Carrega os itens do carrinho de compras previamente armazenados localmente na interface do usuário e calcula o preço total.
 */
const loadCartItems = () => {
  // Obtém os itens do carrinho armazenados localmente
  // const savedCartItems = getSavedCartItems();

  // Verifica se existem itens no carrinho armazenados localmente
  if (getItemsLocalStorage.length > 0) {
    // Itera sobre os itens e cria elementos de item de carrinho para cada um
    getItemsLocalStorage.forEach((item) =>
      cartItems.appendChild(
        createCartItemElement({
          sku: item.sku,
          name: item.name,
          salePrice: item.salePrice,
        }),
      ));

    // Calcula o preço total com base nos itens carregados
    calculatePrice();
  }
};

/**
 * Esvazia o carrinho de compras, removendo todos os itens da interface, redefinindo o preço total para zero e limpando o armazenamento local.
 */
const emptyCart = () => {
  // Obtém todos os elementos da lista de carrinho e os remove da interface
  getCartList().forEach((item) => item.remove());

  // Redefine o preço total para zero (0)
  values.innerText = 0;

  // Limpa o armazenamento local, removendo todos os itens do carrinho armazenados anteriormente
  localStorage.clear();
};

empty.addEventListener('click', emptyCart);

window.onload = () => {
  getProducts('computador');
  eventListener();
  loadCartItems();
};
