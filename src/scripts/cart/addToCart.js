const cartUpdateEvent = new CustomEvent("cartUpdate");

export function addToCart() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.removeEventListener("click", handleAddToCart);
    button.addEventListener("click", handleAddToCart);
  });
}

function handleAddToCart(event) {
  const button = event.target.closest(".add-to-cart");
  const productID = button.value;
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const existingProduct = cartItems.find(item => item.id === productID);
  
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cartItems.push({ id: productID, quantity: 1 });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  document.dispatchEvent(cartUpdateEvent);
}

document.addEventListener("DOMContentLoaded", () => {
  addToCart();
});
