// Mockup-only: ⌥ click or the ● button flips light/dark so both appearances can be checked.
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("mock-theme");
  if (saved) root.classList.add(saved);
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".theme-toggle")) return;
    const dark = root.classList.contains("dark") || (!root.classList.contains("light") && matchMedia("(prefers-color-scheme: dark)").matches);
    root.classList.remove("dark", "light");
    const next = dark ? "light" : "dark";
    root.classList.add(next);
    localStorage.setItem("mock-theme", next);
  });
})();
