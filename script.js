// Fetch products from API
fetch("https://dummyjson.com/products?limit=194")
  .then(res => res.json())
  .then(data => {
    const productList = document.getElementById("product-list");
    data.products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
      `;
      // Redirect to product page with ID
      card.addEventListener("click", () => {
        window.location.href = `product.html?id=${product.id}`;
      });
      productList.appendChild(card);
    });
  })
  .catch(err => console.error("Error fetching products:", err));

  // Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function loadCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  const billSummaryDiv = document.getElementById("bill-summary");
  cartItemsDiv.innerHTML = "";
  let total = 0;

  for (let id of cart) {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const product = await res.json();
    total += product.price;

    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <div>
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
        <button onclick="removeFromCart(${product.id})">Remove</button>
      </div>
    `;
    cartItemsDiv.appendChild(item);
  }

  billSummaryDiv.innerHTML = `
    <h2>Bill Summary</h2>
    <p>Total Items: ${cart.length}</p>
    <p>Total Price: $${total}</p>
  `;
}

function removeFromCart(id) {
  cart = cart.filter(item => item !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

loadCart();





