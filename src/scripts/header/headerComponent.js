import teamLogo from "../../assets/img/team_2_logo_big.png";

export function headerComponent() {
    const header = document.createElement('header');
    header.id = 'header';
    header.innerHTML = `
            <button id="menuButton">MENU</button>
            <img id="logo">
            <div class="cartButton">
                <button id="cart-btn" class="span-color">CART
                    <span id="cart-count" class="cart-count">[0]</span>
                </button>
            </div>
        <nav id="popup-menu">
            <a href="#">ALL PRODUCTS</a>
            <a href="#">WOMEN'S CLOTHING</a>
            <a href="#">MEN'S CLOTHING</a>
            <a href="#">JEWELERY</a>
            <a href="#">ELECTRONICS</a>
        </nav>
    `;

    const menuButton = header.querySelector("#menuButton");
    const popupSelector = header.querySelector("#popup-menu");
    const bodySelector = document.body;

    menuButton.addEventListener("click", () => {
        if (popupSelector.classList.contains('active')) {
            popupSelector.classList.remove('active');
            bodySelector.style.height = "auto";
            bodySelector.style.overflow = "visible";
            menuButton.textContent = "MENU";
        } else {
            popupSelector.classList.add('active');
            bodySelector.style.height = "100vh";
            bodySelector.style.overflow = "hidden";
            menuButton.textContent = "CLOSE";
        }
    });

    const logoSelector = header.querySelector("#logo");
    logoSelector.src = teamLogo;

    return header;
}

