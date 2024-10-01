"use strict";

// Simulated product details (could be loaded from a database)
const productDetails = [
  {
    id: 1,
    title: "Product 1",
    image: "./assets/woocommerce-placeholder-300x300.png",
    price: 20,
    quantity: 1,
  },
  {
    id: 2,
    title: "Product 2",
    image: "./assets/woocommerce-placeholder-300x300.png",
    price: 30,
    quantity: 1,
  },
  {
    id: 3,
    title: "Product 2",
    image: "./assets/woocommerce-placeholder-300x300.png",
    price: 50,
    quantity: 1,
  },
];

let totalItemsCount = productDetails.reduce((initiatlCount, product) => initiatlCount + product.quantity, 0);

let totalPrice = productDetails.reduce((initialPrice, product) => initialPrice + product.price, 0);

// cart container
const cartContainer = document.createElement("div");
// cart details container
const cartDetailsContainer = document.createElement("div");
// cart overlay
const cartOverlay = document.createElement("div");

cartContainer.id = "cart-container";
cartDetailsContainer.id = "cart-details";
cartOverlay.id = "cart-overlay";

// Append the cart container, cart details container, and overlay to the body
document.body.appendChild(cartContainer);
document.body.appendChild(cartOverlay);
document.body.appendChild(cartDetailsContainer);

// Set the inner HTML for the cart
cartContainer.innerHTML = `
    <div class="cart-top">
        <div class="cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
        </div>
        <div class="cart-items">
            <h4>${totalItemsCount} items</h4>
        </div>
    </div>
    <div class="cart-price">
        <p>$ ${totalPrice.toFixed(2)}</p>
    </div>
`;

// Function to generate product details HTML
function generateProductDetailsHTML(products) {
  return products
    .map(
      (product) => `
        <div class="product" data-id="${product.id}">
            <div class="product-quantity">
                <button class="increase-btn" data-id="${product.id}">&uarr;</button>
                <span>${product.quantity}</span>
                <button class="decrease-btn" data-id="${product.id}">&darr;</button>
            </div>
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h5>${product.title}</h5>
                <p>$${(product.price * product.quantity).toFixed(2)}</p>
            </div>
            <button class="remove-btn" data-id="${product.id}">×</button>
        </div>
      `
    )
    .join("");
}

// Set the inner HTML for the cart details container with product details
cartDetailsContainer.innerHTML = `
    <div class="cart-details-content">
        <div class="cart-header">
            <div class="cart-header-left">
                <div class="cart-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart">
                        <circle cx="8" cy="21" r="1"/>
                        <circle cx="19" cy="21" r="1"/>
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                    </svg>
                </div>
                <p>${totalItemsCount} items</p>
            </div>
            <button id="close-cart">Close</button>
        </div>
        <div class="cart-body">
            ${generateProductDetailsHTML(productDetails)}
        </div>
        <div class="cart-footer">
            <button class="checkout-btn">Checkout $ ${totalPrice.toFixed(2)}</button>
        </div>
    </div>
`;

// Function to update the cart UI after quantity changes
function updateCartUI() {
  document.querySelector(".cart-body").innerHTML = generateProductDetailsHTML(productDetails);
  document.querySelector(".cart-header-left p").innerText = `${productDetails.length} items`;

  // Update total items quantity
  updateTotalItemsQuantity();

  // Update total price in both the price section and checkout button
  updateTotalPrice();

  // Reattach event listeners after UI updates
  attachEventListeners();
}

// Function to update total price
function updateTotalPrice() {
  totalPrice = productDetails.reduce((total, product) => total + product.price * product.quantity, 0);

  // Update total price in the cart price section
  document.querySelector(".cart-price p").innerText = `$${totalPrice.toFixed(2)}`;

  // Update the total price in the checkout button
  const checkoutButton = document.querySelector(".checkout-btn");
  if (checkoutButton) {
    checkoutButton.innerText = `Checkout $${totalPrice.toFixed(2)}`;
  }
}

// Function to update total quantity
function updateTotalItemsQuantity() {
  totalItemsCount = productDetails.reduce((initialQuantity, product) => initialQuantity + product.quantity, 0);

  // update the cart container total items count
  document.querySelector(".cart-items h4").innerText = `${totalItemsCount} items`;

  // Update the cart details total items count
  document.querySelector(".cart-header-left p").innerText = `${totalItemsCount} items`;
}

// Handle increase/decrease of product quantity
function attachEventListeners() {
  document.querySelectorAll(".increase-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      const product = productDetails.find((p) => p.id == productId);
      product.quantity += 1;
      updateCartUI();
    });
  });

  document.querySelectorAll(".decrease-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      const product = productDetails.find((p) => p.id == productId);
      if (product.quantity > 1) {
        product.quantity -= 1;
      }
      updateCartUI();
    });
  });

  // Handle remove button
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      const productIndex = productDetails.findIndex((p) => p.id == productId);

      if (productIndex !== -1) {
        // Remove the product from the array
        productDetails.splice(productIndex, 1);
      }

      // Update the cart UI after removing the product
      updateCartUI();
    });
  });
}

// Initial call to attach event listeners
attachEventListeners();

// Handle opening the cart details container
cartContainer.addEventListener("click", () => {
  cartDetailsContainer.classList.add("active");
  cartOverlay.classList.add("active");
});

// Handle closing the cart details container via the close button
document.getElementById("close-cart").addEventListener("click", () => {
  cartDetailsContainer.classList.remove("active");
  cartOverlay.classList.remove("active");
});

// Handle closing the cart details container via clicking on the overlay
cartOverlay.addEventListener("click", () => {
  cartDetailsContainer.classList.remove("active");
  cartOverlay.classList.remove("active");
});
