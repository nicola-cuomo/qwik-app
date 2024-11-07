import { component$, useSignal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";
import AvailableTimes from "./availableTimes";
import AvailableDates from "./availableDates";

export default component$(() => {
  const serviceType = useLocation().params.serviceType;
  const selectedDate = useSignal<string>();
  const selectedTime = useSignal<string>();

  return (
    <>
      <h1>Book your {serviceType} online</h1>
      <p>Available dates</p>
      <AvailableDates selectedDate={selectedDate} />
      {selectedDate.value && (
        <>
          <p>Available times for {selectedDate.value}</p>
          <AvailableTimes
            key={selectedDate.value}
            selectedTime={selectedTime}
          />
        </>
      )}
      {selectedTime.value && (
        <div>
          <Button onClick$={() => alert("Booked!")}>Book</Button>
        </div>
      )}
    </>
  );
});
