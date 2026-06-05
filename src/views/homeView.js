import Sidebar from "@/components/Sidebar";
import { getSession } from "@/utils";
import { homeController } from "@/controllers/home.controller";

export default function homeView() {
  const user = getSession();

  setTimeout(() => {
    homeController();
  });

  return `
    <div class="flex">

      ${Sidebar()}

      <main class="flex-1 p bg-slate-100 min-h-screen p-5 ">

        <div class="">

          <h1 class="relative bg-gray-800/50 p-5  text-2xl font-bold mb-1 ">
            Bienvenido ${user?.name}
          </h1>

          <p class="text-orange-900 relative p-3  bg-gray-800/50 text-2xl font-bold mb-6 ">
            ${user?.role}
          </p>

        </div>

        ${
          user?.role === "admin"
            ? `
              <section
                class="bg-white p-5 rounded-lg shadow mb-6"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Administrador
                </h2>

                <p>
                  Puedes visualizar todas las reservas.
                </p>



              </section>
            `
            : `
              <section
                class="bg-white p-5"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Usuario
                </h2>

                <p>
                  Puedes visualizar únicamente tus reservas.
                </p>

              </section>
            `
        }

        <section
          class="bg-white p-5 rounded-lg shadow"
        >

          <div
            class="flex justify-between items-center mb-4"
          >
            <h2 class="font-bold text-xl">
              Reservas
            </h2>

            <span
              class="text-sm text-slate-500"
            >
              ${
                user?.role === "admin"
                  ? "Mostrando todas las reservas"
                  : "Mostrando únicamente tus reservas"
              }
            </span>
          </div>

          <div
            id="reservationsContainer"
            class="grid gap-4 md:grid-cols-2"
          >
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-emerald-800">
                Cargando reservas ...
              </p>
            </div>
          </div>

        </section>

      </main>

    </div>
  `;
}