
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



    var lastScrollTop = 0;

    
    document.addEventListener("scroll", function(){ 
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > 199) {
        document.getElementById("navbar").className = "flex flex-col w-full z-50 h-auto border-b-2 bg-black/75 fixed pb-4";
        document.getElementById("name-serenity").className = "hidden";
        document.getElementById("name-scents").className = "hidden";
        document.getElementById("logo").className = "flex flex-col w-20 h-20 md:w-28 md:h-28 border-0";
        document.getElementById("tagline").className = "hidden";
    } else if (st == 0) {
        console.log("scroll up", lastScrollTop);
        document.getElementById("navbar").className = "flex flex-col w-full z-50 h-full md:h-auto pt-4";
        document.getElementById("name-serenity").className = "text-2xl sm:text-5xl font-serif font-medium text-white";
        document.getElementById("name-scents").className = "text-2xl sm:text-5xl font-serif font-medium text-white";
        document.getElementById("logo").className = "flex flex-col w-20 h-20 md:w-40 md:h-40 border-0";
        document.getElementById("tagline").className ="text-sm sm:text-lg md:text-xl text-white font-semibold italic font-serif";
        
    } // else was horizontal scroll
    lastScrollTop = st <= 0 ? 0 : st; 
    }, false);
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
    positionTransition(`item-${newItem.id}`)
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
    let clientName = document.getElementById("client-name").value;
    let clientContact = document.getElementById("client-contact").value; 
    let clientAddress = document.getElementById("client-address").value; 
    let error1 = '';
    let error2 = '';
    let error3 = '';
    if(clientName.length == 0){
        error1 = '* Client name is required';
    } 
    if(clientContact.length == 0){
        error2 = '* Client contact number is required'
    }
    if(clientAddress.length == 0){
        error3 = '* Client address is required'
    }
    if(error1 != '' || error2 != '' || error3 != ''){
        window.alert(error1 + '\n' + error2 + "\n" + error3);
        return
    }
    document.getElementById("myModal").style.display = "block";
    document.getElementById("modalOverlay").style.display = "block";
}

function hideModal() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
    let cart = document.getElementById("cart");
    cart.className="flex flex-col z-40 items-center justify-center w-full mt-10 h-full overflow-hidden gap-4";
    let check_out = document.getElementById("check-out");
    check_out.className = "hidden";
    sessionStorage.removeItem("cart");
    location.reload();
}

function checkOut() {
    let cart = document.getElementById("cart");
    cart.className="hidden"
    let check_out = document.getElementById("check-out");
    check_out.className = "flex flex-col z-30 items-center justify-center w-full mt-10 h-full mb-40";
    
}

function showPrivacyModal() {
    document.getElementById("privacyModal").style.display = "block";
    document.getElementById("privacyModalOverlay").style.display = "block";
}

function hidePrivacyModal() {
    document.getElementById("privacyModal").style.display = "none";
    document.getElementById("privacyModalOverlay").style.display = "none";
}

let isMoved = false;
function positionTransition(id) {
    if(!isMoved){
        var cartCoords = document.getElementById("cart-btn").getBoundingClientRect();
        var element = document.getElementById(id);
        var rectBefore = element.getBoundingClientRect(); //get old coordinates
        element.style.transition = "transform 1000ms ease-in-out, opacity 1000ms ease-in-out";
        element.style.transform = `translate(${cartCoords.x-rectBefore.x-(cartCoords.x*0.1)}px, ${cartCoords.y-rectBefore.y - 120}px) scale(0.1)`
        element.style.opacity = 0;

        isMoved = true;

        setTimeout(function() { //without the timeout, transition is ignored
            element.style.transform = `translate(${rectBefore.x}px, ${rectBefore.y}px) scale(1)`;
            element.removeAttribute('style');
            isMoved = false;
        }, 1000);
    }
}