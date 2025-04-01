import teamLogo from "../../assets/img/team_2_logo_big.png";
import { getProductsFromApi } from "../api/getProductsFromApi";
import { renderProducts } from "../pages/productsSection";

const MENU_TEXT = "MENU";
const CLOSE_TEXT = "CLOSE";
const ACTIVE_CLASS = "active";

export function headerComponent() {
  const header = document.createElement("header");
  header.id = "header";
  header.innerHTML = `
        <button id="menuButton">${MENU_TEXT}</button>
        <img id="logo" loading="lazy">
        <button id="cart-btn" class="span-color">CART
            <span id="cart-count" class="cart-count">[0]</span>
        </button>
        <nav id="popup-menu">
            <a href="#" data-category="allproducts">ALL PRODUCTS</a>
            <a href="#" data-category="women's clothing">WOMEN'S CLOTHING</a>
            <a href="#" data-category="men's clothing">MEN'S CLOTHING</a>   
            <a href="#" data-category="jewelery">JEWELERY</a>
            <a href="#" data-category="electronics">ELECTRONICS</a>
        </nav>
    `;

  const menuButton = header.querySelector("#menuButton");
  const popupSelector = header.querySelector("#popup-menu");
  const bodySelector = document.body;
  const logoSelector = header.querySelector("#logo");

  logoSelector.src = teamLogo;

  function toggleMenu(isOpen) {
    if (isOpen) {
      popupSelector.classList.add(ACTIVE_CLASS);
      bodySelector.style.height = "100vh";
      bodySelector.style.overflow = "hidden";
      menuButton.textContent = CLOSE_TEXT;
    } else {
      popupSelector.classList.remove(ACTIVE_CLASS);
      bodySelector.style.height = "auto";
      bodySelector.style.overflow = "visible";
      menuButton.textContent = MENU_TEXT;
    }
  }

  menuButton.addEventListener("click", () => {
    const isOpen = !popupSelector.classList.contains(ACTIVE_CLASS);
    toggleMenu(isOpen);
  });

  popupSelector.addEventListener("click", async (event) => {
    if (event.target.tagName === "A") {
      event.preventDefault();

      const category = event.target.dataset.category;
      let products;

      try {
        if (category === "allproducts") {
          products = await getProductsFromApi("products");
        } else {
          const encodedCategory = encodeURIComponent(category);
          products = await getProductsFromApi(
            `products/category/${encodedCategory}`
          );
        }

        renderProducts(products);
        toggleMenu(false);

        const categoryEvent = new CustomEvent("categorySelected", {
          detail: category,
        });
        document.dispatchEvent(categoryEvent);
      } catch (error) {
        console.error("Error fetching or rendering products:", error);
        alert("Something went wrong while loading products.");
      }
    }
  });

  return header;
}

