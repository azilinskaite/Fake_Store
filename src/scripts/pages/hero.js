import heroImage from "../../assets/img/visual_1.jpg";

export function heroSection() {
  const root = document.getElementById("hero");

  if (root) {
    root.innerHTML = `
      <div class="hero-container">
        <div class="image-container">
          <img src="${heroImage}" alt="Hero Visual" />
        </div>
      </div>
    `;
  } else {
    console.error("Root element not found!");
  }
}

