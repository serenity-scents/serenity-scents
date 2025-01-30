
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
    $('#cartCountMobile').text(itemCount);
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
        $('#cartCountMobile').text(itemCount);
    });
}


function showModal() {
    document.getElementById("myModal").style.display = "block";
    document.getElementById("modalOverlay").style.display = "block";
}

function hideModal() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
    let cart = document.getElementById("cart");
    cart.className="flex flex-col z-50 items-center justify-center w-full mt-10 h-full overflow-hidden gap-4";
    let check_out = document.getElementById("check-out");
    check_out.className = "hidden";
}

function checkOut() {
    let cart = document.getElementById("cart");
    cart.className="hidden"
    let check_out = document.getElementById("check-out");
    check_out.className = "flex flex-col z-50 items-center justify-center w-full mt-10 h-full mb-40";
}

function showPrivacyModal() {
    document.getElementById("privacyModal").style.display = "block";
    document.getElementById("privacyModalOverlay").style.display = "block";
}

function hidePrivacyModal() {
    document.getElementById("privacyModal").style.display = "none";
    document.getElementById("privacyModalOverlay").style.display = "none";
}