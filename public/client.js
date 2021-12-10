
  var socket = io();

  window.onload = () => {
    
    // identifiera output-element
    let output = document.getElementById("messages");

    // ta emot användarinput och skicka meddelande
    document.getElementById("form").addEventListener("submit", (evt) => {
        evt.preventDefault();   // hindra att formuläret laddas om
        let meddelande = document.getElementById("input").value;
        socket.emit("chat message", meddelande); // skicka händelse till server
        document.getElementById("input").value = "";   // rensa inmatningsfältet
        let tid = new Date().toISOString().substr(11, 8);   // aktuellt klockslag i formatet hh:mm:ss
        let html = `<li>Du skrev (${tid}): ${meddelande}</li>`;
        output.innerHTML += html;
    });

    // ta emot meddelanden från servern och skriv ut
    socket.on("chat message", (data) => {
        let tid = new Date().toISOString().substr(11, 8);   // aktuellt klockslag i formatet hh:mm:ss
        let html = `<li>${data}</li>`;
        output.innerHTML += html;
    })
    socket.on("user-connected", (data) => {
        let html = `<li>${data}</li>`;
        output.innerHTML += html;
    })

}