import { removeSession, getSession } from "@/utils";
import { navigateTo } from "@/router/router";

export default function Sidebar() {
  const user = getSession();

  setTimeout(() => {
    document
      .querySelector("#logoutBtn")
      ?.addEventListener("click", () => {
        removeSession();
        navigateTo("/");
      });

    document.querySelectorAll("[data-link]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo(link.getAttribute("href"));
      });
    });
  });

  return `
    <aside class="w-64 bg-slate-900 text-white h-screen p-5 flex flex-col">
      <h2 class="text-2xl font-bold mb-8">SpaceBook</h2>

      <nav class="flex flex-col gap-4 flex-1">
        <a href="/home" class="px-3 py-1 bg-gray-500 rounded-xl" data-link>
          Inicio
        </a>

        <a href="/reservations/new" class="px-3 py-1 rounded-xl" data-link>
          Nueva Reserva
        </a>

        ${
          user?.role === "admin"
            ? `<a href="/admin" class="px-3 py-1  rounded-xl" data-link>
                Admin Panel
              </a>`
            : ""
        }
      </nav>

      <div class="mt-auto pt-4 border-t border-slate-700">
        <p class="text-sm text-slate-400 mb-2">${user?.name} (${user?.role})</p>
        <button
          id="logoutBtn"
          class="w-full text-left cursor-pointer text-red-400 hover:text-white hover:bg-red-500 px-3 py-1 rounded-xl"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  `;
}