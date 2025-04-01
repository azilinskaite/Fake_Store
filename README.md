## Ecommerce store

The project was built using JavaScript, featuring product data retrieval from an API. 
Shopping cart functionality allows users to add products and update quantities. 
Implemented product filters help users to sort items by category.
School project. We worked in a small team, practicing Scrum methodology. 

## How it works

### Product data
- **Fetching Products**: Product data is retrieved from the API and stored in `localStorage` for caching purposes. We encounterd a slow API and we found a sollution for it. With this method we can have faster load times and less API calls.

### Shopping Cart Functionality
- **Adding to Cart**: When a user adds a product to the cart:
  - A new object is created with the product's `id` and the `quantity`.
  - If the product ID already exists in the cart, the quantity is updated.
  - If the product ID does not exist, the object is added to the cart array.
- **Cart Storage**: The cart data is stored in `localStorage`, so that when you come back to the site it will be there.
