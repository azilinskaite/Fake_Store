import imageTwo from "../../assets/img/visual_2.jpg";

export function newsletter() {
    const newsletter = document.getElementById("newsletter");
    newsletter.innerHTML = `
            <!-- Newsletter Section -->
        <div class="newsletter-container">
          <div class="newsletter-image">
            <img
              src="${imageTwo}"
              alt="Newsletter Background"
              class="background-image"
            />
          </div>
          <div class="input-content">
            <div><h1>Subscribe for Exclusive News</h1></div>
            <div class="input-wrapper">
              <input type="text" placeholder="Enter your email" />
              <button>SIGN UP</button>
            </div>
          </div>
        </div>
      </div>
    `
}
