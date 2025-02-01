window.onload=function(){

    function displayProducts() {
        const productList = document.getElementById("product-list");
        let cart = sessionStorage.getItem("cart");
        let totalAmount = 0;
        if(cart == null){
            const productDiv = document.createElement("div");
            productDiv.className = "flex flex-col items-center h-full w-full";
                productDiv.innerHTML = `
                    <p class="text-2xl md:text-6xl font-bold text-white my-4">No item found!</p>
                    <p class="text-xl text-white">Cart has no item yet.</p>
                    <button class="border-2 rounded-full px-10 py-2 my-10 text-lg font-semibold hover:animate-pulse animate-bounce text-white bg-[#ad8d78] hover:bg-[#ba8460]" onclick="location.href='products.html'">
                        Shop now
                    </button>
                `;
                productList.appendChild(productDiv);
            return;
        };
        cartItems = JSON.parse(cart);
        if(!Array.isArray(cartItems)) return;
        if(cartItems.length == 0){
            const productDiv = document.createElement("div");
            productDiv.className = "flex flex-col items-center h-full w-full";
                productDiv.innerHTML = `
                    <p class="text-2xl md:text-6xl font-bold text-white my-4">No item found!</p>
                    <p class="text-xl text-white">Cart has no item yet.</p>
                    <button class="border-2 rounded-full px-10 py-2 my-10 text-lg font-semibold hover:animate-pulse animate-bounce text-white bg-[#ad8d78] hover:bg-[#ba8460]" onclick="location.href='products.html'">
                        Shop now
                    </button>
                `;
                productList.appendChild(productDiv);
            return;
        }
        productList.className = ("flex flex-col w-[90%] md:w-[80%] xl:w-[50%] items-center h-[600px] gap-4 overflow-y-auto border rounded-lg bg-[#583e2f]/50 scrollbar-thin scrollbar-track-[#F1ECE9] scrollbar-thumb-[#AD8D78] scrollbar-corner-[#BCAA9E]");
        cartItems.forEach(product => {
            totalAmount = totalAmount + (product.price * product.qty);
            const productDiv = document.createElement("div");
            productDiv.className = " relative flex flex-col md:flex-row md:h-[300px] w-[70%] md:w-[90%] bg-white rounded-lg first:mt-10 last:mb-10";
            productDiv.id =`item-${product.id}`;
            productDiv.innerHTML = `
                <div class="flex w-full md:w-[60%] h-full justify-center items-center ">
                    <img class="flex w-[50%] md:w-[70%] h-[200px] md:h-full" style="background-image: url('${product.image}'); background-size: 100% 100%;">
                </div>
                <div class="flex flex-col justify-between w-full md:w-[40%] bg-[#f1ece9] rounded-r-lg">
                    <button class=" absolute top-2 right-2 flex font-bold border w-6 h-6 rounded-lg justify-center items-center bg-[#ad8d78] hover:bg-[#ba8460] text-white" onclick="removeItem(${product.id})">X</button>
                    <div class="px-8 py-8">
                        <p class="text-lg">${product.name}</p>
                        <p class="text-2xl font-bold">&#x20B1; ${product.price}</p>
                    </div>
                    <div class="flex flex-col px-8 pb-8">
                        <div class="flex flex-row justify-between">
                            <p class="text-lg font-medium">Qty.</p>
                            <p class="text-lg font-medium">Total</p>
                        </div>
                        <div class="flex flex-row justify-between">
                            <div class="flex flex-row justify-center items-center">
                                <button class="flex border rounded-md w-6 h-6  justify-center items-center text-xl font-extrabold bg-[#ad8d78] hover:bg-[#ba8460] text-white" onclick="minusOne(${product.id})"> - </button>
                                <p class="flex text-xl lg:text-3xl font-bold p-2 lg:p-4 " id="item-${product.id}-qty">${product.qty}</p>
                                <button class="flex border rounded-md w-6 h-6  justify-center items-center text-xl font-extrabold bg-[#ad8d78] hover:bg-[#ba8460] text-white" onclick="addOne(${product.id})"> + </button>
                            </div>
                            <p class="flex justify-center items-center text-4xl font-bold" id="item-${product.id}-total">${product.price * product.qty}</p>
                        </div>
                    </div>
                </div>
            `;
            productList.appendChild(productDiv);
        });
        let checkOutBtn = document.getElementById("check-out-button");
        checkOutBtn.className = "flex flex-row w-[90%] md:w-[80%] xl:w-[50%] justify-between  px-8 mb-20 lg:mb-10 w-full";
        const totalAmountElement = document.getElementById("total-amount");
        totalAmountElement.innerHTML = totalAmount;
    }

    // function speak() {
    //     var msg = new SpeechSynthesisUtterance("Cart Section");
    //     msg.rate = 0.7;
    //     msg.pitch = 1;
    //     window.speechSynthesis.speak(msg);
    // }

    function speak() {
        const audio = new Audio("./media/cart_section.mp3");
        audio.play()
          .then(() => {
            console.log("Audio is playing.");
          })
          .catch(error => {
            console.error("Error playing audio:", error);
          });
      }
    speak()
    displayProducts()
}

