document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a[data-ajax]");
  links.forEach((link) => {
    link.addEventListener("click", async (event) => {
      event.preventDefault();
      const url = event.target.getAttribute("href");
      try {
        const response = await fetch(url, {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        });
        const data = await response.json();
        updateContent(data, url);
        history.pushState(data, "", url);
      } catch (error) {
        console.error("Error fetching page:", error);
      }
    });
  });

  window.addEventListener("popstate", (event) => {
    if (event.state) {
      updateContent(event.state, location.pathname);
    }
  });

  async function updateContent(data, url) {
    const contentDiv = document.getElementById("content");
    let html = "";

    if (url.startsWith("/chat/")) {
      html = `
                <h1>Welcome, ${data.user.username}!</h1>
                <div id="chat">
                    ${data.messages
                      .map(
                        (msg) =>
                          `<div><strong>${msg.sender.username}:</strong> ${msg.content}</div>`
                      )
                      .join("")}
                </div>
                <input type="text" id="messageInput">
                <button id="sendButton">Send</button>
                <script src="/js/chat.js"></script>
            `;
    } else if (url === "/profile") {
      html = `<h1>Profile of ${data.user.username}</h1>`;
    } else {
      html = `<h1>Home Page</h1>`;
    }

    contentDiv.innerHTML = html;
    attachChatHandlers();
  }

  function attachChatHandlers() {
    const sendButton = document.getElementById("sendButton");
    const messageInput = document.getElementById("messageInput");
    if (sendButton && messageInput) {
      sendButton.addEventListener("click", async () => {
        const message = messageInput.value;
        const room = location.pathname.split("/").pop();
        try {
          const response = await fetch("/chat/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: message, room }),
          });
          if (response.ok) {
            messageInput.value = "";
            const messageData = await response.json();
            const chatDiv = document.getElementById("chat");
            chatDiv.innerHTML += `<div><strong>${messageData.sender.username}:</strong> ${messageData.content}</div>`;
          } else {
            console.error("Error sending message:", await response.text());
          }
        } catch (error) {
          console.error("Error:", error);
        }
      });
    }
  }
});
