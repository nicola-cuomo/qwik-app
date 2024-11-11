import type { Signal } from "@builder.io/qwik";
import { component$, useSignal } from "@builder.io/qwik";
import { addMinutes, getHours, setHours, setMinutes, format } from "date-fns";
import { Button } from "~/components/ui/button/button";

type TimeWithAvailability = {
  time: string;
  isAvailable: boolean;
};

function hoursWithAvailability(): TimeWithAvailability[] {
  let date = new Date();
  const openHour = 8;
  const closeHour = 19;
  date = setHours(date, openHour);
  date = setMinutes(date, 0);
  const startPauseHour = 13;
  const stopPauseHour = 14;
  const serviceDurationMinutes = 45;
  const times = [];
  while (getHours(date) < closeHour) {
    if (date.getHours() < startPauseHour || date.getHours() >= stopPauseHour) {
      times.push(format(date, "HH:mm"));
    }
    date = addMinutes(date, serviceDurationMinutes);
  }
  return times.map((time) => ({ time, isAvailable: Math.random() > 0.5 }));
}

type AvailableTimesProps = {
  selectedTime: Signal<string | undefined>;
};

export default component$(({ selectedTime }: AvailableTimesProps) => {
  const timesWithAvailability = useSignal<TimeWithAvailability[]>(
    hoursWithAvailability(),
  );

  return (
    <>
      {timesWithAvailability.value.map((timeWithAvailability) => {
        const { time, isAvailable } = timeWithAvailability;
        return (
          <Button
            key={time}
            disabled={isAvailable}
            onClick$={() => (selectedTime.value = time)}
            class={{
              "bg-blue-500 text-white hover:bg-blue-500":
                selectedTime.value === time,
            }}
          >
            {time}
          </Button>
        );
      })}
    </>
  );
});
