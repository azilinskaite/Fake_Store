import { getProductsFromApi } from "../api/getProductsFromApi";

export async function productPage() {

    getProductsFromApi("products");

}
