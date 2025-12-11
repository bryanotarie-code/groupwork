//Name: Amoya Collins
//ID: 2408831
//Assignment#: Individual Assignment #2
//Day/Time of Class: Tuesday @ 11:00 AM
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
    
    //Cart
        //Add to Cart
        const buttons = document.querySelectorAll(".atc-button");

        buttons.forEach((button)=> {
            button.addEventListener("click", ()=> {
                const product = button.closest(".product");
                const image = product.querySelector(".product-img").getAttribute("src");
                const name = product.querySelector(".product-name").textContent;
                const priceText = product.querySelector(".product-price").textContent;
                const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));

                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                //Look for existing items
                const exist = cart.find(item => item.name === name);

                if (exist){
                    exist.qty++;
                    alert("Item added to cart again!");
                } else {
                    cart.push({ image, name, qty: 1, price});
                    alert("Item added to cart!");
                }

                localStorage.setItem("cart", JSON.stringify(cart));
            });
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

            const ConfirmBtn = document.getElementById("confirm-button");
            if (ConfirmBtn){
                ConfirmBtn.onclick = function(event){
                    event.preventDefault();
                    alert("Your order has been confirmed!");
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








