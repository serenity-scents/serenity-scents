

function toggleChat() {
    const chatbot = document.getElementById("chatbot-container");
    chatbot.style.display = chatbot.style.display === "none" || chatbot.style.display === "" ? "block" : "none";
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Send message function
function sendMessage() {
    let inputField = document.getElementById("chatbot-input");
    let message = inputField.value.trim();
    if (message === "") return;

    addMessage(message, "user");

    // Simulated bot response
    setTimeout(() => {
        let response = getBotResponse(message);
        addMessage(response, "bot");
    }, 1000);

    inputField.value = "";
}

// Add message to chat window
function addMessage(text, sender) {
    let messagesDiv = document.getElementById("chatbot-messages");
    let newMessage = document.createElement("div");
    newMessage.className = ""
    if(sender == "user"){
        newMessage.innerHTML = `
        <div class="flex justify-end">
            <p class="border px-4 rounded-full bg-[#593E2B] text-white py-2">${text}</p>
        </div>
    `
    }else{
        newMessage.innerHTML = `
            <div class="relative flex justify-start ">
                <div class="absolute -left-3 -bottom-2 flex flex-col w-6 h-6 border-2 rounded-full bg-[#583e2f]" style="background-image: url('./img/logo.png'); background-size: 100%; "></div>
                <p class="border px-4 rounded-full bg-[#BA8460] text-white py-2">${text}</p>
            </div>
        `
    }
    // newMessage.textContent = text;
    // newMessage.classList.add(sender);
    messagesDiv.appendChild(newMessage);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Simple chatbot responses
function getBotResponse(input) {
    input = input.toLowerCase();
    if (input.includes("hello") || input.includes("hi")) {
        return "Hello! How can I assist you with Serenity Scent's products today?";
    } else if (input.includes("products") || input.includes("product")) {
        return "We offer a variety of scented candles in floral, fruity, minty, sweet and fresh scents.";
    } else if (input.includes("thank you")) {
        return "You're welcome! Feel free to ask anything else.";
    } else if (input.includes("contact")) {
        return "<a href='https://www.facebook.com/share/14VopQxiKt/'> www.facebook.com/share/14VopQxiKt/</a>";
    } else if (input.includes("located") || input.includes("location")) {
        return "We are based in Blk1lot8 lovewincompound UPS 5 BARANGAY SAN ISIDRO PARAÑAQUE CITY and offer nationwide shipping.";
    } else if (input.includes("how") && input.includes("order")) {
        return "You can order through our official website, social media pages, or by messaging us directly.";
    } else if (input.includes("payment method") || input.includes("payment") || input.includes("pay")) {
        return "We accept GCash, bank transfers, and Cash on Delivery (COD) in selected areas";
    } else if (input.includes("custom") || input.includes("bulk order") || input.includes("bulk orders")) {
        return "Yes! We accept personalized orders for gifts, events, and wholesale purchases.";
    } else if (input.includes("Anong mga produkto ang inaalok ninyo")) {
        return "Nag-aalok kami ng iba't ibang scented candles na may floral, fruity, minty, sweet, at fresh scents.";
    } else if (input.includes("Paano ako makakapag-order")) {
        return "Maaari kang mag-order sa aming opisyal na website, social media pages, o sa pamamagitan ng direktang pag-message sa amin.";
    } else if (input.includes("Anong mga paraan ng pagbabayad ang tinatanggap ninyo")) {
        return "Tumatanggap kami ng GCash, bank transfer, at Cash on Delivery (COD) sa piling mga lugar.";
    } else if (input.includes("Nag-aalok ba kayo ng custom o maramihang order")) {
        return "Oo! Tumatanggap kami ng personalized orders para sa regalo, events, at wholesale purchases.";
    } else {
        return "I'm not sure about that. Please visit our FAQ page for more details.";
    }
}