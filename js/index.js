
// window.onload=function(){
//     speak("./media/welcome.mp3");
//     setTimeout(() => {
//         speak("./media/tagline.mp3");
//     },2500)

// }
function playWelcomeMessage() {
    speak("./media/welcome.mp3");
    setTimeout(() => {
        speak("./media/tagline.mp3");
    },2500)
}

// Play the welcome message when the page loads
window.addEventListener('DOMContentLoaded', playWelcomeMessage);