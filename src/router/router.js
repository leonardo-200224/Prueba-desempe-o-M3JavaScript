import loginView from "@/views/loginView";
import homeView from "@/views/homeView";
import NotFoundView from "@/views/notFound";
import { isAuthenticated, isAdmin } from "@/utils";
import newReservationView from "@/views/newReservationView";
import adminView from "@/views/adminView";

const routes = {
  "/": loginView,
  "/home": homeView,
  "/reservations/new": newReservationView,
  "/admin": adminView,
};

export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

export const router = () => {
  const app = document.querySelector("#app");
  const path = window.location.pathname;

  // si no está autenticado y no está en login  redirigir
  if (!isAuthenticated() && path !== "/") {
    navigateTo("/");
    return;
  }

  // si está autenticado y va al login  redirigir a home
  if (isAuthenticated() && path === "/") {
    navigateTo("/home");
    return;
  }

  // solo admin puede entrar a /admin
  if (path === "/admin" && !isAdmin()) {
    app.innerHTML = `
      <div class="min-h-screen flex items-center justify-center bg-slate-100">
        <div class="bg-white p-8 rounded-lg shadow text-center">
          <h1 class="text-3xl font-bold text-red-500 mb-4">Acceso denegado</h1>
          <p class="text-slate-600 mb-6">No tienes permisos para acceder a este módulo.</p>
          <button onclick="history.back()" class="bg-blue-600 text-white px-4 py-2 rounded">
            Volver
          </button>
        </div>
      </div>
    `;
    return;
  }

  const view = routes[path] || NotFoundView;
  app.innerHTML = view();
};

window.addEventListener("popstate", router);