import logoLarge from "../../assets/img/team_2_logo_big.png";

export function footer() {
  const footerElement = document.getElementById("footer");

  footerElement.innerHTML = `
  <footer>
      <img src="${logoLarge}" ></img>
      <div class="small-info">
        <div>TEAM2SHOP@HYPERISLAND.SE</div>
        <div>&copy;&nbsp;2024&nbsp;TEAM2SHOP</div>
      </div>
    </footer>
    `;
}
