document.addEventListener("DOMContentLoaded", function () {
  const products = [
    {
      image: "assets/images/image-waffle-desktop.jpg",
      alt: "Waffle",
      category: "Waffle",
      name: "Waffle with Berries",
      price: "$6.50",
    },
    {
      image: "assets/images/image-creme-brulee-desktop.jpg",
      alt: "Creme Brulee",
      category: "Creme Brulee",
      name: "Vanilla Bean Creme Brulee",
      price: "$7.00",
    },
    {
      image: "assets/images/image-macaron-desktop.jpg",
      alt: "Macaron",
      category: "Macaron",
      name: "Macaron Mix of Five",
      price: "$8.00",
    },
    {
      image: "assets/images/image-tiramisu-desktop.jpg",
      alt: "Tiramisu",
      category: "Tiramisu",
      name: "Classic Tiramisu",
      price: "$5.50",
    },
    {
      image: "assets/images/image-baklava-desktop.jpg",
      alt: "Baklava",
      category: "Baklava",
      name: "Pistachio Baklava",
      price: "$4.00",
    },
    {
      image: "assets/images/image-meringue-desktop.jpg",
      alt: "Pie",
      category: "Pie",
      name: "Lemon Meringue Pie",
      price: "$5.00",
    },
    {
      image: "assets/images/image-cake-desktop.jpg",
      alt: "Cake",
      category: "Cake",
      name: "Red Velvet Cake",
      price: "$4.50",
    },
    {
      image: "assets/images/image-brownie-desktop.jpg",
      alt: "Brownie",
      category: "Brownie",
      name: "Salted Caramel Brownie",
      price: "$5.50",
    },
    {
      image: "assets/images/image-panna-cotta-desktop.jpg",
      alt: "Panna Cotta",
      category: "Panna Cotta",
      name: "Vanilla Panna Cotta",
      price: "$6.50",
    },
  ];

  const productListContainer = document.querySelector(".product-list");
  const cartContainer = document.querySelector(".product-cart");
  const cartItemsList = document.createElement("ul");
  cartItemsList.classList.add("cart-items");

  const cart = {}; 

  
  products.forEach((product, index) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product-container");

    productContainer.innerHTML = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.alt}">
      </div>
      <button class="add-to-cart" data-index="${index}">
        <img src="assets/images/icon-add-to-cart.svg" alt="Add to Cart">Add to cart
      </button>
      <p>${product.category}</p>
      <h3>${product.name}</h3>
      <h6>${product.price}</h6>
    `;

    productListContainer.appendChild(productContainer);
  });

 
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(button.getAttribute("data-index"), 10);
      toggleCartUI(button, index);
    });
  });

  
  function toggleCartUI(button, index) {
    if (!button.classList.contains("cart-active")) {
      
      
      button.innerHTML = `
        <div class="cart-actions">
          <img style="padding-right:2rem;" src="assets/images/icon-increment-quantity.svg" alt="Add" class="btn-plus">
          <img src="assets/images/icon-decrement-quantity.svg" alt="Remove" class="btn-minus">
        </div>
      `;
      button.classList.add("cart-active");

      
      
      
      const plusBtn = button.querySelector(".btn-plus");
      const minusBtn = button.querySelector(".btn-minus");

      plusBtn.addEventListener("click", () => handleAddToCart(index));
      minusBtn.addEventListener("click", () => handleRemoveFromCart(index));
    }
  }

 
  function handleAddToCart(index) {
    const productName = products[index].name;
    if (cart[productName]) {
      cart[productName]++;
    } else {
      cart[productName] = 1;
    }
    renderCart();
  }

  
  function handleRemoveFromCart(index) {
    const productName = products[index].name;
    if (cart[productName]) {
      cart[productName]--;
      if (cart[productName] <= 0) {
        delete cart[productName];
      }
    }
    renderCart();
  }
  function handleDeleteItem(itemName) {
    delete cart[itemName]; 
    renderCart(); 
  }
  

  
  function renderCart() {
    cartItemsList.innerHTML = ""; 
    let totalPrice = 0; 
  
    if (Object.keys(cart).length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.textContent = "Your cart is empty.";
      cartContainer.innerHTML = "<h3>Your Cart</h3>";
      cartContainer.appendChild(emptyMessage);
    } else {
      for (const [itemName, itemCount] of Object.entries(cart)) {
        const product = products.find((p) => p.name === itemName);
  
        if (product) {
          const unitPrice = parseFloat(product.price.replace("$", ""));
          const totalItemPrice = unitPrice * itemCount;
          totalPrice += totalItemPrice; 
  
          
          const itemContainer = document.createElement("div");
          itemContainer.classList.add("cart-item");
          itemContainer.style.display = "flex";
          itemContainer.style.justifyContent = "space-between";
          itemContainer.style.alignItems = "center";
          itemContainer.style.marginBottom = "8px";
  
         
          const itemDetails = document.createElement("div");
          itemDetails.innerHTML = `
            <div class="item-name">${itemName}</div>
            <div class="item-details"><p>${itemCount}x</p> @$${unitPrice.toFixed(2)} $${totalItemPrice.toFixed(2)}</div>
          `;
          
          
          const deleteButton = document.createElement("span");
          deleteButton.innerHTML = '<img src="assets/images/icon-remove-item.svg" alt="Delete" class="delete-icon">';
          deleteButton.classList.add("delete-btn");
          deleteButton.style.cursor = "pointer";
          deleteButton.style.marginLeft = "10px";
  
          
          deleteButton.addEventListener("click", () => handleDeleteItem(itemName));
  
          
          itemContainer.appendChild(itemDetails);
          itemContainer.appendChild(deleteButton);
  
          
          cartItemsList.appendChild(itemContainer);
        }
      }
  
      
      const totalContainer = document.createElement("div");
      totalContainer.style.display = "flex";
      totalContainer.style.justifyContent = "space-between";
      totalContainer.style.fontWeight = "bold";
      totalContainer.style.width= "100%" ;
      totalContainer.style.boxSizing= "border-box";
      totalContainer.style.padding= "0 20px";
      totalContainer.style.alignItems= "center";
  
      totalContainer.innerHTML = `
      
        <p>Total order</p>
        <p class="total-price"> $${totalPrice.toFixed(2)}</p>
      
      `;
  
      
    const messageContainer = document.createElement("div");
    messageContainer.style.textAlign = "center";
    messageContainer.style.display = "flex";
    messageContainer.style.flexDirection = "column";
    messageContainer.style.padding = "15px";
    messageContainer.style.boxSizing = "border-box";
    messageContainer.style.width = "100%";
  
    const carbonNeutralMessage = document.createElement("p");
    carbonNeutralMessage.textContent = "This is a carbon-neutral delivery";
    carbonNeutralMessage.style.fontSize = "0.9em";
    carbonNeutralMessage.style.color = "black";
    carbonNeutralMessage.style.backgroundColor = "#f3f3f3";
    carbonNeutralMessage.style.padding = "15px 0px";
    carbonNeutralMessage.style.borderRadius = "7px";
    carbonNeutralMessage.style.display = "flex";
    carbonNeutralMessage.style.alignItems = "center";
    carbonNeutralMessage.style.justifyContent = "center";

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm Order";
    confirmButton.style.marginTop = "10px";
    confirmButton.style.padding = "13px 20px";
    confirmButton.style.backgroundColor = "hsl(14, 86%, 42%)";
    confirmButton.style.color = "#fff";
    confirmButton.style.border = "none";
    confirmButton.style.borderRadius = "20px";
    confirmButton.style.cursor = "pointer";
    confirmButton.style.width = "100%";
    confirmButton.style.fontSize = "17px";
    confirmButton.style.marginBottom = "1rem";
    
    const image = document.createElement("img");
    image.src = "assets/images/icon-carbon-neutral.svg"; 
    image.alt = "Carbon Neutral Icon"; 
    image.style.borderRadius = "50%";

    confirmButton.addEventListener("click", () => {
      
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "1000";
    
      
      
      const modalContent = document.createElement("div");
      modalContent.classList.add("modal-content");

      const cartList = document.createElement("ul");
      cartList.style = `
       list-style-type: none;
       padding: 0px;
       margin-bottom: 20px;
       text-align: left;
       background-color: #f0eded;
       padding: 1rem 1rem;
       border-radius: 7px;
      `;
      
      let totalOrderAmount = 0;
      for (const [itemName, itemData] of Object.entries(cart)) {
        const listItem = document.createElement("li");
        listItem.style = `
          margin-bottom: 10px;
        `;
        const product = products.find(p => p.name === itemName);
        const itemImage = document.createElement("img");
        itemImage.src = product.imageUrl; 
        itemImage.alt = itemName;
        const itemPrice = parseFloat(products.find(p => p.name === itemName).price.replace("$", ""));
        const totalPrice = (itemData * itemPrice).toFixed(2);
        totalOrderAmount += parseFloat(totalPrice);
    
        listItem.innerHTML = `
        <div style="display: flex;justify-content: space-between;">
          <div style="display: flex;">
          <img src="${product.image}" alt="${itemName}" style="width: 50px; height: 50px; border-radius: 5px; margin-right: 10px;">
          <div style="display: flex;flex-direction: column;">
            <span>${itemName}</span>
            <small style="color:grey"><p style="color: hsl(14, 86%, 42%);display: inline;padding-right: 1rem;font-size:15px;">${itemData}x</p> @$${itemPrice.toFixed(2)}</small>
            </div>
          </div>
            <div> 
            <span style="font-weight: bold;">$${totalPrice}</span>
            </div>
        </div>
        `;
        cartList.appendChild(listItem);
      }
    
      
      const totalOrder = document.createElement("div");
      totalOrder.style = `
        text-align: right;
        font-weight: bold;
        display: flex;
        border-radius: 7px;
        align-items: baseline;
        justify-content: space-between;
        transform: translateY(-33px);
        background-color: rgb(240, 237, 237);
        padding: 0rem 1rem;
      `;
      totalOrder.innerHTML = `<p>Total order</p>
        <p class="total-price"> $${totalOrderAmount.toFixed(2)}</p>`;
    
      
      const tickImage = document.createElement("img");
      tickImage.src = "assets/images/icon-order-confirmed.svg"; 
      tickImage.alt = "Order Confirmed";
      tickImage.style.width = "50px";
      tickImage.style.height = "50px";
      tickImage.style.marginBottom = "10px";
    
      
      const confirmedText = document.createElement("h3");
      confirmedText.textContent = "Order Confirmed";
      confirmedText.style = `
        color: black;
        margin: 0;
        font-size: 29px;
        display: flex;
      `;
    
      
      const thankYouText = document.createElement("p");
      thankYouText.textContent = "We hope you enjoy your food!";
      thankYouText.style = `
        padding: 0;
        font-size: 13px;
        display: flex;
        margin: 0;
        color: rgb(85, 85, 85);
      `;
    
      
      const closeButton = document.createElement("button");
      closeButton.textContent = "Start New Order";
      closeButton.style = `
       margin-top: 15px;
       padding: 15px 20px;
       border: none;
       border-radius: 20px;
       background-color: rgb(199, 58, 15);
       color: white;
       cursor: pointer;
       font-size: 17px;
       font-weight: 600;
      `;
      closeButton.addEventListener("click", () => {
        location.reload();
      });
    
      modalContent.appendChild(tickImage);
      modalContent.appendChild(confirmedText);
      modalContent.appendChild(thankYouText);
      modalContent.appendChild(cartList);
      modalContent.appendChild(totalOrder);
      modalContent.appendChild(closeButton);
    
      
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
    });
    
    carbonNeutralMessage.prepend(image);
    messageContainer.appendChild(carbonNeutralMessage);
    messageContainer.appendChild(confirmButton);

    
    cartContainer.innerHTML = "<h3>Your Cart</h3>";
    cartContainer.appendChild(cartItemsList);
    cartContainer.appendChild(totalContainer);
    cartContainer.appendChild(messageContainer);
  }
}
});

  
