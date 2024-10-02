"use strict";

// Simulated product details (could be loaded from a database)
const productDetails = [
  {
    id: 1,
    title: "Product 1 is a very very long title",
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

let totalItemsCount = productDetails.reduce((initialCount, product) => initialCount + product.quantity, 0);

let totalPrice = productDetails.reduce((initialPrice, product) => initialPrice + product.price, 0);

// cart button
const cartButton = document.createElement("div");
// cart details button
const cartDetailsContainer = document.createElement("div");
// cart overlay
const cartOverlay = document.createElement("div");

cartButton.id = "cart-button";
cartDetailsContainer.id = "cart-details";
cartOverlay.id = "cart-overlay";

// Append the cart button, cart details button, and overlay to the body
document.body.appendChild(cartButton);
document.body.appendChild(cartOverlay);
document.body.appendChild(cartDetailsContainer);

// Set the inner HTML for the cart
cartButton.innerHTML = `
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
                <button class="increase-btn" data-id="${product.id}">
                    <img src="/assets/arrow-up.png" data-id="${product.id}"/>
                </button>
                <span>${product.quantity}</span>
                <button class="decrease-btn" data-id="${product.id}">
                   <img src="/assets/arrow-down.png" data-id="${product.id}"/>
                </button>
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

// Set cart details in DOM if the cart is empty
function setInitialEmptyCartDOM() {
  return `
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
                <p>0 items</p>
            </div>
            <button id="close-cart">Close</button>
        </div>
        <div class="empty-cart-body">
            <p>Your cart is currently empty.</p>
            <div class="empty-cart-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart">
                    <circle cx="8" cy="21" r="1"/>
                    <circle cx="19" cy="21" r="1"/>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
            </div>
        </div>
    </div>

    `;
}

// Set cart details in DOM if cart is not empty
function setInitialCartDetailsDOM(totalItemsCount, productDetails, totalPrice) {
  return `
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
}

// Set the inner HTML for the cart details button
function renderCartDetails() {
  if (totalItemsCount > 0) {
    cartDetailsContainer.innerHTML = setInitialCartDetailsDOM(totalItemsCount, productDetails, totalPrice);
  } else {
    cartDetailsContainer.innerHTML = setInitialEmptyCartDOM();
  }
}

renderCartDetails();

// Function to update the cart UI after quantity changes
function updateCartUI() {
  document.querySelector(".cart-body").innerHTML = generateProductDetailsHTML(productDetails);
  document.querySelector(".cart-header-left p").innerText = `${productDetails.length} items`;

  // Update total items quantity
  updateTotalItemsQuantity();

  // Update total price in both the price section and checkout button
  updateTotalPrice();

  renderCartDetails();

  // Reattach event listeners after UI updates
  attachEventListeners();
  attachCloseCartListeners(); // Reattach the close button and overlay listeners
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

  // update the cart button total items count
  document.querySelector(".cart-items h4").innerText = `${totalItemsCount} items`;
}

// Attach event listeners to increase, decrease, and remove buttons
function attachEventListeners() {
  document.querySelectorAll(".increase-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(event.currentTarget.getAttribute("data-id"));
      const product = productDetails.find((p) => p.id === productId);
      if (product) {
        product.quantity++;
        updateCartUI();
      }
    });
  });

  document.querySelectorAll(".decrease-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(event.currentTarget.getAttribute("data-id"));
      const product = productDetails.find((p) => p.id === productId);
      if (product && product.quantity > 1) {
        product.quantity--;
        updateCartUI();
      }
    });
  });

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(event.currentTarget.getAttribute("data-id"));
      const productIndex = productDetails.findIndex((p) => p.id === productId);
      if (productIndex > -1) {
        productDetails.splice(productIndex, 1);
        updateCartUI();
      }
    });
  });
}

// Attach event listeners to close the cart
function attachCloseCartListeners() {
  document.getElementById("close-cart").addEventListener("click", () => {
    cartDetailsContainer.classList.remove("active");
    cartOverlay.classList.remove("active");
  });

  cartOverlay.addEventListener("click", () => {
    cartDetailsContainer.classList.remove("active");
    cartOverlay.classList.remove("active");
  });
}

// Initial call to attach event listeners
attachEventListeners();
attachCloseCartListeners(); // Ensure the close button and overlay listeners are attached

// Toggle cart visibility when cart icon is clicked
cartButton.addEventListener("click", () => {
  cartDetailsContainer.classList.add("active");
  cartOverlay.classList.add("active");
});
