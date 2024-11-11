import type { Signal } from "@builder.io/qwik";
import { component$, useSignal } from "@builder.io/qwik";
import { addDays, format } from "date-fns";
import { Button } from "~/components/ui/button/button";

function nextDaysWithAvailability() {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => addDays(today, i)).map((date) => ({
    date,
    isAvailable: Math.random() > 0.5,
  }));
}

type AvailableDatesProps = {
  selectedDate: Signal<string | undefined>;
};

export default component$(({ selectedDate }: AvailableDatesProps) => {
  const dates = useSignal(() => nextDaysWithAvailability());

  return (
    <>
      {dates.value.map((dateObj, index) => {
        const { date, isAvailable } = dateObj;
        const formattedDate = format(date, "dd/MM");
        return (
          <Button
            key={index}
            onClick$={() => {
              if (isAvailable) {
                selectedDate.value = formattedDate;
              }
            }}
            class={{
              "bg-blue-500 text-white hover:bg-blue-500":
                selectedDate.value === formattedDate,
            }}
            disabled={!isAvailable}
          >
            {formattedDate}
          </Button>
        );
      })}
    </>
  );
});
