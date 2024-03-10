
// This is your test publishable API key.
const stripe = Stripe("pk_test_51OUWAmJKRSOh7j6OdyFxfXdqNJapSBHzcIkgfOaSyeAKHesIAZnY47q3q9jEfg0SS3PyuTUDaOq6Oy1rrdgMT7K700iyuJHnC6");

// The items the customer wants to buy
const items = document.getElementsByName('items')[0].value;
const uniqueNumber = new Date().getTime()

let elements;

initialize();
checkStatus();

document
  .querySelector("#payment-form")
  .addEventListener("submit", handleSubmit);

// Fetches a payment intent and captures the client secret
async function initialize() {
  const response = await fetch("create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  const { clientSecret } = await response.json();

  const appearance = {
    theme: 'minimal',
  };
  elements = stripe.elements({
    appearance,
    clientSecret,
 });

  const paymentElementOptions = {
    layout: "tabs",
    business: {name: "Little Woolly Snuggles"},
  };

  const paymentElement = elements.create("payment", paymentElementOptions);
  paymentElement.mount("#payment-element");
}

async function handleFormPost() {
  const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
  const formData = new FormData();
  let form = document.getElementById('payment-form');
  let inputs = form.querySelectorAll('input');
  for (let input of inputs) {
    formData.append(input.name, input.value)
  }
  formData.append('csrfmiddlewaretoken', csrfToken)
  formData.append('order_number', uniqueNumber)
  try {
    const response = await fetch("/checkout/", {
      method: "POST",
      // Set the FormData instance as the request body
      body: formData,
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }
}
async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  handleFormPost();
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: `https://8000-johnamdicks-portfoliopr-41pgsd24zrp.ws-eu108.gitpod.io/checkout/checkout-success/${uniqueNumber}`,
    },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";
  }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}