import { addToCart } from "../cart/addToCart";

export function renderProducts(products = []) {
  if (!Array.isArray(products)) {
      console.error("Invalid products data:", products);
      return;
  }

  const productsSelector = document.querySelector("#products");
  if (!productsSelector) {
    console.error("#products container not found!");
    return;
  }

  productsSelector.innerHTML = "";

  products.forEach(product => {
      const productCard = createProductCard(product);
      productsSelector.appendChild(productCard);
      addRatingStars(productCard, product.rating.rate);
  });

  productsSelector.addEventListener('click', (event) => {
      if (event.target.classList.contains('add-to-cart')) {
          addToCart(event.target.value);
      }
  });
}

function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.className = "product";

  const productImage = createProductImage(product.image, product.title);
  const middleSection = createMiddleSection(product.title, product.price);
  const footerSection = createFooterSection(product.id, product.rating.rate);

  productCard.append(productImage, middleSection, footerSection);
  return productCard;
}

function createProductImage(src, alt) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.classList.add('product-image');
  return img;
}

function createMiddleSection(title, price) {
  const middle = document.createElement('div');
  middle.classList.add('product-middle');

  const titleElem = document.createElement('h5');
  titleElem.classList.add('product-title');
  titleElem.textContent = title;

  const priceElem = document.createElement('p');
  priceElem.classList.add('product-price');
  priceElem.textContent = `$${price.toFixed(2)}`;

  middle.append(titleElem, priceElem);
  return middle;
}

function createFooterSection(productId, rating) {
  const footer = document.createElement('div');
  footer.classList.add('product-footer');

  const ratingDiv = document.createElement('div');
  ratingDiv.classList.add('rating');

  const iconsDiv = document.createElement('div');
  iconsDiv.classList.add('icons');

  const cartButton = document.createElement('button');
  cartButton.classList.add('add-to-cart');
  cartButton.value = productId;
  cartButton.title = 'Add to Cart';
  cartButton.textContent = 'ADD TO CART';

  iconsDiv.appendChild(cartButton);
  footer.append(ratingDiv, iconsDiv);
  return footer;
}

export function addRatingStars(container, rating) {
  const ratingContainer = container.querySelector(".rating");
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  
  ratingContainer.innerHTML = [
    ...Array(fullStars).fill('<i class="fas fa-star"></i>'),
    halfStar ? '<i class="fas fa-star-half-alt"></i>' : '',
    ...Array(5 - fullStars - (halfStar ? 1 : 0)).fill('<i class="far fa-star"></i>')
  ].join('');
}
