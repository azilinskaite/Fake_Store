import "./styles/footer.css";
import "./styles/header.css";
import "./styles/style.css";
import "./styles/products-style.css";
import "./styles/categories-style.css";
import "./styles/hero-style.css";
import "./styles/newsletter-style.css";
import "./styles/cart.css";
import "./styles/checkout-page-style.css";
import { headerComponent } from "./scripts/header/headerComponent.js";
import { cartDisplay } from "./scripts/cart/displayCart.js";
import { heroSection } from "./scripts/pages/hero.js";
import { categoryPage } from "./scripts/pages/categoryPage.js";
import { newsletterSection } from "./scripts/pages/newsletterSection.js";
import { footer } from "./scripts/pages/footer";

document.addEventListener("DOMContentLoaded", async () => {
  const bodyContainer = document.getElementById("body-container");
  bodyContainer.insertBefore(headerComponent(), bodyContainer.firstChild);
  cartDisplay();
  heroSection();
  await categoryPage();
  newsletterSection();
  footer();
});

