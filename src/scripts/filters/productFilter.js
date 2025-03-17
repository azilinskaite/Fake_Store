import { getProductsFromApi } from "../api/getProductsFromApi";

export function productFilter() {
    // Gets the buttons
    const categorieSelector = document.querySelectorAll("#categories button");

    // Foreach button gets the id
    categorieSelector.forEach(button => {
        button.addEventListener("click", () => {

            const productCategory = button.id;

            // If all products are clicked show them all
            if (productCategory === "allproducts") {
                const productUrl = 'products';

                getProductsFromApi(productUrl);
            } else {
                const productUrl = `products/category/${productCategory}`;

                getProductsFromApi(productUrl);
            }

        });
    });

}