import { getData } from "./fetchFakeProducts";
import { renderProducts } from "../pages/productsSection";

export async function getProductsFromApi(endpoint) {
  try {
    const products = await getData(endpoint);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    // Add error handling UI here
  }
}