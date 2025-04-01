import { renderCheckoutPage } from "../pages/checkoutPage";

document.addEventListener("cartUpdate", renderCartItems);

export function cartDisplay() {
  const root = document.getElementById("cartContainer");

  if (!root) {
    console.error("Root element not found!");
    return;
  }

  const cartStructure = `
    <button id="cartCloseBtn" type="button">CLOSE</button>
    <h3>CART</h3>
    <div class="cart-products-container"></div>
    <div class="cart-checkout-info">
      <div class="cart-subtotal">
        <h3>SUBTOTAL</h3>
        <h3 id="subtotalPrice">0.00$</h3>
      </div>
      <button id="checkoutBtn">CHECKOUT</button>
    </div>
  `;

  root.innerHTML = cartStructure;

  const checkoutSelector = document.querySelector("#checkoutBtn");

  checkoutSelector.addEventListener("click", () => {
    console.log("Render");
    renderCheckoutPage();
  });

  const closeButton = document.getElementById("cartCloseBtn");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      root.classList.toggle("showCartContainer");
    });
  }
  renderCartItems();
  setupEventListeners();
}

function renderCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const cartProductsContainer = document.querySelector(".cart-products-container");

  if (!cartProductsContainer) {
    console.error("Cart products container not found!");
    return; 
  }

  cartProductsContainer.innerHTML = ""; 
  const amountInCart = document.getElementById("cart-count");

  if (cartItems.length === 0) {
    // Display "empty cart" message if there are no items
    const subtotalElement = document.getElementById("subtotalPrice");
    subtotalElement.textContent = "$0"; 

    if (amountInCart) {
      amountInCart.textContent = "0";
    }

    cartProductsContainer.innerHTML = `
      <div style="text-align: center; margin-top: 20px;">
          <h2>Your cart is empty</h2>
          <p>Browse our products and add items to your cart.</p>
      </div>
    `;
    return;
  }

  // Loop through items and render them
  cartItems.forEach((item) => {
    const product = getProductDetails(item.id);

    if (product) {
      // Render cart item if the product exists
      const cartProductHTML = createCartItemHTML(item, product);
      cartProductsContainer.insertAdjacentHTML("beforeend", cartProductHTML);
    }
  });

  updateSubtotal(cartItems);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  if (amountInCart) {
    amountInCart.textContent = totalQuantity;
  }
}

function createCartItemHTML(item, product) {
  return `
    <div class="cart-product" data-id="${item.id}">
      <div class="cart-product-info">
        <div class="cart-img-container">
          <img class="cart-img" src="${product.image}" alt="${product.title}" />
         </div>
        <div class="cart-product-name">
          <p>${product.title}</p>
          <button class="removeProductBtn" type="button">Remove</button>
          <div class="quantity-and-price">
          <div class="product-quantity">
            <button class="quantity-btn minus">-</button>
            <input type="number" class="quantity-input" value="${item.quantity}" min="1" />
            <button class="quantity-btn plus">+</button>
          </div>
          <div class="cartProductPrice">$${(product.price * item.quantity).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>`;
}

export function getProductDetails(productId) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  return products.find((product) => String(product.id) === String(productId));
}

export function updateSubtotal(cartItems) {

  const subtotal = cartItems.reduce((total, item) => {
    const product = getProductDetails(item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const subtotalElement = document.getElementById("subtotalPrice");
  if (subtotalElement) {
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  }

  return subtotal; 
}

function setupEventListeners() {
  document.addEventListener("click", (event) => {
    if (event.target.id === "cart-btn") {
      const cartContainer = document.getElementById("cartContainer");
      if (cartContainer) {
        cartContainer.classList.toggle("showCartContainer");
      }
    }

    if (event.target.classList.contains("quantity-btn")) {
      const input = event.target.parentElement.querySelector(".quantity-input");
      const productId = event.target.closest(".cart-product").dataset.id;
      if (event.target.classList.contains("plus")) {
        input.value = parseInt(input.value) + 1;
      } else if (event.target.classList.contains("minus")) {
        input.value = Math.max(1, parseInt(input.value) - 1);
      }
      updateCartItem(productId, parseInt(input.value));
    }

    if (event.target.classList.contains("removeProductBtn")) {
      const productId = event.target.closest(".cart-product").dataset.id;
      removeCartItem(productId);
    }
  });
}

function updateCartItem(productId, quantity) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const index = cartItems.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cartItems[index].quantity = quantity;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCartItems();
  }
}

function removeCartItem(productId) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems = cartItems.filter((item) => item.id !== productId);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCartItems();
}

// remove product when quantity becomes 0 in the cart
