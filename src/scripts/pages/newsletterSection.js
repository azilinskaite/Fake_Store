import newsletterImage from "../../assets/img/visual_2.jpg";

export function newsletterSection() {
    const newsletter = document.getElementById("newsletter");
    newsletter.innerHTML = `
        <div class="newsletter-container">
          <div class="newsletter-image">
            <img
              src="${newsletterImage}"
              alt="Newsletter Background"
              class="background-image"
            />
          </div>
          <div class="input-content">
            <h3>Subscribe for Exclusive News</h3>
            <div class="input-wrapper">
              <input type="text" placeholder="Enter your email" />
              <button>SIGN UP</button>
            </div>
          </div>
        </div>
      </div>
    `
}
