(() => {
  const form = document.querySelector(".contact-form");
  const errorMessage = document.getElementById("contact-error");
  const unavailableMessage = document.getElementById("contact-unavailable");

  if (!form || !errorMessage || !unavailableMessage) {
    return;
  }

  if (!window.Pageclip) {
    unavailableMessage.hidden = false;
    return;
  }

  try {
    window.Pageclip.form(form, {
      onSubmit() {
        errorMessage.hidden = true;
        unavailableMessage.hidden = true;
      },
      onResponse(error) {
        errorMessage.hidden = !error;
        return !error;
      },
    });
  } catch {
    unavailableMessage.hidden = false;
  }
})();
