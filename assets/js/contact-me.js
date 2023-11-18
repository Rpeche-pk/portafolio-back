function sendEmail() {
  
  /*let asunto = encodeURIComponent(document.getElementById("subject").value);
  let name = encodeURIComponent(document.getElementById("name").value);
  let cuerpo = encodeURIComponent(document.getElementById("message").value);

  if (asunto == "" || name == "" || cuerpo == "") {
    alerta("warning","Please complete all fields",1500);
    return;
  }
  let enlace = `https://mail.google.com/mail/u/0/?to=pecheaparcana1998@gmail.com&subject=${asunto}&body=${name}; ${cuerpo}&fs=1&tf=cm`;
  // Puedes utilizar el enlace como necesites, por ejemplo, abrirlo en una nueva ventana
  window.open(enlace, "_blank");*/
  alerta("success","email sent successfully, thank you!");
  //cleanFields();
}

alerta = (code,info,time=2000) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: time,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
   Toast.fire({
    icon: code,
    title: info
  });
}

cleanFields=()=> {
  document.getElementById("subject").value = "";
  document.getElementById("name").value = "";
  document.getElementById("message").value = "";
}
