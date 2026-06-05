import Sidebar from "@/components/Sidebar";
import { newReservationController } from "@/controllers/newReservation.controller";

export default function newReservationView() {
  setTimeout(() => newReservationController());

  return `
    <div class="flex  ">
      ${Sidebar()}
      <main class="flex-1 p-8 bg-slate-100 min-h-screen   ">
        <h1 class="text-2xl font-bold mb-6  relative bg-gray-800/50 p-5   text-2xl font-bold mb-1 ">Nueva Reserva</h1>

        <div class="bg-white p-6 rounded-lg shadow max-w-lg  ">
          <form id="reservationForm" class="flex flex-col gap-4 ">

            <div>
              <label class="block text-sm font-medium mb-1">Espacio</label>
              <select name="workspace" class="border w-full p-2 rounded" required>
                <option value=""> Selecciona </option>
                <option value="Oficina Privada">Oficina Privada</option>
                <option value="Sala de Reuniones">Sala de Reuniones</option>
                <option value="Coworking">Coworking</option>
                <option value="Auditorio">Auditorio</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Fecha</label>
              <input type="date" name="date" class="border w-full p-2 rounded" required />
            </div>

            <div class="flex gap-4">
              <div class="flex-1">
                <label class="block text-sm font-medium mb-1">Hora inicio</label>
                <input type="time" name="startHour" class="border w-full p-2 rounded" required />
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium mb-1">Hora fin</label>
                <input type="time" name="endHour" class="border w-full p-2 rounded" required />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Motivo</label>
              <textarea name="reason" rows="3" class="border w-full p-2 rounded" required></textarea>
            </div>

            <div id="formError" class="text-red-500 text-sm hidden"></div>

            <button type="submit" class=" py-2 rounded hover:bg-green-200">
              Crear Reserva
            </button>

          </form>
        </div>
      </main>
    </div>
  `;
}