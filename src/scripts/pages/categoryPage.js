import { productFilter } from "../filters/productFilter";
import { getProductsFromApi } from "../api/getProductsFromApi";

export async function categoryPage() {
    productFilter();
    getProductsFromApi("products");

}