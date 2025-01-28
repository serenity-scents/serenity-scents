

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
    console.log("AAAAAAAAAAA", input)
    if (input.includes("hello") || input.includes("hi")) {
        return "Hello! How can I assist you with Serenity Scent's products today?";
    } else if (input.includes("products")) {
        return "We offer a wide range of scented candles, essential oils, and diffusers.";
    } else if (input.includes("order")) {
        return "You can place an order on our website's shop page.";
    } else if (input.includes("thank you")) {
        return "You're welcome! Feel free to ask anything else.";
    } else if (input.includes("contact")) {
        return "<a href='https://www.facebook.com/share/14VopQxiKt/'> www.facebook.com/share/14VopQxiKt/</a>";
    } else {
        return "I'm not sure about that. Please visit our FAQ page for more details.";
    }
}