document.getElementById('customContactForm').addEventListener('submit', function(event) {
  // 1. Prevent the default browser behavior (prevents page reloading/redirecting)
  event.preventDefault();

  const form = event.target;
  const successMessage = document.getElementById('formSuccessMessage');
  const submitButton = form.querySelector('.subscribe-submit-btn');

  // Visual Cue: Change button text to show it's actively processing
  submitButton.innerText = "Sending...";
  submitButton.disabled = true;

  // 2. Automatically package up all input data fields from the form matrix
  const formData = new FormData(form);

  // 3. Send the packaged data to the mail server backend asynchronously
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Success! Hide the form inputs smoothly and surface the Thank You message
      form.style.display = 'none';
      successMessage.style.display = 'block';
    } else {
      // Server accepted request but encountered an unexpected data exception
      alert("Oops! There was a problem submitting your form. Please try again.");
      resetSubmitButton(submitButton);
    }
  })
  .catch(error => {
    // Catch-all block for network loss or server downtime issues
    alert("Network error. Please check your internet connection and try again.");
    resetSubmitButton(submitButton);
  });
});

// Helper function to reset the button state if transmission fails
function resetSubmitButton(button) {
  button.innerText = "Submit";
  button.disabled = false;
}