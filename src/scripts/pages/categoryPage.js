import { productFilter } from "../filters/productFilter";
import { getProductsFromApi } from "../api/getProductsFromApi";
import { renderProducts } from "./productsSection";

export async function categoryPage() {
    const categories = [
        { id: 'allproducts', text: 'ALL PRODUCTS' },
        { id: "women's clothing", text: "WOMEN'S CLOTHING" },
        { id: "men's clothing", text: "MEN'S CLOTHING" },
        { id: 'jewelery', text: 'JEWELERY' },
        { id: 'electronics', text: 'ELECTRONICS' }
    ];

    const categoriesContainer = document.getElementById('categories');
    
    categoriesContainer.innerHTML = '';
    
    categories.forEach(category => {
        const button = document.createElement('button');
        button.id = category.id;
        button.textContent = category.text;
        categoriesContainer.appendChild(button);

        button.addEventListener('click', () => {
            updateActiveCategory(category.id);
        });
    });

    function updateActiveCategory(categoryId) {
        categoriesContainer.querySelectorAll('button').forEach(btn => {
          btn.classList.remove('active');
        });
        const activeButton = categoriesContainer.querySelector(`#${CSS.escape(categoryId)}`);
        if (activeButton) {
          activeButton.classList.add('active');
        }

        const apiEndpoint = categoryId === 'allproducts' 
            ? 'products' 
            : `products/category/${encodeURIComponent(categoryId)}`;
        
        getProductsFromApi(apiEndpoint)
            .then(products => renderProducts(products));
      }

    document.addEventListener('categorySelected', (event) => {
        updateActiveCategory(event.detail);
    });

    updateActiveCategory('allproducts');

    await productFilter();
    await getProductsFromApi("products");
}


