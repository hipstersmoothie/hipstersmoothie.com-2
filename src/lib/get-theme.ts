type Theme = "dark" | "light";

declare global {
  interface Window {
    __theme: Theme;
    __onThemeChange: (theme: Theme) => void;
    __setPreferredTheme: (theme: Theme) => void;
  }
}

const code = function () {
  window.__onThemeChange = function () {};

  console.log("??? 1");
  function setTheme(newTheme: Theme) {
    document.documentElement.classList.remove(window.__theme);
    window.__theme = newTheme;
    preferredTheme = newTheme;
    document.documentElement.dataset.theme = newTheme;
    window.__onThemeChange(newTheme);
    document.documentElement.classList.add(newTheme);
  }
  console.log("??? 2");

  var preferredTheme;

  try {
    console.log("??? 3");
    preferredTheme = localStorage.getItem("theme") as Theme;
  } catch (err) {
    console.log("??? 5");
  }
  console.log("??? 5");

  window.__setPreferredTheme = function (newTheme: Theme) {
    setTheme(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch (err) {}
  };
  console.log("??? 6");

  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  darkQuery.addEventListener("change", function (e) {
    window.__setPreferredTheme(e.matches ? "dark" : "light");
  });
  console.log("??? 7");

  setTheme(preferredTheme || (darkQuery.matches ? "dark" : "light"));

  console.log("??? 8");
};

export const getTheme = `console.log('??? 0');(${code})();`;
