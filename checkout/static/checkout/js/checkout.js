
// This is your test publishable API key.
const stripe = Stripe("pk_test_51OUWAmJKRSOh7j6OdyFxfXdqNJapSBHzcIkgfOaSyeAKHesIAZnY47q3q9jEfg0SS3PyuTUDaOq6Oy1rrdgMT7K700iyuJHnC6");

// The items the customer wants to buy
const items = document.getElementsByName('items')[0].value;

// generate a unique number to assign to order. Solution found in stack overflow:
// https://stackoverflow.com/questions/8012002/create-a-unique-number-with-javascript-time
const uniqueNumber = new Date().getTime() + (Math.random()*100000).toFixed()

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
  // find hidden input for storing client secret and update with actual client secret
  // for use in cache checkout function.
  let secretHiddenInput = document.getElementsByName("client_secret")[0]
  secretHiddenInput.value = clientSecret
  // update payment intent metadata
  handleUpdateMetadata();
  configurePaymentMessage();
}

async function handleFormPost() {
  const formData = new FormData();

  const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
  formData.append('csrfmiddlewaretoken', csrfToken)

  let form = document.getElementById('payment-form');
  let inputs = form.querySelectorAll('input');
  for (let input of inputs) {
    formData.append(input.name, input.value)
  }
  const country = document.getElementById('id_country').value;
  formData.append('country', country)
  formData.append('order_number', uniqueNumber)
  try {
    await fetch("/checkout/", {
      method: "POST",
      // Set the FormData instance as the request body
      body: formData,
    });
  } catch (e) {
    console.error(e);
  }
}
async function handleUpdateMetadata () {
  const formData = new FormData();
  const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
  const clientSecret = document.getElementsByName("client_secret")[0].value;
  formData.append('csrfmiddlewaretoken', csrfToken)
  formData.append('client_secret', clientSecret)
  formData.append('save_info', true)
  formData.append('order_number', uniqueNumber)
  try {
    await fetch("/checkout/cache-checkout-data/", {
      method: "POST",
      // Set the FormData instance as the request body
      body: formData,
    });
  } catch (e) {
    console.error(e);
  }
  setLoading(false);
}
async function handleSubmit(e) {
  let form = document.getElementById('payment-form');
  let billingData = {}
  let addressData = {}
  let inputs = form.querySelectorAll('input');
  for (let input of inputs) {
    switch (input.name) {
      case 'full_name': billingData['name'] = input.value
      break;
      case 'email': billingData['email'] = input.value
      break;
      case 'phone_number': billingData['phone'] = input.value
      break;
      case 'county': addressData['state'] = input.value
      break;
      case 'town_or_city': addressData['city'] = input.value
      break;
      case 'street_address1': addressData['line1'] = input.value
      break;
      case 'street_address2': addressData['line2'] = input.value
      break;
      case 'postcode': addressData['postal_code'] = input.value
      break;
      default:
        break;
    }
  }
  const country = document.getElementById('id_country').value;
  billingData.address = addressData;
  billingData.address.country = country;
  // how to clone an object:
  // https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/
  var shippingData = Object.assign({}, billingData)
  delete shippingData.email
  console.log(country)
  e.preventDefault();
  setLoading(true);
  handleFormPost();

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: `https://8000-johnamdicks-portfoliopr-41pgsd24zrp.ws-eu108.gitpod.io/checkout/checkout-success/${uniqueNumber}`,
      shipping: shippingData,
      payment_method_data: {
        billing_details: billingData,
      },
    },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
    try {
      await fetch(`/checkout/payment-declined/${uniqueNumber}/`, {
        method: "GET",
        // Set the FormData instance as the request body
      });
    } catch (e) {
      console.error(e);
    }
    // Inform the customer that there was an error.
  } else {
    showMessage("An unexpected error occurred.");
    try {
      await fetch(`/checkout/payment-declined/${uniqueNumber}/`, {
        method: "GET",
        // Set the FormData instance as the request body
      });
    } catch (e) {
      console.error(e);
    }
  }
  setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );
  console.log('secret', clientSecret)

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


const configurePaymentMessage = () => {
  const button = document.getElementById('submit');
  const message = document.getElementById('card-charge-text');
  function showMessage () {
    message.style.opacity = '1'
  }
  function hideMessage () {
    message.style.opacity = '0'
  }
  button.addEventListener('mouseenter', showMessage, false);
  button.addEventListener('click', hideMessage, false);
  button.addEventListener('mouseleave', hideMessage, false);
}


