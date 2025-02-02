window.onload=function(){
    // speak("./media/contact_us.mp3")
}

// emailjs.init('CdjJplvtx5oveCsiP'); // Replace with your EmailJS User ID

emailjs.init({
    publicKey: "CdjJplvtx5oveCsiP",
  });
// Function to send email
function submitFeedback(){
    let fromName = document.getElementById("client-name").value; 
    let fromEmail = document.getElementById("client-email").value; 
    let message = document.getElementById("client-message").value;
    let error1 = '';
    let error2 = '';
    let error3 = '';
    if(fromName.length == 0){
        error1 = '* Client name is required';
    } 
    if(fromEmail.length == 0){
        error2 = '* Client email address is required'
    }
    if(message.length == 0){
        error3 = '* Client message is required'
    }
    if(error1 != '' || error2 != '' || error3 != ''){
        window.alert(error1 + '\n' + error2 + "\n" + error3);
        return
    } 
    sendEmail(fromName, fromEmail, message)
    // Example usage
    // sendEmail(
    //     'recipient@example.com', 
    //     'Hello from EmailJS', 
    //     'This is a test email sent using EmailJS!'
    // );
}


function sendEmail(fromName, fromEmail, message) {
  const templateParams = {
    to_name: "Serenity Scents",
    from_name: fromName,
    message: message,
    reply_to: fromEmail,
  };

  emailjs
    .send('service_p3gb6s7', 'template_g5oyccu', templateParams)
    .then((response) => {
      console.log('Email sent successfully:', response.status, response.text);
      alert('Email sent successfully!');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    });
}
