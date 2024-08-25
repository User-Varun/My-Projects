// elements selector
const userContactContainer = document.querySelector(".user-contact-container");

const fetchData = function () {
  fetch("http://localhost:3000/api/accounts")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok!" + res.statusText);
      }

      return res.json();
    })
    .then((data) => {
      renderData(data);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
};

fetchData();

const renderData = function (data) {
  data.map((account, index) => {
    const html = `
<div class="user-contact">
          <div class="user-contact-img-and-name-elements-container">
            <img
              src="https://i.pravatar.cc/60?img=${index}"
              alt=" user's contact"
              class="user-contact-img-element"
            />

            <span>
              <span class="user-contact-name">${account.firstName}</span> <br />
              <span class="user-contact-last-message">${
                account.lastMessage
              }</span>
            </span>
          </div>

          <span class="relative">
            <p class="new-message-alert ${
              account.newMessage ? "" : "display-none"
            } " >NEW</p>

            <span class="user-contact-last-message-time">${
              account.newMessageTime
            }</span>
          </span>
</div>
`;

    userContactContainer.insertAdjacentHTML("afterbegin", html);
  });
};
