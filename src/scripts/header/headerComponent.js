import teamLogo from "../../assets/img/team_2_logo_big.png";

export function headerComponent() {
    const mainMenuSelector = document.querySelector("#mainMenu");
    const popupSelector = document.querySelector("#popup");
    const bodySelector = document.querySelector("body");

    // Menu button
    mainMenuSelector.addEventListener("click", () => {
        if (popupSelector.style.display === "flex") {
            popupSelector.style.display = "none";
            bodySelector.style.height = "auto";
            bodySelector.style.overflow = "visible";
            mainMenuSelector.textContent = "Menu";
        } else {
            bodySelector.style.height = "100vh";
            bodySelector.style.overflow = "hidden";
            mainMenuSelector.textContent = "Close";
        }
    });

    // Logo
    const logoSelector = document.querySelector("#logo");
    logoSelector.src = teamLogo;
}
