const ol = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(ol.innerHTML);
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function colocaItemCarrinho(event) {
  const id = getSkuFromProductItem(event.target.parentNode);
  const item = await fetchItem(id);
  const produto = createCartItemElement(item);
  ol.appendChild(produto);
  saveCartItems(ol.innerHTML);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section
    .appendChild(
      createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
    )
    .addEventListener('click', colocaItemCarrinho);
  return section;
}

async function impletaProdutos(a) {
  const classItems = document.querySelector('.items');
  const el = await fetchProducts(a);
  el.results.forEach((result) => {
    const { id: sku, title: name, thumbnail: image } = result;
    classItems.appendChild(
      createProductItemElement({
        sku,
        name,
        image,
      }),
    );
  });
}

function addEscutador() {
  const aca = document.getElementsByClassName('cart__item');
  [...aca].forEach((ac) => ac.addEventListener('click', cartItemClickListener));
}

const btnEmpty = document.getElementsByClassName('empty-cart')[0];

function emptyCart() {
  const listaLi = document.querySelectorAll('li');
  listaLi.forEach((li) => li.remove());
  saveCartItems(ol.innerHTML);
}

btnEmpty.addEventListener('click', emptyCart);

window.onload = () => {
  impletaProdutos('computador');
  getSavedCartItems();
  addEscutador();
};
