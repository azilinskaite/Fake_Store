import teamLogo from "../../assets/img/team_2_logo_big.png";
import { getProductsFromApi } from "../api/getProductsFromApi";
import { renderProducts } from "../pages/productsSection";

export function headerComponent() {
  const header = document.createElement("header");
  header.id = "header";
  header.innerHTML = `
        <button id="menuButton">MENU</button>
        <img id="logo">
        <div class="cartButton">
            <button id="cart-btn" class="span-color">CART
                <span id="cart-count" class="cart-count">[0]</span>
            </button>
        </div>
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

  function closeMenu() {
    popupSelector.classList.remove("active");
    bodySelector.style.height = "auto";
    bodySelector.style.overflow = "visible";
    menuButton.textContent = "MENU";
  }

  function openMenu() {
    popupSelector.classList.add("active");
    bodySelector.style.height = "100vh";
    bodySelector.style.overflow = "hidden";
    menuButton.textContent = "CLOSE";
  }

  menuButton.addEventListener("click", () => {
    if (popupSelector.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  const logoSelector = header.querySelector("#logo");
  logoSelector.src = teamLogo;

  const navLinks = header.querySelectorAll("#popup-menu a");
navLinks.forEach((link) => {
  link.addEventListener("click", async (event) => {
    event.preventDefault();

    const category = link.dataset.category;
    let products;
    if (category === "allproducts") {
      products = await getProductsFromApi("products");
    } else {
      const encodedCategory = encodeURIComponent(category);
      products = await getProductsFromApi(`products/category/${encodedCategory}`);
    }
    renderProducts(products);
    closeMenu();

    const categoryButton = document.querySelector(`#${CSS.escape(category)}`);
    if (categoryButton) {
      categoryButton.click();
    }

    const categoryEvent = new CustomEvent("categorySelected", {
      detail: category,
    });
    document.dispatchEvent(categoryEvent);
  });
});


  return header;
}
