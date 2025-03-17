import imageFooter from "../../assets/img/team_2_logo_big.png";
export function footer() {
  const footer = document.getElementById("footer");

  footer.innerHTML = `
  <footer>
      <img src="${imageFooter}" ></img>
      <div class="small-info">
        <div>TEAM2SHOP@HYPERISLAND.SE</div>
        <div>&copy;&nbsp;2024&nbsp;TEAM2SHOP</div>
      </div>
    </footer>
    `;
}
