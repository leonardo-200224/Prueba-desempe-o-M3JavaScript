import { createReservation, getReservations } from "@/services/reservation.service";
import { getSession } from "@/utils";
import { navigateTo } from "@/router/router";

export const newReservationController = () => {
  const form = document.querySelector("#reservationForm");
  const errorDiv = document.querySelector("#formError");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = getSession();
    const workspace = form.workspace.value;
    const date = form.date.value;
    const startHour = form.startHour.value;
    const endHour = form.endHour.value;
    const reason = form.reason.value.trim();

    if (endHour <= startHour) {
      errorDiv.textContent = "La hora de fin debe ser mayor a la de inicio.";
      errorDiv.classList.remove("hidden");
      return;
    }

    // Validar duplicados
    try {
      const all = await getReservations();
      const duplicate = all.find(
        (r) =>
          r.workspace === workspace &&
          r.date === date &&
          r.status !== "cancelled" &&
          r.status !== "rejected" &&
          r.startHour < endHour &&
          r.endHour > startHour
      );

      if (duplicate) {
        errorDiv.textContent = "Ya existe una reserva para ese espacio y horario.";
        errorDiv.classList.remove("hidden");
        return;
      }

      await createReservation({
        userId: user.id,
        workspace,
        date,
        startHour,
        endHour,
        reason,
        status: "pending",
      });

      alert("Reserva creada con éxito.");
      navigateTo("/home");
    } catch (err) {
      console.error(err);
      errorDiv.textContent = "Error al crear la reserva.";
      errorDiv.classList.remove("hidden");
    }
  });
};