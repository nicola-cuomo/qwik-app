import type { Signal } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { addMinutes, getHours, setHours, setMinutes, format } from "date-fns";
import { Button } from "~/components/ui/button/button";

type AvailableTimesProps = {
  selectedTime: Signal<string | undefined>;
};

export default component$(({ selectedTime }: AvailableTimesProps) => {
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

  const timesWithAvailability = times.map((time) => ({
    time,
    isAvailable: Math.random() > 0.5,
  }));

  return (
    <>
      {timesWithAvailability.map((timeWithAvailability, index) => {
        const { time, isAvailable } = timeWithAvailability;
        return (
          <Button
            key={index}
            disabled={isAvailable}
            onClick$={() => (selectedTime.value = time)}
          >
            {time}
          </Button>
        );
      })}
    </>
  );
});
