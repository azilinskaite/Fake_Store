import { productFilter } from "../filters/productFilter";
import { getProductsFromApi } from "../api/getProductsFromApi";

export async function categoryPage() {
    const categories = [
        { id: 'allproducts', text: 'ALL PRODUCTS' },
        { id: "women's%20clothing", text: "WOMEN'S CLOTHING" },
        { id: "men's%20clothing", text: "MEN'S CLOTHING" },
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
            categoriesContainer.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });
    });

    categoriesContainer.querySelector('#allproducts').classList.add('active');

    await productFilter();
    await getProductsFromApi("products");
}

