const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".nav-menu");
const menuButtonClose = document.querySelector(".menu-button-close");
const hideForm = document.querySelector(".hide-form");
const orderTrigger = document.querySelector(".order-trigger");
const orderTicket = document.querySelector(".order-ticket");
const orderTicketForm = document.querySelector(".order-ticket__form");
const heightForm = Math.round(orderTicket.getBoundingClientRect().height);
const orderTicketFormWrapper= document.querySelector(".order-ticket__form-wrapper");
const orderTicketPreloaderWrapper= document.querySelector(".order-ticket__preloader-wrapper");
const orderTicketThanksWrapper= document.querySelector(".order-ticket__thanks-wrapper");
const orderTicketThanksName= document.querySelector(".order-ticket__thanks-name");

menuButton.addEventListener("click", () => {
  menu.classList.add("is-open");
  menuButtonClose.classList.add("is-active");
});

menuButtonClose.addEventListener("click", () => {
  menu.classList.remove("is-open");
  menuButtonClose.classList.remove("is-active");
});

setTimeout(() => {
  hideForm.style.bottom = -heightForm + "px";
}, 1000);

const sendData = (data, callback, callBefore) => {
  if(callBefore) callBefore();

  fetch("http://localhost:3000/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(callback)
};

const showPreloader = () => {
  orderTicketFormWrapper.style.display = "none";
  orderTicketPreloaderWrapper.style.display = "block";
}

const showThennkYou = (data) => {
  orderTicketFormWrapper.style.display = "none";
  orderTicketPreloaderWrapper.style.display = "none";
  orderTicketThanksWrapper.style.display = "block";
  orderTicketThanksName.textContent = data.name;
};

orderTrigger.addEventListener("click", () => {
  hideForm.classList.toggle("hide-form-active");
});

orderTicketForm.addEventListener("change", (event) => {
  const target = event.target;
  const label = target.labels[0];
  if (label && target.value) {
    console.log(label);
    label.classList.add("order-ticket__label-focus");
  } else {
    label.classList.remove("order-ticket__label-focus");
  }
});

orderTicketForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(orderTicketForm);
  const data = {};
  for (const [name, value] of formData) {
    data[name] = value;
  }
  sendData(data, showThennkYou, showPreloader);
});
