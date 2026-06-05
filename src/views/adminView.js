import Sidebar from "@/components/Sidebar";
import { adminController } from "@/controllers/admin.controller";

export default function adminView() {
  setTimeout(() => adminController());

  return `
    <div class="flex">
      ${Sidebar()}
      <main class="flex-1 p-8 bg-slate-100 min-h-screen ">
        <h1 class="text-2xl font-bold mb-6 relative bg-gray-800/50 p-5  text-2xl font-bold mb-1">Panel Administrador</h1>

        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Todas las Reservas</h2>
          </div>

          <div id="adminReservationsContainer">
            <p class="text-slate-400">Cargando...</p>
          </div>
        </div>
      </main>
    </div>
  `;
}