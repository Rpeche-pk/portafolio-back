function sendEmail() {
  let name = document.querySelector('[name="name"]').value;
  let asunto = document.querySelector('[name="subject"]').value;
  let cuerpo = document.querySelector('[name="body"]').value;

  /*let asunto = encodeURIComponent(document.getElementById("subject").value);
  let name = encodeURIComponent(document.getElementById("name").value);
  let cuerpo = encodeURIComponent(document.getElementById("message").value);
  /*let enlace = `https://mail.google.com/mail/u/0/?to=pecheaparcana1998@gmail.com&subject=${asunto}&body=${name}; ${cuerpo}&fs=1&tf=cm`;
  // Puedes utilizar el enlace como necesites, por ejemplo, abrirlo en una nueva ventana
  window.open(enlace, "_blank");*/
  if (asunto == "" || name == "" || cuerpo == "") {
    alerta("warning", "Por favor, complete todos los campos", 1500);
    return;
  }
  //validate email pattern
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (emailPattern.test(asunto) == false) {
    alerta("warning", "Please enter a valid email address", 1800);
    document.querySelector('[name="subject"]').value = "";
    return;
  }

  alerta("success", "Email enviado, Gracias!",2200);
  //cleanFields();
}

alerta = (code, info, time = 2000) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: time,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: code,
    title: info,
  });
};

cleanFields = () => {
  document.querySelector('[name="name"]').value="";
  document.querySelector('[name="subject"]').value="";
  document.querySelector('[name="body"]').value="";
  /*document.getElementById("subject").value = "";
  document.getElementById("name").value = "";
  document.getElementById("message").value = "";*/
};
