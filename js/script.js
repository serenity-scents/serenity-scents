let companyName = "Serenity-Scents"
let tabId = companyName+"-tab";
let currentTab = sessionStorage.getItem(tabId);

console.log(currentTab);
if(currentTab == null){
    sessionStorage.setItem(tabId, "home")
}

$(document).ready(function() {
    let cart = sessionStorage.getItem("cart")
    let itemCount = 0;
    if(cart != null){
        cartItems = JSON.parse(cart);
        if(Array.isArray(cartItems)){
            cartItems.map(item => {
                itemCount += item.qty;
            })
        }
    }
    $('#cartCount').text(itemCount);
});
function speak(url) {
    const audio = new Audio(url);
    audio.play()
      .then(() => {
        console.log("Audio is playing.");
      })
      .catch(error => {
        console.error("Error playing audio:", error);
      });
  }
// const products = [
//             { name: "Lavender Bliss", price: 15, image: "lavender.jpg" },
//             { name: "Vanilla Coffee Dream", price: 14, image: "coffee.jpg" },
//             { name: "Ocean Oregano Breeze", price: 18, image: "oregano.jpg" },
//             { name: "Luminous Lemon", price: 18, image: "lemon.jpg" },
//             { name: "Mystic Rose Charm", price: 18, image: "rose.jpg" }  
//         ];
function addToCart(newItem){
    console.log("Add item to cart");
    speak("./media/item_added.mp3")
    let cart = sessionStorage.getItem("cart")
    let itemCount = 0;
    if(cart != null){
        cartItems = JSON.parse(cart);
        if(Array.isArray(cartItems)){
            let itemIndex = -1;
            cartItems.map((item, i) => {
                if(item.id == newItem.id){
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
                })

            }else{
                cartItems.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    image: newItem.image,
                    qty: 1
                });
            }
            
            sessionStorage.setItem("cart", JSON.stringify(cartItems))
            cartItems.map(item => {
                itemCount += item.qty;
            })
        }
    }else{
        sessionStorage.setItem("cart", JSON.stringify([{
            id: newItem.id,
            name: newItem.name,
            price: newItem.price,
            image: newItem.image,
            qty: 1
        }]));
        itemCount += 1;
    }
    $(document).ready(function() {
        console.log(itemCount)
        $('#cartCount').text(itemCount);
    });
}


        function displayProducts() {
            const productList = document.getElementById("product-list");
            products.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.className = "product";
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <button onclick="speak('Added ${product.name} to cart')">Add to Cart</button>
                `;
                productList.appendChild(productDiv);
            });
        }
// window.onload=function(){
//     function showTab(tabId) {
//         // document.querySelectorAll("section").forEach(section => {
//         //     section.classList.remove("active");
//         // });
//         // document.getElementById(tabId).classList.add("active");
//         console.log("AAAAAAAAAAAAAAAA");
//         speak(tabId + section);

//     }
//     function speak(text) {
//         console.log
//                 var msg = new SpeechSynthesisUtterance(text);
//                 msg.rate = 0.7;
//                 msg.pitch = 1;
//                 window.speechSynthesis.speak(msg);
//     }
// }
        

        // function speak(text) {
        //     const speech = new SpeechSynthesisUtterance(text);
        //     window.speechSynthesis.speak(speech);
        // }

        document.addEventListener("DOMContentLoaded", displayProducts);
