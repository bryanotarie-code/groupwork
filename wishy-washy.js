//Module Name/Module Code: CIT2011 - Web Development
//Free Hosting Link: https://amoya-c.github.io/IA2-web-programming/

window.onload = function(){
    const signUpButton = document.getElementById("sign-up-button");
    const signInButton = document.getElementById("sign-in-button");

    //Sign Up
    if (signUpButton) {
        signUpButton.onclick = function(event){
            event.preventDefault();
            let Name = document.getElementById("name").value;
            let DOB = document.getElementById("dob").value;
            let Address = document.getElementById("address").value;
            let Email = document.getElementById("email").value;
            let Username = document.getElementById("username").value;
            let Password = document.getElementById("password").value;

            //Validation of inputs
            if (!Name || !DOB || !Address || !Email || !Username || !Password){
                alert("Please fill out all fields to continue.");
                return;
            }

            if (Password.length < 9){
                alert("Password must be at least 9 characters.");
                return;
            }
            
            //Storage
            localStorage.setItem("name", Name);
            localStorage.setItem("dob", DOB);
            localStorage.setItem("address", Address);
            localStorage.setItem("email", Email);
            localStorage.setItem("username", Username);
            localStorage.setItem("password", Password);

            //Success message
            alert("Account creation was successful!");

            //redirect to sign-in
            window.location.href = "index.html";
        };
    }
    //Sign In
    if (signInButton) {
        signInButton.onclick = function(event){
        event.preventDefault();
        let Username = document.getElementById("username").value;
        let Password = document.getElementById("password").value;

        let savedUsername = localStorage.getItem("username");
        let savedPassword = localStorage.getItem("password");

        //Validation of inputs
        if (!Username || !Password){
            alert("Please enter username and password to continue.");
            return;
        }

        if (Username == savedUsername && Password == savedPassword){
            window.location.href = "products.html";     //redirect to Products Page
        } else {
            alert("Incorrect username or password. Please try again");
        } 
    };
    } 

//Products List
    const products = [
    // Abibas
    {
        name: "Abibas Sneakers",
        price: 4500,
        description: "Stylish sneakers from Abibas.",
        image: "abibas1.png"
    },
    {
        name: "Abibas Slides",
        price: 3500,
        description: "Comfortable slides from Abibas.",
        image: "abibas2.png"
    },
    {
        name: "Abibas Fuzzy Slippers",
        price: 2500,
        description: "Cozy fuzzy slippers from Abibas.",
        image: "abibas3.png"
    },
    {
        name: "Abibas Slides",
        price: 3500,
        description: "Classic slides from Abibas.",
        image: "abibas4.png"
    },

    // Pike
    {
        name: "Pike Slides",
        price: 3500,
        description: "Casual slides from Pike.",
        image: "pike1.png"
    },
    {
        name: "Pike Sneakers",
        price: 5500,
        description: "Durable sneakers from Pike.",
        image: "pike2.png"
    },
    {
        name: "Pike Fuzzy Slides",
        price: 4000,
        description: "Soft fuzzy slides from Pike.",
        image: "pike3.png"
    },
    {
        name: "Pike Ballet Flats",
        price: 5000,
        description: "Elegant ballet flats from Pike.",
        image: "pike4.png"
    },

    // Runa
    {
        name: "Runa Sneakers",
        price: 4500,
        description: "Sneakers from Runa.",
        image: "runa1.png"
    },
    {
        name: "Runa Slides",
        price: 2750,
        description: "Comfortable slides from Runa.",
        image: "runa2.png"
    },
    {
        name: "Runa Fuzzy Slippers",
        price: 3550,
        description: "Warm fuzzy slippers from Runa.",
        image: "runa3.png"
    },
    {
        name: "Runa Sneakers",
        price: 4500,
        description: "Stylish sneakers from Runa.",
        image: "runa4.png"
    }
];

localStorage.setItem("AllProducts", JSON.stringify(products));

function renderProducts() {
  const allProducts = JSON.parse(localStorage.getItem("AllProducts")) || [];
  const container = document.getElementById("productlist");

  container.innerHTML = "";

  allProducts.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img">
      <p class="product-name">${product.name}</p>
      <p class="product-price">$${product.price.toLocaleString()}</p>
      <p class="product-desc">${product.description}</p>
      <div class="button-container">
        <button class="atc-button">Add to Cart</button>
      </div>
    `;

    container.appendChild(productDiv);
  });
  
  attachCartEvents();
}
renderProducts();
    //Add to Cart
  function attachCartEvents() {
  const buttons = document.querySelectorAll(".atc-button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const product = button.closest(".product");
      const name = product.querySelector(".product-name").textContent;
      const priceText = product.querySelector(".product-price").textContent;
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
      const image = product.querySelector(".product-img").getAttribute("src");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const exist = cart.find(item => item.name === name);

      if (exist) {
        exist.qty++;
        alert("Item added again!");
      } else {
        cart.push({ name, price, image, qty: 1 });
        alert("Item added!");
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});

function attachCartEvents() {
  const buttons = document.querySelectorAll(".atc-button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const product = button.closest(".product");
      const name = product.querySelector(".product-name").textContent;
      const priceText = product.querySelector(".product-price").textContent;
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
      const image = product.querySelector(".product-img").getAttribute("src");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const exist = cart.find(item => item.name === name);

      if (exist) {
        exist.qty++;
        alert("Item added again!");
      } else {
        cart.push({ name, price, image, qty: 1 });
        alert("Item added!");
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
}

//Remove from Cart
document.getElementById("clear-cart-button").addEventListener("click", () => {
    // Clear cart data from localStorage
    localStorage.removeItem("cart");

    // Clear cart items in the DOM
    document.getElementById("cart-items").innerHTML = "";

    // Reset totals
    document.getElementById("subtotal").textContent = "$0.00";
    document.getElementById("shipping").textContent = "$0.00";
    document.getElementById("cart-total").textContent = "$0.00";

    // Disable checkout button if cart is empty
    document.getElementById("checkout-button").disabled = true;

    alert("Cart has been cleared!");
});


    //Display Cart
    const cartContainer = document.getElementById("cart-items");
    if (cartContainer){
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

            if (cart.length === 0){
                cartContainer.innerHTML = "<p>Your cart is empty</p>";
                } else {
                    let subtotal = 0.00;
                    cartContainer.innerHTML = "";

                    cart.forEach((item, index) => {
                        const itemTotal = item.price * item.qty;
                        subtotal += itemTotal;

                        const productCell = document.createElement("div");
                        productCell.classList.add("cart-row");
                        productCell.innerHTML = `
                            <img src="${item.image}" alt="${item.name}" style="height: 200px; width: 200px;">
                            <p>${item.name}</p>
                        `;
                        cartContainer.appendChild(productCell);

                        const priceCell = document.createElement("div");
                        priceCell.classList.add("cart-row");
                        priceCell.innerHTML = `<p>$${item.price.toFixed(2)}</p>`;
                        cartContainer.appendChild(priceCell);

                        const quantityCell = document.createElement("div");
                        quantityCell.classList.add("cart-row");
                        quantityCell.innerHTML = `
                            <button class="qty-btn" data-action="minus" data-index="${index}">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" data-action="plus" data-index="${index}">+</button>
                        `;
                        cartContainer.appendChild(quantityCell);

                        const subtotalCell = document.createElement("div");
                        subtotalCell.classList.add("cart-row");
                        subtotalCell.innerHTML = `
                                <p> $${itemTotal.toFixed(2)}</p>
                                <button class="remove-btn" data-index="${index}">X</button>
                                <br><br>
                        `;
                        cartContainer.appendChild(subtotalCell);
                    });

                    //Totals
                    const subTotal = document.getElementById("subtotal");
                    const shippingCost = document.getElementById("shipping");
                    const cartTotal = document.getElementById("cart-total");
                    if (subTotal && shippingCost && cartTotal) {
                        subTotal.innerText = `$${subtotal.toFixed(2)}`;
                        const shipping = 0.00;
                        shippingCost.innerText = `$${shipping.toFixed(2)}`;
                        const total = subtotal + shipping;
                        cartTotal.innerText = `$${total.toFixed(2)}`;
                    }
                    //Quantity
                    document.querySelectorAll(".qty-btn").forEach(btn => {
                        btn.addEventListener("click", () => {
                            // let cart = JSON.parse(localStorage.getItem("cart"));
                            const index = btn.dataset.index;

                            if (btn.dataset.action === "minus" && cart[index].qty > 1){
                                cart[index].qty--;
                            }else if (btn.dataset.action === "plus"){
                                cart[index].qty++;
                            }
                            localStorage.setItem("cart", JSON.stringify(cart));
                            location.reload();
                        });
                    });

                    //Revove product from cart
                    document.querySelectorAll(".remove-btn").forEach(btn => {
                        btn.addEventListener("click", () => {
                            // let cart = JSON.parse(localStorage.getItem("cart"));
                            const index = btn.dataset.index;
                            cart.splice(index, 1);
                            localStorage.setItem("cart", JSON.stringify(cart));
                            location.reload();
                        });
                    });
            }

        }
        //Checkout
            //Shipping Details
            const saveBtn = document.getElementById("save-shipping");
            if (saveBtn){
                saveBtn.onclick = function(event){
                    event.preventDefault();
                    const fullName = document.getElementById("full-name").value;
                    const address = document.getElementById("shipping-address").value;

                    if (!fullName || !address){
                        alert("Please enter your full name and address");
                        return;
                    }
                    localStorage.setItem("name", fullName);
                    localStorage.setItem("address", address);
                    alert("Shipping details saved successfully!");
                };
            }

            //Payment
            const PayBtn = document.getElementById("pay-button");
            if (PayBtn){
                PayBtn.onclick = function(event){
                    event.preventDefault();
                    const cardName = document.getElementById("card-name").value;
                    const cardNumber = document.getElementById("card-number").value;
                    const expDate = document.getElementById("exp-date").value;
                    const cvc = document.getElementById("cvc").value;

                    if (!cardName || !cardNumber || !expDate || !cvc){
                        alert("Please fill out all payment details to continue");
                        return;
                    } 
                    //Validation for CVC
                     if (cvc.length != 3 ){
                        alert("CVC must be 3 numbers");
                        return;
                   }
                   //Validation for Card Number
                   if (cardNumber.length != 16) {
                        alert("Cart number must be 16 numbers long");
                        return;
                   }
                    alert("Payment successful! Thank you for your purchase.");
                    window.location.href = "invoice.html"; //redirect to invoice
                  
                }
            }
            //Order Summary
            const summaryContainer = document.getElementById("order-items");
            if (summaryContainer){
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                if (cart.length === 0){
                    summaryContainer.innerHTML = "<p>Your cart is empty</p>";
                } else {
                    cart.forEach(item => {
                        const itemTotal = (item.price * item.qty).toFixed(2);
                        const itemRow = document.createElement("div");
                        itemRow.classList.add("summary-row");
                        itemRow.innerHTML = `
                            <img src="${item.image}" alt="${item.name}" style="width: 200px;">
                            <p>${item.name} (x${item.qty})</p>
                            <p>$${itemTotal}</p>
                        `;
                        summaryContainer.appendChild(itemRow);
                    });
                }
            }
        //Invoice
        const invoiceContainer = document.getElementById("invoice-items");
        const invoiceTotal = document.getElementById("invoice-total");
        const billingContainer = document.getElementById("billings");

        if (invoiceTotal){
            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            //Print Billings
            const Name = localStorage.getItem("name");
            const Address = localStorage.getItem("address");

            billingContainer.innerHTML = `
                <p>${Name}</p>
                <p>${Address}</p>
                `;

            //Empty cart
            if (cart.length===0){
                invoiceTotal.innerHTML = `
                <tr><td colspan="4">No items found</td></tr>
                `;
                invoiceTotal.innerText = "$0.00";
            } else {
                let grandTotal = 0.00;

                cart.forEach(item => {
                    const itemTotal = item.price * item.qty;
                    grandTotal += itemTotal;

                    const row = document.createElement("tr");
                    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${item.qty}</td>
                    <td>${itemTotal}</td>
                    `;
                    invoiceContainer.appendChild(row);
                });
                //Print Totals
                invoiceTotal.innerHTML = `
                <p><strong>JMD$${grandTotal.toFixed(2)}</strong></p>
                `;
            }
        }
        
        //Print Invoice
        const printBtn = document.getElementById("print-btn");
        if (printBtn){
            printBtn.addEventListener("click", ()=>{
                window.print();
            });
        }

        //Download as PDF
        const downloadBtn = document.getElementById("download-btn");
        if (downloadBtn){
            downloadBtn.addEventListener("click", ()=>{
                window.print();
            });
        }
};








