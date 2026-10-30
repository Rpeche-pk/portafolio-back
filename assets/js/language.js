const languageSelect = document.getElementById("flags");
const supportedLanguages = new Set(["en", "es"]);
const languageDirectory = document.currentScript?.src
  ? new URL("./languages/", document.currentScript.src)
  : new URL("assets/js/languages/", window.location.href);

const setLanguage = (lang) => {
  try {
    localStorage.setItem("language", lang);
  } catch (error) {
    console.error("Unable to save language preference:", error.message);
  }
};

const getLanguage = () => {
  try {
    const language = localStorage.getItem("language");
    return supportedLanguages.has(language) ? language : "en";
  } catch (error) {
    console.error("Unable to read language preference:", error.message);
    return "en";
  }
};
const removeLanguage = () => {
  localStorage.removeItem("language");
};
const changeLanguage = async (lang) => {
  if (!supportedLanguages.has(lang)) {
    return false;
  }

  try {
    const requestJson = await fetch(new URL(`${lang}.json`, languageDirectory));

    if (!requestJson.ok) {
      throw new Error(`Error fetching language JSON: ${requestJson.status} ${requestJson.statusText}`);
    }

    const json = await requestJson.json();
    const textsToChange = document.querySelectorAll("[data-key]");
    const translations = [];

    for (const text of textsToChange) {
      const key = text.dataset.key;
      const value = text.dataset.value;
      const translation = json[key]?.[value];

      if (typeof translation !== "string") {
        console.warn(`Missing translation for ${key}.${value} (${lang})`);
        continue;
      }

      translations.push([text, translation]);
    }

    for (const [text, translation] of translations) {
      text.innerHTML = translation;
    }

    return true;
  } catch (error) {
    console.error("Error:", error.message);
    return false;
  }
};

languageSelect?.addEventListener("click", async (event) => {
  const languageOption = event.target.closest?.("[data-language]");

  if (!languageOption || !languageSelect.contains(languageOption)) {
    return;
  }

  const lang = languageOption.dataset.language;
  if (!supportedLanguages.has(lang) || !(await changeLanguage(lang))) {
    return;
  }

  setLanguage(lang);

  if (window.Swal && typeof alerta === "function") {
    const message = lang === "es" ? "Idioma cambiado a español" : "Language changed to English";
    alerta("success", message, 1150);
  }
});

window.addEventListener("load", async () => {
  await changeLanguage(getLanguage());
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
