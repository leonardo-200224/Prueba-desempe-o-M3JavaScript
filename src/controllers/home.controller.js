import ReservationCard, { attachCardEvents } from "@/components/ReservationCard";
import { getReservations } from "@/services/reservation.service";
import { getSession } from "@/utils";

export const homeController = async () => {
  const container = document.querySelector("#reservationsContainer");
  const user = getSession();

  try {
    const reservations = await getReservations();

    const filtered =
      user.role === "admin"
        ? reservations
        : reservations.filter((r) => r.userId === user.id);

    container.innerHTML = filtered.length
      ? filtered.map((r) => ReservationCard(r)).join("")
      : `<div class="w-full text-center py-8 col-span-2">
           <p class="text-slate-500">No tienes reservas aún.</p>
         </div>`;

    attachCardEvents();
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="text-red-500 col-span-2">Error cargando reservas.</p>`;
  }
};