function addOne(id){
    let cart = sessionStorage.getItem("cart")
    let itemCount = 0;
    const totalAmountElement = document.getElementById("total-amount");
    let totalAmount = parseInt(totalAmountElement.innerHTML)
    if(cart == null) return;
    cartItems = JSON.parse(cart);
    if(Array.isArray(cartItems)){
        let itemIndex = -1;
        cartItems.map((item, i) => {
            if(item.id == id){
                itemIndex = i;
            }
        })
        if(itemIndex > -1){
            let current = cartItems[itemIndex];
            cartItems.splice(itemIndex,1, {
                id: current.id,
                name: current.name,
                price: current.price,
                image: current.image,
                qty: current.qty + 1
            });
            totalAmount += current.price;
            sessionStorage.setItem("cart", JSON.stringify(cartItems))
            cartItems.map(item => {
                itemCount += item.qty;
            });

        }
        
        $(document).ready(function() {
            $(`#item-${cartItems[itemIndex].id}-qty`).text(cartItems[itemIndex].qty)
            $(`#item-${cartItems[itemIndex].id}-total`).text(cartItems[itemIndex].price * cartItems[itemIndex].qty)
            $(`#total-amount`).text(totalAmount)
            $('#cartCount').text(itemCount);
            $('#cartCountMobile').text(itemCount);
        });
        
    }
}

function minusOne(id){
    let cart = sessionStorage.getItem("cart")
    let itemCount = 0;
    const totalAmountElement = document.getElementById("total-amount");
    let totalAmount = parseInt(totalAmountElement.innerHTML)
    if(cart == null) return;
    cartItems = JSON.parse(cart);
    if(Array.isArray(cartItems)){
        let itemIndex = -1;
        cartItems.map((item, i) => {
            if(item.id == id){
                itemIndex = i;
            }
        })
        if(itemIndex > -1){
            let current = cartItems[itemIndex];
            if(current.qty <= 1){
                cartItems.splice(itemIndex,1);
                $(document).ready(function() {
                    $(`#item-${itemIndex}`).remove();
                    location.reload();
                    return;
                });
            }else{
                cartItems.splice(itemIndex,1, {
                    id: current.id,
                    name: current.name,
                    price: current.price,
                    image: current.image,
                    qty: current.qty - 1
                });
            }
            
            totalAmount -= current.price;
            sessionStorage.setItem("cart", JSON.stringify(cartItems))
            cartItems.map(item => {
                itemCount += item.qty;
            });

        }
        
        $(document).ready(function() {
            $(`#item-${cartItems[itemIndex].id}-qty`).text(cartItems[itemIndex].qty)
            $(`#item-${cartItems[itemIndex].id}-total`).text(cartItems[itemIndex].price * cartItems[itemIndex].qty)
            $(`#total-amount`).text(totalAmount)
            $('#cartCount').text(itemCount);
            $('#cartCountMobile').text(itemCount);
        });
        
    }
}

function removeItem(id){
    let cart = sessionStorage.getItem("cart")
    let itemCount = 0;
    if(cart == null) return;
    cartItems = JSON.parse(cart);
    if(Array.isArray(cartItems)){
        let itemIndex = -1;
        cartItems.map((item, i) => {
            if(item.id == id){
                itemIndex = i;
            }
        })
        if(itemIndex > -1){
            cartItems.splice(itemIndex,1);
            sessionStorage.setItem("cart", JSON.stringify(cartItems))
            cartItems.map(item => {
                itemCount += item.qty;
            });
            $(document).ready(function() {
                    $(`#item-${itemIndex}`).remove();
                    $('#cartCount').text(itemCount);
                    $('#cartCountMobile').text(itemCount);
                    location.reload();
                    return;
            });
        }
        
    }
}


