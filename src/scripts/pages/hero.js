import image from "../../assets/img/visual_1.jpg";

export function heroSection() {
  const root = document.getElementById("hero");

  if (root) {
    root.innerHTML = `
      <div class="hero-container">
        <div class="image-container">
          <img src="${image}" alt="Hero Visual" />
        </div>
      </div>
    `;
  } else {
    console.error("Root element not found!");
  }
}

