import { addToCart } from "../cart/addToCart";
import { getData } from "./fetchFakeProducts";

export async function getProductsFromApi(endpoint) {
    const products = await getData(endpoint); // Fetch all products
    localStorage.setItem('products', JSON.stringify(products));
    // console.log('Saved products to localStorage:', products);
    const productsSelector = document.querySelector("#products");
    productsSelector.innerHTML = "";

    // Loop through each product
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product";

        // Add product details
        // Create image element
        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.title;
        productImage.classList.add('product-image');
        productCard.appendChild(productImage);

                
        // Create middle section
        const productMiddle = document.createElement('div');
        productMiddle.classList.add('product-middle');

        const productTitle = document.createElement('h5');
        productTitle.classList.add('product-title');
        productTitle.textContent = product.title;
        productMiddle.appendChild(productTitle);

        const productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.textContent = `$${product.price.toFixed(2)}`;
        productMiddle.appendChild(productPrice);

        productCard.appendChild(productMiddle);

        // Create footer section
        const productFooter = document.createElement('div');
        productFooter.classList.add('product-footer');

        const ratingDiv = document.createElement('div');
        ratingDiv.classList.add('rating');
        ratingDiv.dataset.rating = product.rating.rate;
        productFooter.appendChild(ratingDiv);

        const iconsDiv = document.createElement('div');
        iconsDiv.classList.add('icons');

        const cartButton = document.createElement('button');
        cartButton.classList.add('add-to-cart');
        cartButton.id = 'addToCart';
        cartButton.value = product.id;
        cartButton.title = 'Add to Cart';
        cartButton.textContent = 'ADD TO CART';

        iconsDiv.appendChild(cartButton);
        productFooter.appendChild(iconsDiv);
        productCard.appendChild(productFooter);

        // Append the card to the container
        productsSelector.appendChild(productCard);
        
        // Generate stars for the rating
        const ratingContainer = productCard.querySelector(".rating");
        generateStars(ratingContainer, product.rating.rate);
    });
    addToCart();
}

// Function to create star elements based on the rating
function generateStars(container, rating) {
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating % 1 >= 0.5; // Half star if rating is not a whole number
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining stars

    // Append full stars
    for (let i = 0; i < fullStars; i++) {
        container.innerHTML += `<i class="fas fa-star"></i>`;
    }

    // Append half star
    if (halfStar) {
        container.innerHTML += `<i class="fas fa-star-half-alt"></i>`;
    }

    // Append empty stars
    for (let i = 0; i < emptyStars; i++) {
        container.innerHTML += `<i class="far fa-star"></i>`;
    }
}