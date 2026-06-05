import "@/style.css";
import { router } from "@/router/router";

document.addEventListener("DOMContentLoaded", () => {
  router();
});

document.addEventListener("click", (e) => { const link = e.target.closest("[data-link]");
if (!link) return;
e.preventDefault();
history.pushState({}, "", link.href); router(); });