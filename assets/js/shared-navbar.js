(() => {
  const initializeNavbar = () => {
    const navbar = document.querySelector(".portfolio-navbar");
    if (!navbar) return;

    const toggler = navbar.querySelector(".navbar-toggler");
    const collapse = navbar.querySelector(".navbar-collapse");
    const navLinks = [...navbar.querySelectorAll(".navbar-nav .nav-link")];
    const scrollContainer = document.querySelector('[data-bs-spy="scroll"]');
    const syncScrolledState = () => {
      navbar.classList.toggle("is-compact", window.scrollY > 60);
    };

    window.addEventListener("scroll", syncScrolledState, { passive: true });
    syncScrolledState();

    const syncCurrentLink = () => {
      const activeLink = navLinks.find((link) => link.classList.contains("active"));

      for (const link of navLinks) {
        if (link === activeLink) {
          link.setAttribute("aria-current", link.hash ? "location" : "page");
        } else {
          link.removeAttribute("aria-current");
        }
      }
    };

    if (scrollContainer) {
      syncCurrentLink();
      scrollContainer.addEventListener("activate.bs.scrollspy", syncCurrentLink);
    }

    collapse.addEventListener("shown.bs.collapse", () => {
      toggler.setAttribute("aria-expanded", "true");
      navbar.classList.add("is-menu-open");
    });
    collapse.addEventListener("hidden.bs.collapse", () => {
      toggler.setAttribute("aria-expanded", "false");
      navbar.classList.remove("is-menu-open");
    });

    const collapseInstance = () => window.bootstrap?.Collapse?.getOrCreateInstance(
      collapse,
      { toggle: false },
    );

    navbar.addEventListener("click", (event) => {
      const selectedLink = event.target.closest?.(".navbar-nav .nav-link");
      const isMobile = window.matchMedia("(max-width: 991.98px)").matches;

      if (!selectedLink || !isMobile || !collapse.classList.contains("show")) return;
      collapseInstance()?.hide();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !collapse.classList.contains("show")) return;

      const instance = collapseInstance();
      if (!instance) return;

      event.preventDefault();
      instance.hide();
      toggler.focus();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeNavbar, { once: true });
  } else {
    initializeNavbar();
  }
})();
