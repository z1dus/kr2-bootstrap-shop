/*
 * No Pain, No Gain — переключатель темы.
 * Подключить перед закрывающим </body>.
 */
(() => {
  const root = document.documentElement;
  const storageKey = "nopain-theme";
  const toggleSelector = "[data-theme-toggle]";

  function readSavedTheme() {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved === "light" || saved === "dark" ? saved : "dark";
    } catch (error) {
      return "dark";
    }
  }

  function applyTheme(theme) {
    const normalizedTheme = theme === "light" ? "light" : "dark";
    root.setAttribute("data-theme", normalizedTheme);

    document.querySelectorAll(toggleSelector).forEach((button) => {
      const isLight = normalizedTheme === "light";
      const icon = button.querySelector("[data-theme-icon]");
      const label = button.querySelector("[data-theme-label]");

      button.setAttribute(
        "aria-label",
        isLight ? "Включить тёмную тему" : "Включить светлую тему"
      );
      button.setAttribute("aria-pressed", String(isLight));

      if (icon) icon.textContent = isLight ? "☀️" : "🌙";
      if (label) label.textContent = isLight ? "Светлая" : "Тёмная";
    });
  }

  // Синхронизируем переключатель после загрузки DOM.
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(root.getAttribute("data-theme") || readSavedTheme());

    document.querySelectorAll(toggleSelector).forEach((button) => {
      button.addEventListener("click", () => {
        const nextTheme =
          root.getAttribute("data-theme") === "dark" ? "light" : "dark";

        applyTheme(nextTheme);

        try {
          localStorage.setItem(storageKey, nextTheme);
        } catch (error) {
        }
      });
    });

    requestAnimationFrame(() => {
      root.classList.add("theme-ready");
    });
  });
  
  applyTheme(readSavedTheme());
})();
