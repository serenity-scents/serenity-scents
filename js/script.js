
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


