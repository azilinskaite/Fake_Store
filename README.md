# Ecommerce store
School project to start working with Scrum and Jest.

We worked with 6 people on a small ecommerce store. When you work on a project this size you need to work with a management framework, we used Scrum. We used sprints and tools like Asana or Notion to keep track of tasks and make sure everyone was on the same page.

## How it works

### Product data
- **Fetching Products**: Product data is retrieved from the API and stored in `localStorage` for caching purposes. We encounterd a slow API and we found a sollution for it. With this method we can have faster load times and less API calls.

### Shopping Cart Functionality
- **Adding to Cart**: When a user adds a product to the cart:
  - A new object is created with the product's `id` and the `quantity`.
  - If the product ID already exists in the cart, the quantity is updated.
  - If the product ID does not exist, the object is added to the cart array.
- **Cart Storage**: The cart data is stored in `localStorage`, so that when you come back to the site it will be there.

## Improvements
- We could build a Cron loading the products every day and displaying them using JSON. This creates way faster loading speed.
- Adding more Jest checks like:
    - Is the hamburger menu working
    - Are there products in the categories
    - Does the cart open
    - How many payment options are there
- Use of coding guidelines
- Better use of the DRY principle
- Removing the innerHTML methods for better security
- SEO and pagespeed improvements
