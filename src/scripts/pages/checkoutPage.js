import paypalIcon from "../../assets/img/paypal_icon.svg";
import paypalLogo from "../../assets/img/paypal-logo.png";
import { getProductDetails } from "../../scripts/cart/displayCart.js"; // Import existing helper function

export function renderCheckoutCart() {

  const finalProductContainer = document.querySelector(
    ".final-product-container"
  );
  if (!finalProductContainer) {
    console.error("Product container not found!");
    return;
  }

  finalProductContainer.innerHTML = "";

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartItems.forEach((item) => {
    const product = getProductDetails(item.id);
    if (!product) return;

    const cartItemHTML = `
      <div class="checkout-product" data-id="${item.id}">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.title
      }" class="checkout-product-image"/>
        </div>
        <div class="product-info">
          <p>${product.title}</p>
         
        </div>
         <p>Quantity: ${item.quantity}</p>
         <div class="total-price">
           <p>Total Price: $${(product.price * item.quantity).toFixed(2)}</p>
         </div>
      </div>
    `;

    finalProductContainer.insertAdjacentHTML("beforeend", cartItemHTML);
  });

  const total = cartItems.reduce((sum, item) => {
    const product = getProductDetails(item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const totalHTML = `
    <div class="checkout-total">
      <h3>Total: $${total.toFixed(2)}</h3>
    </div>
  `;
  finalProductContainer.insertAdjacentHTML("beforeend", totalHTML);
}

export async function renderCheckoutPage() {
  const root = document.getElementById("checkout-page");
  if (root) {
    root.innerHTML = `
      <div class="checkout-container">

      <button id="closeButton">x</button>

        <div class="payment-container">
          <div class="details-section">
            <p class="payment-title">Payment</*>
            <details class="details">
              <summary>Credit Card</summary>
              <div class="details-input">
                <div class="form-group">
                  <label for="card-number"></label>
                  <input 
                    type="text" 
                    id="card-number" 
                    name="card-number" 
                    placeholder="1234 5678 9012 3456" 
                    inputmode="numeric" 
                    pattern="\\d{4} \\d{4} \\d{4} \\d{4}" 
                    maxlength="19" 
                    required 
                  />
                </div>
                <div class="form-group">
                  <label for="expiration-date"></label>
                  <input 
                    type="text" 
                    id="expiration-date" 
                    name="expiration-date" 
                    placeholder="MM/YY" 
                    pattern="(0[1-9]|1[0-2])/\\d{2}" 
                    maxlength="4" 
                    required 
                  />
                </div>
                <div class="form-group">
                  <label for="security-code"></label>
                  <input 
                    type="text" 
                    id="security-code" 
                    name="security-code" 
                    placeholder="123" 
                    pattern="\\d{3,4}" 
                    maxlength="3" 
                    required 
                  />
                </div>
                <div class="form-group">
                  <label for="name-on-card"></label>
                  <input 
                    type="text" 
                    id="name-on-card" 
                    name="name-on-card" 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
              </div>
            </details>
            <details class="details details-paypal">
              <summary class="paypal-summary">
                Paypal <img src= "${paypalLogo}" class="paypal-logo" alt="" />
              </summary>
              <div class="paypal-icon">
                <img src="${paypalIcon}" alt="" />
              </div>
              <p>
                After clicking "Pay with PayPal", you will be redirected to PayPal
                to complete your purchase securely.
              </p>
            </details>
          </div>
          <button class="pay-button">Pay now</button>
        </div>
        <div class="final-product-container"></div>
      </div>
    `;

    const checkoutPageSlector = document.querySelector("#checkout-page");
    checkoutPageSlector.style.display = "block";
    const closeButtonSelector = document.querySelector("#closeButton");
    closeButtonSelector.addEventListener("click", () => {
      checkoutPageSlector.style.display = "none";
    });

    renderCheckoutCart();
  } else {
    console.error("Root element not found!");
  }
}


