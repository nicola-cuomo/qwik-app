import type { Signal } from "@builder.io/qwik";
import { component$, useSignal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { addDays, addMinutes, format, getHours, setHours, setMinutes } from "date-fns";
import { Button } from "~/components/ui/button/button";

function nextDaysWithAvailability() {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => addDays(today, i)).map((date) => ({ date, isAvailable: Math.random() > 0.5 }));
}

type AvailableDatesProps = {
    selectedDate: Signal<string | undefined>
};

const AvailableDates = component$(({ selectedDate }: AvailableDatesProps) => {
    const dates = useSignal(() => nextDaysWithAvailability());

    return (
        <>
            {dates.value.map((dateObj, index) => {
                const { date, isAvailable } = dateObj;
                const formattedDate = format(date, 'dd/MM');
                return (<Button
                    key={index}
                    onClick$={() => {
                        if (isAvailable) {
                            selectedDate.value = formattedDate;
                        }
                    }}
                    style={{
                        backgroundColor: selectedDate.value === formattedDate ? 'blue' : 'initial',
                        color: selectedDate.value === formattedDate ? 'white' : 'initial',
                    }}
                    disabled={!isAvailable}
                >
                    {formattedDate}
                </Button>)
            }
            )}
        </>
    );
}
);

type AvailableTimesProps = {
    selectedDate: Signal<string>
};

const AvailableTimes = component$(({ selectedDate }: AvailableTimesProps) => {
    console.log(selectedDate.value); // Use selectedDate to avoid the unused variable error
    let date = new Date();
    const openHour = 8;
    date = setHours(date, openHour);
    date = setMinutes(date, 0);
    const closeHour = 19;
    const startPauseHour = 13;
    const stopPauseHour = 14;
    const serviceDurationMinutes = 45;
    const times = [];

    while (getHours(date) < closeHour) {
        if (date.getHours() < startPauseHour || date.getHours() >= stopPauseHour) {
            times.push(format(date, 'HH:mm'));
        }
        date = addMinutes(date, serviceDurationMinutes);
    }

    const timesWithAvailability = times.map((time) => ({ time, isAvailable: Math.random() > 0.5 }));

    return (
        <>
            {timesWithAvailability.map((timeWithAvailability, index) => {
                const { time, isAvailable } = timeWithAvailability;
                return <Button key={index} disabled={isAvailable}>{time}</Button>
            }
            )}
        </>
    );
});

export default component$(() => {
    const serviceType = useLocation().params.serviceType;
    const selectedDate = useSignal<string>();

    return (
        <>
            <h1>Book your {serviceType} online</h1>
            <p>Available dates</p>
            <AvailableDates selectedDate={selectedDate} />
            {selectedDate.value && (
                <>
                    <p>Available times for {selectedDate.value}</p>
                    <AvailableTimes selectedDate={selectedDate as Signal<string>} />
                </>)
            }
        </>);
}
);