const cartUpdateEvent = new CustomEvent("cartUpdate");

export function addToCart() {
  const addToCartButtonSelector = document.querySelectorAll(".add-to-cart");

  addToCartButtonSelector.forEach((button) => {
    button.addEventListener("click", () => {
      const productID = button.value;
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      const existingProductIndex = cartItems.findIndex(
        (item) => item.id === productID
      );

      if (existingProductIndex !== -1) {
        cartItems[existingProductIndex].quantity += 1;
      } else {
        const productToAdd = {
          id: productID,
          quantity: 1,
        };
        cartItems.push(productToAdd);
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      console.log("Updated cart:", cartItems);
      document.dispatchEvent(cartUpdateEvent);
    });
  });
}
// Function to calculate and update the cart count
export function updateCartCount(cartItems = JSON.parse(localStorage.getItem("cartItems")) || []) {
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById("cart-count");

  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

// Automatically update the cart count when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  updateCartCount(cartItems);
});

// Ensure cart count updates when cart changes
document.addEventListener("cartUpdate", () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  updateCartCount(cartItems);
});
