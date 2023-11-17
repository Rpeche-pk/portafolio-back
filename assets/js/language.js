const languageSelect = document.getElementById("flags");

const setLanguage = (lang) => {
  localStorage.setItem("language", lang);
};

const getLanguage = () => {
  return localStorage.getItem("language") || "es";
};
const removeLanguage = () => {
  localStorage.removeItem("language");
};
const changeLanguage = async (lang) => {
  try {
    const requestJson = await fetch(`/assets/js/languages/${lang}.json`);

    if (!requestJson.ok) {
      throw new Error(`Error fetching language JSON: ${requestJson.status} ${requestJson.statusText}`);
    }

    const json = await requestJson.json();

    const textsToChange = document.querySelectorAll("[data-key]");

    for (const text of textsToChange) {
      const key = text.dataset.key;
      const value = text.dataset.value;
      text.innerHTML = json[key][value];
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

//**********EVENTOS DE LA PÁGINA COMO EL CAMBIO DE IDIOMA */
languageSelect.addEventListener("click", async (event) => {
  const lang = event.target.parentElement.dataset.language;
  if (lang == "es") {
    alerta("success", "Idioma cambiado a español", 1200);
  } else {
    alerta("success", "Language changed to english", 1200);
  }
  setLanguage(lang);
  await changeLanguage(lang);
});

window.addEventListener("load", async () => {
  const change = getLanguage();
  console.log(change);
  await changeLanguage(change);
});

/*window.addEventListener("beforeunload", () => {
  removeLanguage();
});*/

alerta = (code, info, time = 3500) => {
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
