var html = [];
window.addEventListener("load", function() {
  var container = document.getElementById("container");

  html[0] =
    '<br><div class="name_container"><p>Please enter your name:</p><input id="name_input" name="name_input" type="text"></input><button id="submit_name" type="button">Submit</button></div>';
  html[1] =
    '<div id="mario-chat"><div id="chat-window"><div id="output"></div><div id="feedback"></div></div><input id="message" type="text" placeholder="Message" /><button id="send">Send</button></div>';

  var menuNum = 0;

  container.innerHTML = html[0];

  setPage();

  function setPage() {
    switch (menuNum) {
      // Landing Page
      case 0:
        var submit = document.getElementById("submit_name");
        submit.addEventListener("click", function() {
          var name = document.getElementById("name_input").value;
          localStorage.setItem("name", name);
          redirect(1);
        });
        break;
      // Chat Page
      case 1:
        // Connect to server
        var socket = io.connect("http://localhost:3000");
        // Query DOM
        var username = localStorage.getItem("name");
        var message = document.getElementById("message");
        var btn = document.getElementById("send");
        var output = document.getElementById("output");
        var feedback = document.getElementById("feedback");

        //message.addEventListener()
        // Create the events
        btn.addEventListener("click", () => {
          socket.emit("chat", {
            message: message.value,
            username: username
          });
          message.value = "";
        });

        message.addEventListener("keypress", () => {
          socket.emit("typing", username);
        });

        // Listen for the events
        socket.on("chat", data => {
          output.innerHTML += `<p><strong>${data.username}</strong>: ${
            data.message
          }</p>`;
          feedback.innerHTML = "";
        });

        socket.on("typing", data => {
          feedback.innerHTML = `<p><em>${data} is typing a message.</em></p>`;
        });
        break;
    }
  }

  function redirect(index) {
    menuNum = index;
    container.innerHTML = html[index];
    setPage();
  }
});
