/*jshint esversion: 8 */ 

// This is your test publishable API key.
const stripe = Stripe("pk_test_51OUWAmJKRSOh7j6OdyFxfXdqNJapSBHzcIkgfOaSyeAKHesIAZnY47q3q9jEfg0SS3PyuTUDaOq6Oy1rrdgMT7K700iyuJHnC6");

// The items the customer wants to buy
const items = document.getElementsByName('items')[0].value;

// generate a unique number to assign to order. Solution found in stack overflow:
// https://stackoverflow.com/questions/8012002/create-a-unique-number-with-javascript-time
const uniqueNumber = new Date().getTime() + (Math.random()*100000).toFixed();

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

  // select desired appearance for payment element.
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
  let secretHiddenInput = document.getElementsByName("client_secret")[0];
  secretHiddenInput.value = clientSecret;
  // update payment intent metadata
  handleUpdateMetadata();
  configurePaymentMessage();
}

async function handleFormPost() {
  /**
 * Handles calling checkout post method from browser taking user data
 * from the form and passing to the view.
 */
  const formData = new FormData();

  const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
  formData.append('csrfmiddlewaretoken', csrfToken);

  let form = document.getElementById('payment-form');
  let inputs = form.querySelectorAll('input');
  for (let input of inputs) {
    formData.append(input.name, input.value);
  }
  const country = document.getElementById('id_country').value;
  formData.append('country', country);
  formData.append('order_number', uniqueNumber);
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
  /**
 * Handles updating Stripe Metadata by accessing csrf token and creating a FormData 
 * object before calling the cache-checkout-data function.
 */
  const formData = new FormData();
  const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
  const clientSecret = document.getElementsByName("client_secret")[0].value;
  formData.append('csrfmiddlewaretoken', csrfToken);
  formData.append('client_secret', clientSecret);
  formData.append('order_number', uniqueNumber);
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
  /**
 * Stripe boiler plate with additional code to update Stripe billing and
 * shipping data using the users information.
 */
  e.preventDefault();
  setLoading(true);
  let form = document.getElementById('payment-form');
  let billingData = {};
  let addressData = {};
  let inputs = form.querySelectorAll('input');
  // switch inputs and assign to billingData or addressData in appropriate place.
  for (let input of inputs) {
    switch (input.name) {
      case 'full_name': billingData.name = input.value;
      break;
      case 'email': billingData.email = input.value;
      break;
      case 'phone_number': billingData.phone = input.value;
      break;
      case 'county': addressData.state = input.value;
      break;
      case 'town_or_city': addressData.city = input.value;
      break;
      case 'street_address1': addressData.line1 = input.value;
      break;
      case 'street_address2': addressData.line2 = input.value;
      break;
      case 'postcode': addressData.postal_code = input.value;
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
  var shippingData = Object.assign({}, billingData);
  delete shippingData.email;
  // call handle form post
  handleFormPost();
  const { error } = await stripe.confirmPayment({
    // data sent to stripe for payment.
    elements,
    redirect: "if_required",
    confirmParams: {
      shipping: shippingData,
      payment_method_data: {
        billing_details: billingData,
      },
    },
  });
  if (!error) {
    // if no error is returned from the await func then update db and assign url using
    // .pathname syntax. Solution along with removing trailing slash from SO and Career Karma blog
    // https://careerkarma.com/blog/javascript-go-to-url/
    // https://stackoverflow.com/questions/21944092/how-to-remove-in-javascript-location-pathname-return-value
     window.location.pathname = (`/checkout/checkout-success/${uniqueNumber}`).slice(1);
  }
  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error){
    // code to handle payment being declined. Calls payment-declined function which
    // deletes order from db.
    if (error.type === "card_error" || error.type === "validation_error") {
      showMessage(error.message);
      try {
        await fetch(`/checkout/payment-declined/${uniqueNumber}/`, {
          method: "GET",
          // Set the FormData instance as the request body
        });
      } catch (paymentDeclineError) {
        console.error(paymentDeclineError);
      }
      // Inform the customer that there was an error.
    } else {
      showMessage("An unexpected error occurred.");
      try {
        await fetch(`/checkout/payment-declined/${uniqueNumber}/`, {
          method: "GET",
          // Set the FormData instance as the request body
        });
      } catch (paymentUnexpectedError) {
        console.error(paymentUnexpectedError);
      }
    }
    setLoading(false);
  }
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
// Unadjust Stripe Boiler Plate below:

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
    document.querySelector("#button-icon").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
    document.querySelector("#button-icon").classList.remove("hidden");

  }
}


const configurePaymentMessage = () => {
  const button = document.getElementById('submit');
  const message = document.getElementById('card-charge-text');
  function showMessage () {
    message.style.opacity = '1';
  }
  function hideMessage () {
    message.style.opacity = '0';
  }
  button.addEventListener('mouseenter', showMessage, false);
  button.addEventListener('click', hideMessage, false);
  button.addEventListener('mouseleave', hideMessage, false);
};


