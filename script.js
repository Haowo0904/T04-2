document.addEventListener("DOMContentLoaded", () => {
  const currentPage = document.body.dataset.page;
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-links");

  document.querySelectorAll("[data-nav-page]").forEach((link) => {
    if (link.dataset.navPage === currentPage && link.closest(".nav-links")) {
      link.setAttribute("aria-current", "page");
    }

    link.addEventListener("click", (event) => {
      const destination = link.getAttribute("href");
      if (!destination || link.dataset.navPage === currentPage) {
        return;
      }

      event.preventDefault();
      document.body.classList.add("page-leaving");
      window.setTimeout(() => {
        window.location.href = destination;
      }, 180);
    });
  });

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menu.classList.toggle("is-open", !isOpen);
      menuToggle.querySelector(".sr-only").textContent = isOpen ? "Open menu" : "Close menu";
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const calculator = document.querySelector("#energy-calculator");
  if (calculator) {
    calculator.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(calculator);
      const wattage = Number(formData.get("wattage"));
      const hours = Number(formData.get("hours"));
      const tariff = Number(formData.get("tariff"));
      const annualEnergy = (wattage / 1000) * hours * 365;
      const annualCost = annualEnergy * (tariff / 100);
      const result = document.querySelector("#calculation-result");

      result.querySelector("strong").textContent = annualCost.toLocaleString("en-AU", {
        style: "currency",
        currency: "AUD"
      });
      result.querySelector("small").textContent = `Based on ${annualEnergy.toFixed(1)} kWh per year`;
    });
  }
});
