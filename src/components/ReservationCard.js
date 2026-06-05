import { updateReservation } from "@/services/reservation.service";
import { getSession } from "@/utils";

const statusLabel = {
  pending: " Pendiente",
  approved: "Aprobada",
  rejected: "Rechazada",
  cancelled: "Cancelada",
};

export default function ReservationCard(reservation) {
  const { id, workspace, date, startHour, endHour, reason, status } = reservation;
  const user = getSession();
  const canEdit = status === "pending";
  const canCancel = status === "pending" || status === "approved";

  return `
    <article class="bg-white  rounded-lg p-4 shadow-sm" id="card-${id}">
      <h3 class="font-bold text-lg mb-1">${workspace}</h3>
      <p class="text-sm text-slate-500">${date} | ${startHour} - ${endHour}</p>
      <p class="text-sm mt-1">Motivo: ${reason}</p>
      <p class="text-sm font-semibold mt-1">Estado: ${statusLabel[status] || status}</p>

      <div class="flex gap-2 mt-3">
        ${
          canCancel
            ? `<button
                data-cancel="${id}"
                class=" text-red-600   px-3 py-1 rounded text-sm hover:bg-red-200">
                Cancelar
              </button>`
            : ""
        }
      </div>
    </article>
  `;
}

//llamar desde homeController después de render
export function attachCardEvents() {
  document.addEventListener("click", async (e) => {
    if (e.target.dataset.cancel) {
      const id = Number(e.target.dataset.cancel);
      if (confirm("¿Cancelar esta reserva?")) {
        await updateReservation(id, { status: "cancelled" });
        location.reload();
      }
    }
  });
}