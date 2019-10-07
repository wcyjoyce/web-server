const search = document.querySelector("form");
const query = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

messageOne.textContent = "Search a location";
messageTwo.textContent = "";

search.addEventListener("submit", event => {
  event.preventDefault();
  fetch(`http://localhost:3000/weather?address=${query.value}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      };
    });
  });
});
