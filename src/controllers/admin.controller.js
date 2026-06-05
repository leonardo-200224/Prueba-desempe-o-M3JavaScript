import {
  getReservations,
  updateReservation,
  deleteReservation,
} from "@/services/reservation.service";
import { navigateTo } from "@/router/router";

const statusLabel = {
  pending: " Pendiente",
  approved: "Aprobada",
  rejected: "Rechazada",
  cancelled: "Cancelada",
};

export const adminController = async () => {
  const container = document.querySelector("#adminReservationsContainer");

  const render = async () => {
    const reservations = await getReservations();

    if (!reservations.length) {
      container.innerHTML = `<p class="text-slate-500 text-center py-8">No hay reservas.</p>`;
      return;
    }

    container.innerHTML = reservations
      .map(
        (r) => `
        <div class=" rounded p-4 mb-4 bg-slate-50" id="res-${r.id}">
          <div class="flex justify-between items-start">
            <div>
              <p class="font-bold">${r.workspace}</p>
              <p class="text-sm text-slate-500">${r.date} | ${r.startHour} - ${r.endHour}</p>
              <p class="text-sm">Motivo: ${r.reason}</p>
              <p class="text-sm">Usuario ID: ${r.userId}</p>
              <p class="text-sm font-semibold mt-1">Estado: ${statusLabel[r.status] || r.status}</p>
            </div>
            <div class="flex flex-col gap-2 ml-4">
              ${
                r.status === "pending"
                  ? `
                <button data-id="${r.id}" data-action="approve"
                  class=" px-3 py-1 rounded text-sm hover:bg-green-300">
                  Aprobar
                </button>
                <button data-id="${r.id}" data-action="reject"
                  class=" px-3 py-1 rounded text-sm hover:bg-yellow-300">
                  Rechazar
                </button>`
                  : ""
              }
              <button data-id="${r.id}" data-action="delete"
                class="  px-3 py-1 rounded text-sm hover:bg-red-300">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      `
      )
      .join("");

    container.querySelectorAll("button[data-action]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = Number(btn.dataset.id);
        const action = btn.dataset.action;

        if (action === "approve") {
          await updateReservation(id, { status: "approved" });
        } else if (action === "reject") {
          await updateReservation(id, { status: "rejected" });
        } else if (action === "delete") {
          if (confirm("¿Eliminar esta reserva?")) {
            await deleteReservation(id);
          }
        }

        render(); // re-render
      });
    });
  };

  render();
};